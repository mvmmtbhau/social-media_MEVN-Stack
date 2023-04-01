<template>
    <section>
        <div class="post mb-5 border-2 px-2 py-2 shadow-xl" v-for="(post, index) in posts" :key="index">
            <div class="post-top relative flex items-center gap-2 text-sm py-4 px-2">
                <router-link v-if="post.owner?._id" :to="{
                    name: 'User',
                    params: { id: post.owner?._id }
                }" class="flex items-center gap-2">
                    <img v-if="post.owner.avatar?.filename" :src="publicImage + post.owner.avatar?.filename"
                        class="w-8 h-8 rounded-full cursor-pointer">
                    <img v-else src="../../assets/images/no-avatar.jfif" class="w-8 h-8 rounded-full cursor-pointer">
                    <span class="font-bold cursor-pointer">{{ post.owner?.fullName }}</span>
                </router-link>
                <span>•</span>
                <span>1 ngày</span>
                <font-awesome-icon v-if="post.owner?._id == this.$store.state.auth.user?._id" @click="deletePost(post?._id)"
                    icon="fa-solid fa-ellipsis"
                    class="absolute right-2 cursor-pointer hover:-translate-y-1 hover:text-xl" />
            </div>
            <div class="post-content">
                <v-carousel :continuous="false" dark hide-delimiter-background height="500" show-arrows="hover"
                    color="black">
                    <v-carousel-item v-for="image in post?.images" :key="image">
                        <v-sheet class="h-full w-full bg-cyan-500" tile>
                            <div class="h-full w-full">
                                <img :src="publicImage + image.filename" class="h-full w-full object-contain">
                            </div>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
                <div class="relative text-2xl flex px-1 py-4 gap-4">
                    <font-awesome-icon v-if="post?.likes && post?.likes.length &&
                        post?.likes.some(like => like.owner === this.$store.state.auth.user?._id)"
                        @click="handleUnLike(post?._id, this.$store.state.auth.user?._id, index)" icon="fa-solid fa-heart"
                        class="cursor-pointer text-red " />

                    <font-awesome-icon v-else icon="fa-regular fa-heart"
                        @click="handleLike(post?._id, this.$store.state.auth.user?._id, index)" class="cursor-pointer" />

                    <font-awesome-icon icon="fa-regular fa-comment" class="cursor-pointer" @click="showModal(post?._id)" />
                    <font-awesome-icon 
                    v-if="this.$store.state.auth.user?.savedPosts && this.$store.state.auth.user?.savedPosts.length &&
                    this.$store.state.auth.user?.savedPosts.some(id => id == post?._id)" icon="fa-solid fa-bookmark" class="absolute right-2 cursor-pointer"
                        @click="removeSavedPost(post?._id)" />
                    <font-awesome-icon v-else icon="fa-regular fa-bookmark" class="absolute right-2 cursor-pointer"
                        @click="savedPost(post?._id)" />
                </div>
            </div>
            <div class="post-footer mb-5 text-md">
                <span class="font-bold">{{ post?.likes.length }} lượt thích</span>
                <div class="">
                    <span class="font-bold mr-2">{{ post.owner?.fullName }}</span>
                    <span>{{ post?.content }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

import { publicImage } from "@/constants/";
import postService from "@/services/post.service";
import likeService from "@/services/like.service";
import socket from "@/plugins/socket";

export default {
    name: "Post",
    setup() {
        const store = useStore();
        const router = useRouter();
        const posts = ref();

        const fetchPosts = async () => {
            try {
                const response = await postService.getAll();
                if (response.status === 200) {
                    posts.value = response.data;
                }

            } catch (err) {
                console.log(err);
                if (err.response.status === 401) {
                    console.log("adasdas");
                    router.push({ name: "Login" });
                }
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

        const handleLike = async (postId, userId, index) => {
            console.log(postId, userId, index);

            try {
                const data = {
                    belongToPost: postId,
                    owner: userId,
                }

                const response = await likeService.likePost(data);

                if (response.status == 201) {
                    if (!response.data.newNoti) {
                        posts.value[index].likes.push(response.data);
                        return;
                    }

                    posts.value[index].likes.push(response.data.newLike);

                    socket?.emit("likePost", response.data.newNoti);
                }
                if (response.status == 404) {
                    console.log(response.data)
                }
            } catch (err) {
                console.log(err);
            }
        }

        const handleUnLike = async (postId, userId, index) => {
            try {
                const response = await likeService.unLikePost(postId, userId);
                if (response.status == 200 || response.status == 204) {
                    console.log('bỏ thích thành công');
                    posts.value[index].likes = posts.value[index].likes.filter(like => like._id !== response.data._id);
                }
            } catch (err) {
                console.log(err);
            }
        }

        const deletePost = async (postId) => {
            console.log(postId);
            try {
                const response = await postService.deletePost(postId);
                if (response.status == 200 || response.status == 204) {
                    posts.value = posts.value.filter(post => post._id !== response.data.deletedPost._id);
                    store.dispatch("auth/handleSetUser", response.data.updateUser);
                    console.log("Xóa bài viết thành công");
                }
            } catch (err) {
                console.log(err);
            }
        }

        const savedPost = async (postId) => {
            try {
                const data = {
                    postId: postId,
                    userId: store.state.auth.user._id
                };


                const response = await postService.savedPost(data);
                if(response.status == 201) {
                    store.dispatch('auth/handleUpdateUserWithNewSavedPost', response.data._id);
                }

            } catch (err) {
                console.log(err);
            }
        }

        const removeSavedPost = async (postId) => {
            try {
                const data = {
                    postId: postId,
                    userId: store.state.auth.user._id
                };

                console.log(data);

                const response = await postService.removeSavedPost(data);
                if(response.status == 201) {
                    store.dispatch('auth/handleUpdateUserWithRemoveSavedPost', response.data._id);
                }

            } catch (err) {
                console.log(err);
            }
        }

        fetchPosts();

        socket?.on("getPost", data => {
            console.log(data);
            posts.value = [...posts.value, data]
        })

        return {
            showModal,
            handleLike,
            handleUnLike,
            deletePost,
            savedPost,
            removeSavedPost,
            posts,
            publicImage,
        }
    },
}
</script>

<style></style>