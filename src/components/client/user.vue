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
                            <div v-if="
                                this.$store.state.auth.user.follows.some(follow => follow.userFollowed === this.$store.state.auth.userById?._id)"
                                class="flex gap-3 items-center">
                                <span
                                    @click="handleUnFollow(this.$store.state.auth.userById?._id, this.$store.state.auth.user?._id)"
                                    class="bg-gray-200 px-2 py-2 rounded-md text-sm font-bold hover:-translate-y-1 cursor-pointer">
                                    Đang theo dõi
                                </span>
                                <span
                                    @click="handleCreateConversation(this.$store.state.auth.user?._id, this.$store.state.auth.userById?._id)"
                                    class="bg-gray-200 px-2 py-2 rounded-md text-sm font-bold cursor-pointer hover:scale-110">
                                    Nhắn tin
                                </span>
                                <span>Tùy chọn khác</span>
                            </div>
                            <div v-else class="flex gap-3 items-center">
                                <span
                                    @click="handleFollow(this.$store.state.auth.userById?._id, this.$store.state.auth.user?._id)"
                                    class="bg-blue text-white px-3 py-2 rounded-md text-sm font-bold hover:-translate-y-1 cursor-pointer">
                                    Theo dõi
                                </span>
                                <span>Tùy chọn khác</span>
                            </div>
                        </div>
                    </div>
                    <div class="info_2 flex gap-10 py-2 items-center">
                        <p class="flex gap-1">
                            <span class="font-bold">
                                {{ this.$store.state.auth.userById?.posts.length }}
                            </span>
                            <span>Bài viết</span>
                        </p>
                        <p class="flex gap-1">
                            <span class="font-bold">
                                {{ this.$store.state.auth.userById?.hasFollowers.length }}
                            </span>
                            <span>người theo dõi</span>
                        </p>
                        <p class="flex gap-1">
                            <span>Đang theo dõi</span>
                            <span class="font-bold">
                                {{ this.$store.state.auth.userById?.follows.length }}
                            </span>
                            <span>người dùng</span>
                        </p>
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
        <div>
            <div class="flex gap-10 py-8 text-xs font-bold items-center justify-center">
                <span class="cursor-pointer hover:scale-105 transition duration-300" :class="{ 'active': isShowPosts }" @click="isShowPosts = true">BÀI VIẾT</span>
                <span v-if="this.$store.state.auth.user?._id == this.$store.state.auth.userById?._id" class="cursor-pointer hover:scale-105 transition duration-300" :class="{ 'active': !isShowPosts }" @click="isShowPosts = false">ĐÃ LƯU</span>
            </div>
            <div>
                <div v-if="isShowPosts" class="grid grid-cols-3 gap-4">
                    <div class="w-full h-[18rem] cursor-pointer hover:-translate-y-2" @click="showModal(post._id)"
                        v-for="post in this.$store.state.auth.userById?.posts" :key="post._id">
                        <img :src="publicImage + post.images[0].filename" class="w-full h-full border-1 object-cover">
                    </div>
                </div>
                <div v-else class="grid grid-cols-3 gap-4">
                    <div class="w-full h-[18rem] cursor-pointer hover:-translate-y-2" @click="showModal(post._id)"
                        v-for="post in this.$store.state.auth.userById?.savedPosts" :key="post._id">
                        <img :src="publicImage + post.images[0].filename" class="w-full h-full border-1 object-cover">
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import authService from '@/services/auth.service';
import followService from '@/services/follow.service';
import commentService from '@/services/comment.service';
import postService from '@/services/post.service';
import conversationService from '@/services/conversation.service';
import { ref } from '@vue/reactivity';
import { publicImage } from "@/constants/";
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { onBeforeMount, watch } from 'vue';

export default {
    name: 'UserScreen',
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const userId = ref();
        const isShowPosts = ref(true);

        const pathName = ref(location.pathname);
        console.log(pathName.value);

        onBeforeMount(() => {
            userId.value = route.params.id;
            fetchUserById(userId.value);
        })

        const fetchUserById = async (userId) => {
            try {
                const response = await authService.getUserById(userId);
                if (response.status === 200) {
                    store.dispatch('auth/handleSetUserById', response.data);
                }
            } catch (err) {
                console.log(err);
            }
        }

        const handleFollow = async (userFollowed, userFollowing) => {
            console.log(userFollowed, userFollowing);
            const data = {
                owner: userFollowing,
                userFollowed: userFollowed,
            }

            try {
                const response = await followService.following(data);
                if (response.status == 201) {
                    store.dispatch("auth/handleUpdateUserWithFollow", response.data);
                    store.dispatch("auth/handleUpdateUserByIdWithFollow", response.data);
                    console.log('Follow thành công');
                }
            } catch (err) {
                console.log(err);
            }
        }

        const handleUnFollow = async (userFollowed, userFollowing) => {
            try {
                const response = await followService.unFollow(userFollowed, userFollowing);
                if (response.status == 200 || response.status == 204) {
                    store.dispatch("auth/handleUpdateUserWithUnFollow", response.data);
                    store.dispatch("auth/handleUpdateUserByIdWithUnFollow", response.data);
                    console.log('unFollow thành công')
                }
            } catch (err) {
                console.log(err);
            }
        }

        const handleCreateConversation = async (sender, receiver) => {
            const data = {
                receiver,
                sender,
            }
            console.log(data);

            try {
                const response = await conversationService.createConversation(data);
                if (response.status == 201 || response.status == 202) {
                    console.log('Tạo hoặc đã có conversation: ', response.status);
                    console.log('Conversation:', response.data);
                }
            } catch (err) {
                console.log(err);
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

        return {
            showModal,
            handleFollow,
            handleUnFollow,
            handleCreateConversation,
            userId,
            publicImage,
            isShowPosts
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