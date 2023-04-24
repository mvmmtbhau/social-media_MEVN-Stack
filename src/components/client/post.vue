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
                <div class="flex gap-1 text-gray-500">
                    <span>•</span>
                    <span>
                        {{ setTime(post.createdAt) }}
                    </span>
                </div>
                <font-awesome-icon @click="showActionModal(post)" icon="fa-solid fa-ellipsis"
                    class="absolute right-2 cursor-pointer text-xl hover:text-gray-400" />
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
                        @click="unLikePostInPosts(post?._id, this.$store.state.auth.user?._id, index)"
                        icon="fa-solid fa-heart" class="cursor-pointer text-red " />

                    <font-awesome-icon v-else icon="fa-regular fa-heart"
                        @click="likePostInPosts(post?._id, this.$store.state.auth.user?._id, index)"
                        class="cursor-pointer" />

                    <font-awesome-icon icon="fa-regular fa-comment" class="cursor-pointer"
                        @click="arriveToPost(post._id)" />
                    <font-awesome-icon v-if="this.$store.state.auth.user?.savedPosts && this.$store.state.auth.user?.savedPosts.length &&
                        this.$store.state.auth.user?.savedPosts.some(id => id == post?._id)"
                        icon="fa-solid fa-bookmark" class="absolute right-2 cursor-pointer"
                        @click="removeSavedPost(post?._id, this.$store.state.auth.user._id)" />
                    <font-awesome-icon v-else icon="fa-regular fa-bookmark" class="absolute right-2 cursor-pointer"
                        @click="savedPost(post?._id, this.$store.state.auth.user._id)" />
                </div>
            </div>
            <div class="post-footer mb-5 text-md">
                <span class="font-bold">{{ post?.likes.length }} lượt thích</span>
                <div class="">
                    <span class="font-bold mr-2">{{ post.owner?.fullName }}</span>
                    <span
                        v-if="post?.content && post?.content.length && post?.content.length > 0 && post?.content != 'undefined'">
                        {{ post?.content }}
                    </span>
                </div>
            </div>
        </div>
        <action-modal />
    </section>
</template>

<script>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import socket from "@/plugins/socket";

import { publicImage } from "@/constants/";

import postService from "@/services/post.service";

import usePost from "@/uses/usePost";
import useUser from "@/uses/useUser";

import actionModal from "@/components/client/actionModal.vue";

export default {
    name: "Post",
    components: {
        actionModal,
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const {
            getUserById,
        } = useUser();

        const {
            posts,
            getAllPosts,
            likePostInPosts,
            unLikePostInPosts,
            savedPost,
            removeSavedPost,
            setTime,
            arriveToPost,
        } = usePost();

        onBeforeMount(() => {
            getUserById(store.state.auth.user._id);
            getAllPosts();
        })


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

        const showActionModal = async (post) => {
            store.dispatch('post/handleSetPostAction', post);
            store.dispatch('modal/handleShowActionModal', true);
        }

        socket?.on("getPost", data => {
            console.log(data);
            posts.value = [...posts.value, data]
        })

        return {
            deletePost,
            showActionModal,
            setTime,
            likePostInPosts,
            unLikePostInPosts,
            savedPost,
            removeSavedPost,
            posts,
            publicImage,
            arriveToPost,
        }
    },
}
</script>

<style></style>