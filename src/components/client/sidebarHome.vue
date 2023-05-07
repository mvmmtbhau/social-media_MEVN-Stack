<template>
    <section>
        <div class="sidebar px-2 py-2">
            <div class="flex gap-5 items-center">
                <img v-if="this.$store.state.auth.user?.avatar"
                    :src="publicImage + this.$store.state.auth.user?.avatar.filename"
                    @click="arriveToUser(this.$store.state.auth.user?._id)" class="w-14 h-14 rounded-full cursor-pointer">
                <img v-else src="../../assets/images/no-avatar.jfif" @click="arriveToUser(this.$store.state.auth.user?._id)"
                    class="w-14 h-14 rounded-full cursor-pointer">
                <div class="flex flex-col cursor-pointer" @click="arriveToUser(this.$store.state.auth.user?._id)">
                    <span class="font-bold">{{ this.$store.state.auth.user?.fullName }}</span>
                </div>
            </div>
            <div class="mt-2">
                <div class="py-3 relative text-xs">
                    <span class="text-gray-500">Gợi ý cho bạn</span>
                    <span class="absolute right-0 font-bold cursor-pointer hover:text-gray-500">Xem tất cả</span>
                </div>
                <div v-for="user in users" :key="user" class="flex items-center gap-3 text-sm relative py-2">
                    <img v-if="user?.avatar" :src="publicImage + user?.avatar.filename" @click="arriveToUser(user?._id)"
                        class="w-8 h-8 rounded-full cursor-pointer">
                    <img v-else src="../../assets/images/no-avatar.jfif" @click="arriveToUser(user?._id)"
                        class="w-8 h-8 rounded-full cursor-pointer">
                    <div class="cursor-pointer" @click="arriveToUser(user?._id)">
                        <span class="font-bold">
                            {{ user.fullName }}
                        </span>
                    </div>
                    <span v-if="this.$store.state.auth.user.follows.some(follow => follow.followUser._id == user?._id)"
                        @click="showDeleteFollowingModal(user)"
                        class="absolute text-sm hover:text-gray-400 font-bold right-0 cursor-pointer">
                        {{
                            this.$store.state.auth.user.follows.some(
                                follow => follow.followUser._id == user?._id && follow.state == true
                            ) ? 'Đang theo dõi' : 'Đã yêu cầu'
                        }}
                    </span>
                    <span v-else @click="followUser(this.$store.state.auth.user?._id, user)"
                        class="absolute text-sm right-0 text-cyan-500 hover:text-cyan-700 cursor-pointer">
                        Theo dõi
                    </span>
                </div>
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
    </section>
</template>

<script>
import { useStore } from 'vuex';
import { onBeforeMount, onMounted, ref } from 'vue';

import useUser from "@/uses/useUser";

import { publicImage } from "@/constants";

export default {
    name: 'SidebarHome',
    setup() {
        const store = useStore();

        const follower = ref();
        
        const isShowDeleteFollowingModal = ref(false);

        const {
            users,
            arriveToUser,
            getUsers,
            followUser,
            unFollowUser,
        } = useUser();

        const showDeleteFollowingModal = (following) => {
            follower.value = following;
            isShowDeleteFollowingModal.value = true;
        }

        onBeforeMount(async () => {
           await getUsers(store.state.auth.user?._id, 5);
        })

        return {
            followUser,
            unFollowUser,
            arriveToUser,
            publicImage,
            users,
            follower,
            isShowDeleteFollowingModal,
            showDeleteFollowingModal,
        }
    }
}
</script>