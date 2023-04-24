import postService from "@/services/post.service";
import commentService from "@/services/comment.service";
import likeService from "@/services/like.service";
import likeCommentService from "@/services/likeComment.service";

import { ref } from "vue";
import { useStore } from 'vuex';
import { useRouter } from "vue-router";

import useUser from '@/uses/useUser';

export default function () {
    const store = useStore();
    const router = useRouter();
    const { fetchCurrentUser } = useUser();

    const posts = ref();
    const comments = ref();

    const getAllPosts = async () => {
        try {
            const response = await postService.getAll(store.state.auth.user?._id);
            if (response.status === 200) {
                posts.value = response.data;
            }

        } catch (err) {
            if (err.response.status === 401) {
                router.push({ name: "Login" });
            }
        }
    }

    const likePostInPosts = async (postId, userId, index) => {
        try {
            const data = {
                belongToPost: postId,
                owner: userId,
            }

            const response = await likeService.likePost(data);
            if (response.status == 201) {
                posts.value[index].likes = [
                    ...posts.value[index].likes,
                    response.data.newNoti
                        ? response.data.newLike
                        : response.data
                ];

                if (response.data.newNoti) {
                    socket?.emit("likePost", response.data.newNoti);
                    return;
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const unLikePostInPosts = async (postId, userId, index) => {
        try {
            const response = await likeService.unLikePost(postId, userId);
            if (response.status == 200 || response.status == 204) {
                posts.value[index].likes = posts.value[index].likes.filter(like => like._id !== response.data._id);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getPostById = async (postId) => {
        try {
            const response = await postService.getPostById(postId);
            const comments = await commentService.getCommentsByPostId(postId);

            if (response.status == 200 && comments.status == 200) {
                store.dispatch('post/handleSetDetailPost', response.data);
                store.dispatch('post/handleSetComments', comments.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const likePost = async (postId, userId) => {
        try {
            const data = {
                belongToPost: postId,
                owner: userId,
            }

            const response = await likeService.likePost(data);
            if (response.status == 201) {
                store.dispatch('post/handleUpdatePostWithLike', response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const unLikePost = async (postId, userId) => {
        try {
            const response = await likeService.unLikePost(postId, userId);
            if (response.status == 200 || response.status == 204) {
                store.dispatch('post/handleUpdatePostWithDislike', response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const commentPost = async (text, postId, userId) => {
        try {
            const data = {
                text,
                belongToPost: postId,
                owner: userId,
            };

            const response = await commentService.createComment(data);
            if (response.status == 201) {
                comments.value = [
                    ...store.state.post.comments,
                    response.data.newNoti
                        ? response.data.newComment
                        : response.data
                ];
                store.dispatch('post/handleSetComments', comments.value)

                if (response.data.newNoti) {
                    socket.emit('createComment', response.data.newNoti);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const likeComment = async (commentId, userId, index) => {
        try {
            const data = {
                belongToComment: commentId,
                owner: userId,
            }

            const response = await likeCommentService.likeComment(data);
            if (response.status == 201) {
                const newLikeComment = response.data.newNoti ? response.data.newLikeComment : response.data;
                store.dispatch(
                    'post/handleUpdateCommentsWithLike',
                    { newLikeComment, index }
                )
            }

        } catch (err) {
            console.log(err);
        }
    }

    const unLikeComment = async (commentId, userId, index) => {
        try {

            const response = await likeCommentService.unlikeComment(commentId, userId);
            if (response.status == 200 || response.status == 204) {
                const newLikeComment = response.data.newNoti ? response.data.newLikeComment : response.data;
                store.dispatch(
                    'post/handleUpdateCommentsWithDislike',
                    { newLikeComment, index }
                )
            }
        } catch (err) {
            console.log(err);
        }
    }

    const savedPost = async (postId, userId) => {
        try {
            const data = {
                postId,
                userId,
            };

            const response = await postService.savedPost(data);
            if (response.status == 201) {
                fetchCurrentUser(userId);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const removeSavedPost = async (postId, userId) => {
        try {
            const data = {
                postId,
                userId,
            };

            const response = await postService.removeSavedPost(data);
            if (response.status == 200) {
                fetchCurrentUser(userId);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const setTime = (start) => {
        const thisTime = new Date(Date.now());
        const startAt = new Date(start);

        // 1 phút = 60(s) * 1000(milis);
        // 1 giờ = 3600(s/h) * 1000(milis);
        // 1 ngày = 86400(s/24h) * 1000(milis);
        // 1 tuần = 86400*7 * 1000(milis);
        // 1 tháng = 86400*30 * 1000;
        const timeAfterSub = thisTime.getTime() - startAt.getTime();

        const days = Math.floor(timeAfterSub/(86400*1000));
        const weeks = Math.floor(timeAfterSub/(86400*7*1000));
        const months = Math.floor(timeAfterSub/(86400*30*1000));
        const hours = Math.floor(timeAfterSub/(3600*1000));
        const minutes = Math.floor(timeAfterSub/(60*1000));

        if(months > 0) {
            return `${months} tháng`;
        }

        if(weeks > 0) {
            return `${weeks} tuần`;
        }

        if(days > 0) {
            return `${days} ngày`;
        }

        if(hours > 0) {
            return `${hours} giờ`;
        }

        if(minutes >= 0) {
            return minutes == 0 ? `1 phút` : `${minutes} phút`;
        }
    }

    const arriveToPost = (postId) => {
        router.push({
            name: 'DetailPost',
            params: {
                id: postId
            }
        })
    }

    return {
        getAllPosts,
        likePostInPosts,
        unLikePostInPosts,
        getPostById,
        likePost,
        unLikePost,
        commentPost,
        likeComment,
        unLikeComment,
        savedPost,
        removeSavedPost,
        setTime,
        arriveToPost,
        posts
    }
}