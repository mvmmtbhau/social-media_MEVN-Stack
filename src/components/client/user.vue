<template>
    <main class="grid pt-2">
        <div>
            <div class="info_user grid grid-cols-12 items-center pb-10 border-b-4">
                <div class="avatar px-10 col-span-3">
                    <img v-if="this.$store.state.auth.userById?.avatar"
                        :src="publicImage + this.$store.state.auth.userById?.avatar.filename"
                        class="h-[8rem] w-[8rem] rounded-full">
                    <img v-else src="../../assets/images/no-avatar.jfif" class="h-[8rem] w-[8rem] rounded-full">
                </div>
                <div class="another_info px-10 flex flex-col gap-4 col-span-9">
                    <div class="info_1 flex gap-3 items-center">
                        <div v-if="this.$store.state.auth.userById?._id == this.$store.state.auth.user?._id"
                            class="flex gap-3 items-center">
                            <span class="text-xl font-bold">
                                {{ this.$store.state.auth.userById?.fullName }}
                            </span>
                            <router-link :to="{
                                name: 'EditAccount'
                            }">
                                <span class="bg-gray-200 px-2 py-2 rounded-md text-sm font-bold cursor-pointer">
                                    Chỉnh sửa trang cá nhân
                                </span>
                            </router-link>
                            <!-- <font-awesome-icon :icon="['fas', 'gear']" class="text-xl cursor-pointer" /> -->
                        </div>
                        <div v-else class="">
                            <div v-if="this.$store.state.auth.user?.follows.some(
                                    follow => follow.followUser?._id == this.$store.state.auth.userById?._id
                                        && follow.state)" class="flex gap-3 items-center">
                                <span class="text-xl font-bold">
                                    {{ this.$store.state.auth.userById?.fullName }}
                                </span>
                                <span
                                    @click="unFollowUser(this.$store.state.auth.user?._id, this.$store.state.auth.userById?._id)"
                                    class="bg-gray-200 px-2 py-2 rounded-md text-sm font-bold hover:-translate-y-1 cursor-pointer">
                                    Đang theo dõi
                                </span>
                                <span
                                    @click="handleCreateConversation(this.$store.state.auth.user?._id, this.$store.state.auth.userById?._id)"
                                    class="bg-gray-200 px-2 py-2 rounded-md text-sm font-bold cursor-pointer hover:scale-110">
                                    Nhắn tin
                                </span>
                            </div>
                            <div v-else-if="this.$store.state.auth.user?.follows.some(
                                    follow => follow.followUser?._id == this.$store.state.auth.userById?._id
                                        && !follow.state
                                )" class="flex gap-3 items-center">
                                <span class="text-xl font-bold">
                                    {{ this.$store.state.auth.userById?.fullName }}
                                </span>
                                <span
                                    @click="unFollowUser(this.$store.state.auth.user?._id, this.$store.state.auth.userById?._id)"
                                    class="bg-gray-300 text-black px-3 py-2 rounded-md text-sm font-bold hover:-translate-y-1 cursor-pointer">
                                    Đã yêu cầu
                                </span>
                            </div>
                            <div v-else class="flex gap-3 items-center">
                                <span class="text-xl font-bold">
                                    {{ this.$store.state.auth.userById?.fullName }}
                                </span>
                                <span @click="followUser(this.$store.state.auth.user._id, this.$store.state.auth.userById)"
                                    class="bg-blue text-white px-3 py-2 rounded-md text-sm font-bold hover:-translate-y-1 cursor-pointer">
                                    Theo dõi
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="info_2 flex flex-col gap-2 py-2">
                        <div class="flex gap-4">
                            <p class="flex gap-1" :class="{
                                    'cursor-pointer':
                                        this.$store.state.auth.user?._id == this.$store.state.auth.userById?._id
                                        || !this.$store.state.auth.userById?.private
                                        || this.$store.state.auth.userById?.private && this.$store.state.auth.user?.follows.some(
                                            follow => follow.followUser._id == this.$store.state.auth.userById?._id && follow.state == true)
                                }"
                                @click="this.$store.state.auth.user?._id == this.$store.state.auth.userById?._id
                                        || !this.$store.state.auth.userById?.private
                                        || this.$store.state.auth.userById?.private && this.$store.state.auth.user?.follows.some(
                                            follow => follow.followUser._id == this.$store.state.auth.userById?._id && follow.state == true) ? isShowFollowersModal = true : ''">
                                <span class="font-bold">
                                    {{
                                        this.$store.state.auth.userById?.hasFollowers.filter(
                                            follow => follow.state == true).length }}
                                </span>
                                <span>người theo dõi</span>
                            </p>
                            <p class="flex gap-1 " :class="{
                                'cursor-pointer':
                                    this.$store.state.auth.user?._id == this.$store.state.auth.userById?._id
                                    || !this.$store.state.auth.userById?.private
                                    || this.$store.state.auth.userById?.private && this.$store.state.auth.user?.follows.some(
                                        follow => follow.followUser._id == this.$store.state.auth.userById?._id && follow.state == true)
                            }"
                                @click="this.$store.state.auth.user?._id == this.$store.state.auth.userById?._id
                                        || !this.$store.state.auth.userById?.private
                                        || this.$store.state.auth.userById?.private && this.$store.state.auth.user?.follows.some(
                                            follow => follow.followUser._id == this.$store.state.auth.userById?._id && follow.state == true) ? isShowFollowingModal = true : ''">
                                <span>Đang theo dõi</span>
                                <span class="font-bold">
                                    {{ this.$store.state.auth.userById?.follows.filter(
                                        follow => follow.state == true).length }}
                                </span>
                                <span>người dùng</span>
                            </p>
                        </div>
                        <div class="flex gap-4">
                            <p class="flex gap-1">
                                <span class="font-bold">
                                    {{ this.$store.state.auth.userById?.posts.length }}
                                </span>
                                <span>bài viết</span>
                            </p>
                            <p class="flex gap-1 cursor-pointer"
                                v-if="this.$store.state.auth.user?._id == this.$store.state.auth.userById?._id"
                                @click="isShowRequestModal = true">
                                <span class="font-bold">
                                    {{ this.$store.state.auth.userById?.hasFollowers.filter(follow => follow.state ==
                                        false).length }}
                                </span>
                                <span>yêu cầu theo dõi</span>
                            </p>
                        </div>

                    </div>
                    <div class="info_3">
                        <div class="mb-2">
                            <span class="font-bold">
                                {{ this.$store.state.auth.userById?.fullName }}
                            </span>
                        </div>
                        <div>
                            <span v-if="this.$store.state.auth.userById?.bio">
                                {{ this.$store.state.auth.userById?.bio }}
                            </span>
                            <span v-else>Hãy thêm thông tin cá nhân nào!!!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="this.$store.state.auth.user?._id == this.$store.state.auth.userById?._id
            || !this.$store.state.auth.userById?.private
            || this.$store.state.auth.userById?.private &&
            this.$store.state.auth.user?.follows.some(
                follow => follow.followUser._id == this.$store.state.auth.userById?._id && follow.state == true)">
            <div class="flex gap-10 py-8 text-xs font-bold items-center justify-center">
                <span class="cursor-pointer hover:scale-105 transition duration-300" :class="{ 'active': isShowPosts }"
                    @click="isShowPosts = true">BÀI VIẾT</span>
                <span v-if="this.$store.state.auth.user?._id == this.$store.state.auth.userById?._id"
                    class="cursor-pointer hover:scale-105 transition duration-300" :class="{ 'active': !isShowPosts }"
                    @click="isShowPosts = false">ĐÃ LƯU</span>
            </div>
            <div>
                <div v-if="isShowPosts" class="grid grid-cols-3 gap-4">
                    <div class="w-full h-[18rem] cursor-pointer hover:-translate-y-2" @click="showModal(post._id)"
                        v-for="post in this.$store.state.auth.userById?.posts" :key="post._id">
                        <img v-if="post.images[0].mimetype != 'video/mp4'" :src="publicImage + post.images[0].filename"
                            class="w-full h-full border-1 object-cover">
                        <video v-else :src="publicImage + post.images[0].filename"
                            class="w-full h-full border-1 object-cover"></video>
                    </div>
                </div>
                <div v-else class="grid grid-cols-3 gap-4">
                    <div class="w-full h-[18rem] cursor-pointer hover:-translate-y-2" @click="showModal(post._id)"
                        v-for="post in this.$store.state.auth.userById?.savedPosts" :key="post._id">
                        <img v-if="post.images[0].mimetype != 'video/mp4'" :src="publicImage + post.images[0].filename"
                            class="w-full h-full border-1 object-cover">
                        <video v-else :src="publicImage + post.images[0].filename"
                            class="w-full h-full border-1 object-cover"></video>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="flex flex-col gap-3 items-center mt-10">
            <div class="border-2 py-2 px-3 rounded-full">
                <font-awesome-icon :icon="['fas', 'lock']" class="text-2xl" />
            </div>
            <span class="text-sm">Đây là tài khoản riêng tư</span>
            <span class="text-sm">Hãy theo dõi để có thể xem ảnh và video của họ.</span>
        </div>


        <div v-if="isShowFollowersModal" class="fixed z-20">
            <div class="upload_file_modal flex items-center justify-center relative" @click="isShowFollowersModal = false">
                <div class="modal bg-white h-[25rem] rounded-[0.6rem] w-[25rem]" @click.stop>
                    <div class="relative py-3 border-b-2 text-center">
                        <span class="font-[600]">Người theo dõi</span>
                        <font-awesome-icon icon="fa-solid fa-xmark" class="absolute right-3 text-2xl cursor-pointer"
                            @click="isShowFollowersModal = false" />
                    </div>
                    <div class="overflow-y-scroll overflow-x-hidden h-[21rem]">
                        <div class="relative flex gap-3 px-4 py-2 items-center w-full"
                            v-for="follower in this.$store.state.auth.userById?.hasFollowers.filter(follow => follow.state == true)"
                            :key="follower">
                            <router-link :to="{
                                    name: 'User',
                                    params: { id: follower.fromUser._id }
                                }" class="rounded-full">
                                <img v-if="follower.fromUser?.avatar" :src="publicImage + follower.fromUser.avatar.filename"
                                    class="w-12 h-12 rounded-full cursor-pointer">
                                <img v-else src="../../assets/images/no-avatar.jfif"
                                    class="w-12 h-12 rounded-full cursor-pointer">
                            </router-link>
                            <div class="flex items-center gap-1 text-sm">
                                <router-link :to="{
                                        name: 'User',
                                        params: { id: follower.fromUser._id }
                                    }" class="font-bold w-32 break-keep" v-if="follower.fromUser.fullName.length < 16">
                                    {{ follower.fromUser.fullName }}
                                </router-link>
                                <router-link :to="{
                                    name: 'User',
                                    params: { id: follower.fromUser._id }
                                }" class="font-bold w-32 break-keep" v-else>
                                    {{ follower.fromUser.fullName.substring(0, 13) + '...' }}
                                </router-link>
                                <div class="flex gap-1"
                                    v-if="this.$store.state.auth.user?._id != follower.fromUser._id &&
                                        !this.$store.state.auth.user?.follows.some(follow => follow.followUser?._id == follower.fromUser._id)">
                                    <p class="text-gray-400">-</p>
                                    <span @click="followUser(this.$store.state.auth.user._id, follower.fromUser)"
                                        class="text-cyan-500 hover:text-cyan-700 cursor-pointer">
                                        Theo dõi
                                    </span>
                                </div>
                            </div>
                            <span v-if="this.$store.state.auth.user?._id == this.$store.state.auth.userById?._id"
                                @click="showDeleteModal(follower.fromUser)"
                                class="absolute right-4 text-sm bg-gray-200 py-1 px-2 font-bold cursor-pointer hover:bg-gray-300 rounded-md">
                                Xóa
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isShowDeleteFollowerModal" class="fixed z-30">
            <div class="upload_file_modal flex items-center justify-center relative"
                @click="isShowDeleteFollowerModal = false">
                <div class="modal bg-white h-[20rem] rounded-[0.6rem] w-[25rem]" @click.stop>
                    <div class="flex flex-col gap-4 items-center border-b-2 py-4">
                        <img v-if="follower.avatar" :src="publicImage + follower.avatar.filename"
                            class="w-20 h-20 rounded-full">
                        <img v-else src="../../assets/images/no-avatar.jfif" class="w-20 h-20 rounded-full">
                        <div class="flex flex-col gap-2 items-center w-[80%]">
                            <p class="text-xl font-bold">Xóa người theo dõi?</p>
                            <p class="text-center text-sm text-gray-500">
                                Instafake sẽ không cho {{ follower.fullName }} biết rằng bạn đã xóa họ khỏi danh
                                sách người theo dõi mình.
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <span
                            @click="unFollowUser(follower._id, this.$store.state.auth.user?._id); isShowDeleteFollowerModal = false"
                            class="text-red text-center font-bold py-3 w-full border-b-2 cursor-pointer">
                            Xóa
                        </span>
                        <span @click=" isShowDeleteFollowerModal = false " class="w-full text-center py-3 cursor-pointer">
                            Hủy
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if=" isShowFollowingModal " class="fixed z-20">
            <div class="upload_file_modal flex items-center justify-center relative"
                @click=" isShowFollowingModal = false ">
                <div class="modal bg-white h-[25rem] rounded-[0.6rem] w-[25rem]" @click.stop>
                    <div class="relative py-3 border-b-2 text-center">
                        <span class="font-[600]">Đang theo dõi</span>
                        <font-awesome-icon icon="fa-solid fa-xmark" class="absolute right-3 text-2xl cursor-pointer"
                            @click=" isShowFollowingModal = false " />
                    </div>
                    <div class="overflow-y-scroll overflow-x-hidden h-[21rem]">
                        <div class="relative flex gap-3 px-4 py-2 items-center w-full"
                            v-for="    following     in     this.$store.state.auth.userById?.follows.filter(follow => follow.state == true)    "
                            :key=" following ">
                            <router-link :to="
                                {
                                    name: 'User',
                                        params: { id: following.followUser._id }
                                }
                            " class="rounded-full">
                                <img v-if=" following.followUser?.avatar "
                                    :src=" publicImage + following.followUser.avatar.filename "
                                    class="w-12 h-12 rounded-full cursor-pointer">
                                <img v-else src="../../assets/images/no-avatar.jfif"
                                    class="w-12 h-12 rounded-full cursor-pointer">
                            </router-link>
                            <div class="flex items-center gap-1 text-sm">
                                <router-link :to="
                                    {
                                        name: 'User',
                                            params: { id: following.followUser._id }
                                    }
                                " class="font-bold w-32 break-keep" v-if=" following.followUser.fullName.length < 16 ">
                                    {{ following.followUser.fullName }}
                                </router-link>
                                <router-link :to="
                                    {
                                        name: 'User',
                                            params: { id: following.followUser._id }
                                    }
                                " class="font-bold w-32 break-keep" v-else>
                                    {{ following.followUser.fullName.substring(0, 13) + '...' }}
                                </router-link>
                            </div>
                            <div class="absolute right-4"
                                v-if=" this.$store.state.auth.user?._id != following.followUser._id ">
                                <span v-if="
                                    !this.$store.state.auth.user?.follows.length
                                        || this.$store.state.auth.user?.follows.length
                                        && !this.$store.state.auth.user?.follows.some(follow => follow.followUser._id == following.followUser._id)
                                " @click=" followUser(this.$store.state.auth.user?._id, following.followUser) "
                                    class=" right-4 text-sm text-white bg-cyan-500 py-1 px-2 font-bold cursor-pointer hover:bg-cyan-600 rounded-md">
                                    Theo dõi
                                </span>
                                <span v-else @click=" showDeleteFollowingModal(following.followUser) "
                                    class=" right-4 text-sm bg-gray-200 py-1 px-2 font-bold cursor-pointer hover:bg-gray-300 rounded-md">
                                    {{
                                    this.$store.state.auth.user?.follows.some(follow => follow.followUser._id ==
                                    following.followUser._id && follow.state == true)
                                    ? 'Đang theo dõi' : 'Đã yêu cầu'
                                    }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if=" isShowDeleteFollowingModal " class="fixed z-30">
            <div class="upload_file_modal flex items-center justify-center relative"
                @click=" isShowDeleteFollowingModal = false ">
                <div class="modal bg-white h-[20rem] rounded-[0.6rem] w-[25rem]" @click.stop>
                    <div class="flex flex-col gap-6 items-center border-b-2 py-10">
                        <img v-if=" follower.avatar " :src=" publicImage + follower.avatar.filename "
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
                            @click=" unFollowUser(this.$store.state.auth.user?._id, follower._id); isShowDeleteFollowingModal = false "
                            class="text-red text-center font-bold w-full border-b-2 cursor-pointer"
                            :class=" [follower.private ? 'p-2' : 'p-3'] ">
                            Bỏ theo dõi
                        </span>
                        <span @click=" isShowDeleteFollowingModal = false " class="w-full text-center py-2 cursor-pointer">
                            Hủy
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if=" isShowRequestModal " class="fixed z-20">
            <div class="upload_file_modal flex items-center justify-center relative" @click=" isShowRequestModal = false ">
                <div class="modal bg-white h-[25rem] rounded-[0.6rem] w-[25rem]" @click.stop>
                    <div class="relative py-3 border-b-2 text-center">
                        <span class="font-[600]">Yêu cầu theo dõi</span>
                        <font-awesome-icon icon="fa-solid fa-xmark" class="absolute right-3 text-2xl cursor-pointer"
                            @click=" isShowRequestModal = false " />
                    </div>
                    <div class="overflow-y-scroll overflow-x-hidden h-[21rem]">
                        <div class="relative flex gap-3 px-4 py-2 items-center w-full"
                            v-for="    request     in     this.$store.state.auth.userById?.hasFollowers.filter(follow => follow.state == false)    "
                            :key=" request ">
                            <router-link :to="
                                {
                                    name: 'User',
                                        params: { id: request.fromUser._id }
                                }
                            " class="rounded-full">
                                <img v-if=" request.fromUser?.avatar "
                                    :src=" publicImage + request.fromUser.avatar.filename "
                                    class="w-12 h-12 rounded-full cursor-pointer">
                                <img v-else src="../../assets/images/no-avatar.jfif"
                                    class="w-12 h-12 rounded-full cursor-pointer">
                            </router-link>
                            <div class="flex items-center gap-1 text-sm">
                                <router-link :to="
                                    {
                                        name: 'User',
                                            params: { id: request.fromUser._id }
                                    }
                                " class="font-bold w-32 break-keep" v-if=" request.fromUser.fullName.length < 16 ">
                                    {{ request.fromUser.fullName }}
                                </router-link>
                                <router-link :to="
                                    {
                                        name: 'User',
                                            params: { id: request.fromUser._id }
                                    }
                                " class="font-bold w-32 break-keep" v-else>
                                    {{ request.fromUser.fullName.substring(0, 16) + '...' }}
                                </router-link>
                            </div>
                            <div class="absolute right-2 flex gap-1">
                                <span @click=" unFollowUser(request.fromUser._id, request.followUser) "
                                    class=" text-sm bg-gray-200 py-1 px-2 font-bold cursor-pointer hover:bg-gray-300 rounded-md">
                                    Xóa
                                </span>
                                <span @click=" updateFollow(request.fromUser._id, request._id) "
                                    class="text-sm bg-cyan-500 text-white py-1 px-2 font-bold cursor-pointer hover:bg-cyan-600 rounded-md">
                                    Chấp nhận
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if=" isShowSendMessageModal " class="fixed z-20">
            <div class="upload_file_modal flex items-center justify-center relative"
                @click=" isShowSendMessageModal = false ">
                <div class="modal bg-white rounded-[0.6rem] w-[25rem]" @click.stop>
                    <div class="relative py-3 border-b-2 text-center flex flex-col">
                        <span class="font-[600]">Gửi tin nhắn cho: {{ this.$store.state.auth.userById?.fullName }}</span>
                        <font-awesome-icon icon="fa-solid fa-xmark" class="absolute right-3 text-2xl cursor-pointer"
                            @click=" isShowSendMessageModal = false " />
                        <span class="text-red text-sm" id="errorMessage"></span>
                    </div>
                    <div class="py-2 px-2">
                        <div class="px-2 py-2 border-2 rounded-xl w-full">
                            <input v-model=" message "
                                @keydown.enter=" message ? createChatBoxAndSendMessage(this.$store.state.auth.user?._id, this.$store.state.auth.userById?._id) : messageEmpty() " type="text"
                                class="text-sm px-2 w-[90%]" placeholder="Nội dung gửi..">
                            <font-awesome-icon @click=" message ? createChatBoxAndSendMessage(this.$store.state.auth.user?._id, this.$store.state.auth.userById?._id) : messageEmpty() "
                                icon="fa-solid fa-paper-plane" class="text-xl cursor-pointer hover:scale-105" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script >
import conversationService from '@/services/conversation.service';
import { ref } from '@vue/reactivity';
import { publicImage } from "@/constants/";
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { onBeforeMount, watch } from 'vue';

import useUser from '@/uses/useUser';

export default {
    name: 'UserScreen',
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        const userId = ref();
        const follower = ref();
        const message = ref();

        const isShowPosts = ref(true);
        const isShowFollowersModal = ref(false);
        const isShowFollowingModal = ref(false);
        const isShowRequestModal = ref(false);
        const isShowDeleteFollowerModal = ref(false);
        const isShowDeleteFollowingModal = ref(false);
        const isShowSendMessageModal = ref(false);

        const {
            getUserById,
            fetchCurrentUser,
            followUser,
            unFollowUser,
            updateFollow,
        } = useUser();

        onBeforeMount(() => {
            userId.value = route.params.id;
            getUserById(userId.value);
            fetchCurrentUser(store.state.auth.user?._id);
        })

        const handleCreateConversation = async (sender, receiver) => {
            try {
                const data = {
                    sender,
                    receiver,
                }

                const response = await conversationService.create(data);

                if (response.status == 200) {
                    router.push({
                        name: 'ChatBox',
                        params: { id: response.data._id }
                    });
                }

                if (response.status == 202) {
                    isShowSendMessageModal.value = true;
                }

            } catch (err) {
                console.log(err);
            }
        }

        const createChatBoxAndSendMessage = async (sender, receiver) => {
            try {
                const data = {
                    message: message.value,
                    sender,
                    receiver,
                }

                const response = await conversationService.create(data);
                if (response.status == 201) {
                    isShowSendMessageModal.value = false;
                    message.value = '';
                    router.push({
                        name: 'ChatBox',
                        params: { id: response.data._id }
                    })
                }
            } catch (err) {
                console.log(err);
            }
        }

        const messageEmpty = () => {
            if (!message.value) {
                let errorMessage = document.getElementById('errorMessage');
                let textEle = document.createElement('p');
                textEle.id = 'textMessage';
                let textNode = document.createTextNode('Vui lòng nhập nội dung gửi');
                textEle.appendChild(textNode);
                errorMessage.appendChild(textEle);
            }
        }

        const showModal = async (postId) => {
            router.push({
                name: 'DetailPost',
                params: {
                    id: postId
                }
            })
        }

        const showDeleteModal = (follow) => {
            follower.value = follow;
            isShowDeleteFollowerModal.value = true;
        }

        const showDeleteFollowingModal = (following) => {
            follower.value = following;
            isShowDeleteFollowingModal.value = true;
        }

        watch(message, (newVal, oldVal) => {
            let textEle = document.getElementById('textMessage');
            if (textEle) {
                textEle.remove();
            }
        })

        return {
            showModal,
            showDeleteModal,
            showDeleteFollowingModal,
            handleCreateConversation,
            createChatBoxAndSendMessage,
            messageEmpty,
            message,
            followUser,
            unFollowUser,
            updateFollow,
            userId,
            follower,
            publicImage,
            isShowPosts,
            isShowFollowersModal,
            isShowFollowingModal,
            isShowRequestModal,
            isShowDeleteFollowerModal,
            isShowDeleteFollowingModal,
            isShowSendMessageModal,
        }
    },
    data() {
        return {

        }
    },
}
</script>

<style>
.active {
    border-bottom: 1px solid;
    padding-bottom: 4px;
}
</style>