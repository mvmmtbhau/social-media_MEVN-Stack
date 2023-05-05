<template>
    <div class="ml-[9rem] mt-10 w-[60%] flex flex-col">
        <div class="font-bold py-4">
            <span>Gợi ý</span>
        </div>
        <div>
            <div v-if="users?.length == 0">
                Hiện tại chưa có gợi ý kết bạn nào.
            </div>
            <div v-else v-for="user in users" :key="user" class="relative flex items-center gap-4 text-sm py-2">
                <img v-if="user?.avatar" :src="publicImage + user?.avatar.filename" @click="arriveToUser(user?._id)"
                    class="w-12 h-12 rounded-full cursor-pointer">
                <img v-else src="../../assets/images/no-avatar.jfif" @click="arriveToUser(user?._id)"
                    class="w-12 h-12 rounded-full cursor-pointer">
                <span class="font-bold cursor-pointer" @click="arriveToUser(user._id)">
                    {{ user.fullName }}
                </span>
                <span class="absolute right-0 bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-4 py-1 rounded-md">
                    Theo dõi
                </span>
                <span v-if="this.$store.state.auth.user.follows.some(follow => follow.followUser._id == user?._id)"
                    @click="showDeleteFollowingModal(user)"
                    class="absolute right-0 bg-gray-200 hover:bg-gray-300 cursor-pointer font-bold px-4 py-1 rounded-md">
                    {{
                        this.$store.state.auth.user.follows.some(
                            follow => follow.followUser._id == user?._id && follow.state == true
                        ) ? 'Đang theo dõi' : 'Đã yêu cầu'
                    }}
                </span>
                <span v-else @click="followUser(this.$store.state.auth.user?._id, user)"
                    class="absolute right-0 bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-4 py-1 rounded-md cursor-pointer">
                    Theo dõi
                </span>
            </div>
        </div>
        <div v-if="isShowDeleteFollowingModal" class="fixed z-30">
            <div class="upload_file_modal flex items-center justify-center relative"
                @click="isShowDeleteFollowingModal = false">
                <div class="modal bg-white h-[20rem] rounded-[0.6rem] w-[25rem]" @click.stop>
                    <div class="flex flex-col gap-6 items-center border-b-2 py-10">
                        <img v-if="follower.avatar" :src="publicImage + follower.avatar.filename"
                            class="w-24 h-24 rounded-full">
                        <img v-else src="../../assets/images/no-avatar.jfif" class="w-24 h-24 rounded-full">
                        <div class="flex flex-col items-center w-[80%]">
                            <p class="text-center text-sm text-gray-500">
                                {{ follower.private
                                    ? 'Nếu đổi ý, bạn sẽ phải yêu cầu theo dõi lại @' + follower.fullName + '.'
                                    : 'Bỏ theo dõi @' + follower.fullName + '?' }}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <span
                            @click="unFollowUser(this.$store.state.auth.user?._id, follower._id); isShowDeleteFollowingModal = false"
                            class="text-red text-center font-bold w-full border-b-2 cursor-pointer"
                            :class="[follower.private ? 'p-2' : 'p-3']">
                            Bỏ theo dõi
                        </span>
                        <span @click="isShowDeleteFollowingModal = false" class="w-full text-center py-2 cursor-pointer">
                            Hủy
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import { useStore } from 'vuex';

import useUser from "@/uses/useUser";
import { publicImage } from "@/constants";

export default {
    setup() {
        const store = useStore();

        const follower = ref();

        const isShowDeleteFollowingModal = ref(false);

        const {
            users,
            getUsers,
            arriveToUser,
            followUser,
            unFollowUser,
        } = useUser();

        onBeforeMount(async () => {
            await getUsers(store.state.auth.user?._id);
        })

        const showDeleteFollowingModal = (following) => {
            follower.value = following;
            isShowDeleteFollowingModal.value = true;
        }

        return {
            users,
            arriveToUser,
            followUser,
            unFollowUser,
            follower,
            publicImage,
            isShowDeleteFollowingModal,
            showDeleteFollowingModal,
        }
    }
}
</script>