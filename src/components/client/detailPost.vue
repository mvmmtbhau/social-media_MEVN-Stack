<template>
    <div v-if="this.$store.state.post.post" class="fixed z-30">
        <div class="detail_post_modal flex items-center justify-center relative" @click="closeModal">
            <font-awesome-icon icon="fa-solid fa-xmark" @click="closeModal"
                class="absolute top-4 right-4 text-white text-2xl cursor-pointer" />
            <div class="modal bg-white h-[40rem] rounded-xl" @click.stop>
                <div class="h-full">
                    <div class="flex w-[70rem] h-full">
                        <div class="modal_image w-6/12">
                            <div class="relative h-full rounded-bl-xl rounded-tl-xl  overflow-hidden">
                                <v-carousel :continuous="false" dark hide-delimiter-background height="640"
                                    show-arrows="hover">
                                    <v-carousel-item v-for="image in this.$store.state.post.post?.images" :key="image">
                                        <v-sheet class="h-full w-full bg-cyan-500" tile>
                                            <div class="h-full w-full">
                                                <img :src="publicImage + image.filename"
                                                    class="h-full w-full object-contain">
                                            </div>
                                        </v-sheet>
                                    </v-carousel-item>
                                </v-carousel>
                            </div>
                        </div>
                        <div class="modal_content w-6/12 relative">
                            <div class="flex items-center gap-4 p-4 border-bottom-1">
                                <router-link :to="{
                                    name: 'User',
                                    params: { id: this.$store.state.post.post?.owner._id }
                                }">
                                    <img v-if="this.$store.state.post.post?.owner.avatar"
                                        :src="publicImage + this.$store.state.post.post?.owner.avatar"
                                        class="h-8 w-8 rounded-full">
                                    <img v-else src="../../assets/images/no-avatar.jfif" class="h-8 w-8 rounded-full">
                                </router-link>
                                <router-link :to="{
                                    name: 'User',
                                    params: { id: this.$store.state.post.post?.owner._id }
                                }" class="font-bold text-sm outline-1">
                                    {{ this.$store.state.post.post?.owner.fullName }}
                                </router-link>
                            </div>
                            <div class="p-4 text-sm max-w-full max-h-[65%] overflow-auto">
                                <div class="w-full flex flex-col gap-4">
                                    <div class="w-[90%] grid grid-cols-12 relative">
                                        <router-link :to="{
                                            name: 'User',
                                            params: { id: this.$store.state.post.post?.owner._id }
                                        }">
                                            <img v-if="this.$store.state.post.post?.owner.avatar"
                                                :src="publicImage + this.$store.state.post.post?.owner.avatar.filename"
                                                class="h-8 w-8 rounded-full object-cover col-auto">
                                            <img v-else src="../../assets/images/no-avatar.jfif"
                                                class="h-8 w-8 rounded-full object-cover col-auto">
                                        </router-link>
                                        <div class="flex flex-col gap-1 w-full col-span-10">
                                            <router-link :to="{
                                                name: 'User',
                                                params: { id: this.$store.state.post.post?.owner._id }
                                            }" class="font-bold">
                                                {{ this.$store.state.post.post?.owner.fullName }}
                                            </router-link>
                                            <div class="break-words w-[90%]">
                                                {{ this.$store.state.post.post?.content }}
                                            </div>
                                            <div class="text-gray-500 flex gap-3">
                                                <span>1 ngày</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-[90%] grid grid-cols-12 relative"
                                        v-for="(comment, index) in this.$store.state.post.comments" :key="index">
                                        <font-awesome-icon
                                            v-if="comment?.likes && comment?.likes.length &&
                                                comment?.likes.some(like => like.owner === this.$store.state.auth.user._id)"
                                            icon="fa-solid fa-heart"
                                            class="absolute top-0 right-0 cursor-pointer hover:scale-105 text-red"
                                            @click="handleUnLikeComment(comment._id, this.$store.state.auth.user._id, index)" />
                                        <font-awesome-icon v-else icon="fa-regular fa-heart"
                                            class="absolute top-0 right-0 cursor-pointer hover:scale-105"
                                            @click="handleLikeComment(comment._id, this.$store.state.auth.user._id, index)" />

                                        <router-link :to="{
                                            name: 'User',
                                            params: { id: comment?.owner._id }
                                        }">
                                            <img v-if="comment?.owner.avatar"
                                                :src="publicImage + comment?.owner.avatar.filename"
                                                class="h-8 w-8 rounded-full object-cover col-auto">
                                            <img v-else src="../../assets/images/no-avatar.jfif"
                                                class="h-8 w-8 rounded-full object-cover col-auto">
                                        </router-link>

                                        <div class="flex flex-col gap-1 w-full col-span-10">
                                            <router-link :to="{
                                                name: 'User',
                                                params: { id: comment?.owner._id }
                                            }" class="font-bold">
                                                {{ comment?.owner.fullName }}
                                            </router-link>
                                            <div class="break-words w-[90%]">
                                                {{ comment?.text }}
                                            </div>
                                            <div class="text-gray-500 flex gap-3">
                                                <span>1 ngày</span>
                                                <span>{{ comment?.likes.length }} lượt thích</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="actions absolute h-[10rem] w-full bottom-0 border-top-1">
                                <div class="relative text-2xl flex px-4 py-2 gap-4">
                                    <font-awesome-icon
                                        v-if="this.$store.state.post.post?.likes && this.$store.state.post.post?.likes.length &&
                                            this.$store.state.post.post?.likes.some(like => like.owner === this.$store.state.auth.user._id)"
                                        @click="handleUnLike(this.$store.state.post.post?._id, this.$store.state.auth.user._id)"
                                        icon="fa-solid fa-heart" class="cursor-pointer text-red " />

                                    <font-awesome-icon v-else icon="fa-regular fa-heart"
                                        @click="handleLike(this.$store.state.post.post?._id, this.$store.state.auth.user._id)"
                                        class="cursor-pointer" />
                                    <font-awesome-icon icon="fa-regular fa-comment" />
                                    <font-awesome-icon icon="fa-regular fa-bookmark" class="absolute right-4" />
                                </div>
                                <div class="px-4 py-2 flex flex-col gap-2">
                                    <p class="flex gap-2">
                                        <span class="font-bold">
                                            {{ this.$store.state.post.post.likes?.length }}
                                        </span>
                                        <span>lượt thích</span>
                                    </p>
                                    <p class="text-sm text-gray-500">
                                        1 ngày trước
                                    </p>
                                </div>
                                <div class="flex items-center gap-2 px-4">
                                    <font-awesome-icon class="text-2xl" icon="fa-regular fa-face-smile" />
                                    <input v-model="comment" type="text"
                                        @keydown.enter.exact="handleComment(this.$store.state.post.post._id, this.$store.state.auth.user._id)"
                                        class="py-2 w-[80%] break-word" placeholder="Thêm bình luận">
                                    <span class="px-2 cursor-pointer text-cyan-500 font-bold"
                                        @click="handleComment(this.$store.state.post.post._id, this.$store.state.auth.user._id)">Đăng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { publicImage } from "@/constants/";
import { ref } from '@vue/reactivity';
import { onBeforeMount, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import commentService from "@/services/comment.service";
import postService from "@/services/post.service";
import likeService from "@/services/like.service";
import likeCommentService from "@/services/likeComment.service";

import socket from "@/plugins/socket";

export default {
    name: 'detailPost',
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        const comment = ref();
        const detailPost = ref();
        const comments = ref();
        const likePosts = ref();
        const likeComments = ref();
        const postId = ref();

        onBeforeMount(() => {
            postId.value = route.params.id;
            fetchData(postId.value);
        })

        const fetchData = async (postId) => {
            try {
                const response = await postService.getPostById(postId);
                const comments = await commentService.getCommentsByPostId(postId);

                if (response.status == 200 && comments.status == 200) {
                    store.dispatch('post/handleDetailPost', response.data);
                    store.dispatch('post/handleComments', comments.data);
                }
            } catch (err) {
                console.log(err);
            }
        }

        const closeModal = () => {
            router.back();
            store.dispatch("post/handleDetailPost", null);
            store.dispatch("post/handleComments", null);
        }

        const handleComment = async (postId, userId) => {
            console.log(postId, userId, comment.value);

            const data = {
                text: comment.value,
                belongToPost: postId,
                owner: userId,
            };

            try {
                const response = await commentService.createComment(data);
                if (response.status == 201) {
                    comment.value = '';

                    if (!response.data.newNoti) {
                        comments.value = [...store.state.post.comments, response.data];
                        store.dispatch("post/handleComments", comments.value);
                        console.log('Không có thông báo');
                        return;
                    }
                    console.log('Có thông báo');

                    comments.value = [...store.state.post.comments, response.data.newComment];
                    store.dispatch("post/handleComments", comments.value);

                    socket.emit('createComment', response.data.newNoti)

                }
            } catch (err) {
                console.log(err);
            }
        }

        const handleLike = async (postId, userId) => {
            try {
                const data = {
                    belongToPost: postId,
                    owner: userId,
                }

                const response = await likeService.likePost(data);
                if (response.status == 201) {
                    store.dispatch("post/handleUpdatePostWithLike", response.data);
                }
            } catch (err) {
                console.log(err);
            }
        }

        const handleUnLike = async (postId, userId) => {
            try {
                const response = await likeService.unLikePost(postId, userId);
                if (response.status == 200 || response.status == 204) {
                    store.dispatch("post/handleUpdatePostWithDislike", response.data);
                    console.log("Bỏ thích thành công");
                }
            } catch (err) {
                console.log(err);
            }
        }

        const handleLikeComment = async (commentId, userId, index) => {
            try {
                const data = {
                    belongToComment: commentId,
                    owner: userId,
                }

                const response = await likeCommentService.likeComment(data);
                if (response.status == 201) {
                    console.log("Thích thành công")
                    store.dispatch('post/handleUpdateCommentsWithLike', { response, index });
                }

            } catch (err) {
                console.log(err);
            }
        }

        const handleUnLikeComment = async (commentId, userId, index) => {
            try {
                const data = {
                    belongToComment: commentId,
                    owner: userId,
                }

                const response = await likeCommentService.unlikeComment(commentId, userId);
                if (response.status == 200 || response.status == 204) {
                    console.log("Bỏ thích comment thành công")
                    store.dispatch('post/handleUpdateCommentsWithDislike', { response, index });
                }
            } catch (err) {
                console.log(err);
            }
        }

        return {
            closeModal,
            handleComment,
            handleLike,
            handleUnLike,
            handleLikeComment,
            handleUnLikeComment,
            publicImage,
            comment,
            detailPost,
            comments,
        }
    },
}
</script>

<style></style>