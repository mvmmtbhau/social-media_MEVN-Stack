<template>
    <div v-if="this.$store.state.modal.showActionModal" class="fixed z-40">
        <div v-if="this.$store.state.post.postAction" class="fixed top-0 bottom-0 left-0 right-0 bg-black/[0.2] flex items-center justify-center"
            @click="hiddenModal()">
            <div v-if="!showOptionReport">
                <div v-if="this.$store.state.auth.user?._id != this.$store.state.post.postAction?.owner._id"
                    class="modal bg-white rounded w-[25rem]" @click.stop>
                    <div @click="showOptionReport = true"
                        class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center text-red-500 font-bold border-b-[1px] border-black/[0.3] rounded-tl-[0.6rem] rounded-tr-[0.6rem]">
                        Báo cáo
                    </div>
                    <div v-if="this.$store.state.auth.user?.follows.some(follow => follow.followUser._id == this.$store.state.post.postAction?.owner._id)"
                        class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center text-red-500 font-bold border-b-[1px] border-black/[0.3]">
                        Bỏ theo dõi
                    </div>
                    <div v-else class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center text-red-500 font-bold border-b-[1px] border-black/[0.3]">
                        Theo dõi
                    </div>
                    <div @click="arriveToPost(this.$store.state.post.postAction._id); hiddenModal()"
                    class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center border-b-[1px] border-black/[0.3]">
                        Đi tới bài viết
                    </div>
                    <div @click="hiddenModal()" class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center border-b-[1px] border-black/[0.3] rounded-bl-[0.6rem] rounded-br-[0.6rem]">
                        Hủy
                    </div>
                </div>
                <div v-else-if="!showConfirmDelete" class="modal bg-white rounded w-[25rem]" @click.stop>
                    <div @click="showConfirmDelete = true"
                        class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center text-red-500 font-bold border-b-[1px] border-black/[0.3] rounded-tl-[0.6rem] rounded-tr-[0.6rem]">
                        Xóa
                    </div>
                    <div @click="arriveToPost(this.$store.state.post.postAction._id); hiddenModal()"
                    class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center border-b-[1px] border-black/[0.3]">
                        Đi tới bài viết
                    </div>
                    <div @click="hiddenModal()" class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center border-b-[1px] border-black/[0.3] rounded-bl-[0.6rem] rounded-br-[0.6rem]">
                        Hủy
                    </div>
                </div>
                <div v-else class="modal bg-white rounded w-[25rem]" @click.stop>
                    <div class="flex flex-col gap-2 items-center px-4 py-4 border-b-[1px] border-black/[0.3]">
                        <span class="text-xl">Xóa bài viết?</span>
                        <span class="text-sm text-gray-500">Bạn có chắc chắn muốn xóa bài viết này không?</span>
                    </div>
                    <div @click="handleDeletePost(this.$store.state.post.postAction?._id)"
                        class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center text-red-500 font-bold border-b-[1px] border-black/[0.3] rounded-tl-[0.6rem] rounded-tr-[0.6rem]">
                        Xóa
                    </div>
                    <div @click="hiddenModal()" class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center border-b-[1px] border-black/[0.3] rounded-bl-[0.6rem] rounded-br-[0.6rem]">
                        Hủy
                    </div>
                </div>
            </div>
            <div v-else-if="!reportDone">
                <div class="modal bg-white rounded w-[25rem]" @click.stop>
                    <div
                        class="relative flex gap-3 px-4 py-3 items-center w-full justify-center border-b-[1px] border-black/[0.5]">
                        <span class="font-bold">Báo cáo</span>
                        <font-awesome-icon icon="fa-solid fa-xmark" class="absolute right-4 text-xl cursor-pointer" />
                    </div>
                    <div class="relative flex gap-3 px-4 py-3 w-full border-b-[1px] border-black/[0.2]">
                        <span class="font-bold">Tại sao bạn báo cáo bài viết này?</span>
                    </div>
                    <div v-for="option in options" :key="option"
                        @click="handleReport(this.$store.state.post.postAction._id, this.$store.state.post.commentAction?._id, this.$store.state.auth.user?._id, option._id)"
                        class="relative cursor-pointer flex items-center justify-between gap-3 px-4 py-3 w-full active:bg-gray-200 transition-all duration-100 border-b-[1px] border-black/[0.2]">
                        <span class="text-sm">{{ option.text }}</span>
                        <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-gray-400" />
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="modal bg-white rounded w-[25rem]" @click.stop>
                    <div class="relative flex flex-col gap-3 px-4 py-3 w-full border-b-[1px] border-black/[0.2]">
                        <font-awesome-icon :icon="['far', 'circle-check']" class="text-green-500 text-3xl" />
                        <span class="font-bold text-center">Bạn không muốn nhìn thấy nội dụng này ư?</span>
                        <span class="text-center text-sm">
                            Khi nhìn thấy nội dung mình không thích trên Instafake,
                            bạn có thể báo cáo nếu nội dung này vi phạm Nguyên tắc cộng đồng của chúng tôi hoặc xóa người
                            chia sẻ nội dung này khỏi trải nghiệm của bạn.
                        </span>
                    </div>
                    <div @click="hiddenModal()"
                        class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer justify-center active:bg-gray-200 transition-all duration-100
                         text-cyan-500 font-bold border-b-[1px] border-black/[0.3] rounded-tl-[0.6rem] rounded-tr-[0.6rem]">
                        <span>Đóng</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="fixed top-0 bottom-0 left-0 right-0 bg-black/[0.2] flex items-center justify-center"
            @click="hiddenModal()">
            <div v-if="!showOptionReport">
                <div v-if="this.$store.state.auth.user?._id != this.$store.state.post.commentAction?.owner._id"
                    class="modal bg-white rounded w-[25rem]" @click.stop>
                    <div @click="showOptionReport = true"
                        class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center text-red-500 font-bold border-b-[1px] border-black/[0.3] rounded-tl-[0.6rem] rounded-tr-[0.6rem]">
                        Báo cáo
                    </div>
                    <div @click="hiddenModal()" class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center border-b-[1px] border-black/[0.3] rounded-bl-[0.6rem] rounded-br-[0.6rem]">
                        Hủy
                    </div>
                </div>
                <div v-else-if="!showConfirmDelete" class="modal bg-white rounded w-[25rem]" @click.stop>
                    <div @click="showConfirmDelete = true"
                        class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center text-red-500 font-bold border-b-[1px] border-black/[0.3] rounded-tl-[0.6rem] rounded-tr-[0.6rem]">
                        Xóa
                    </div>
                    <div @click="hiddenModal()" class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center border-b-[1px] border-black/[0.3] rounded-bl-[0.6rem] rounded-br-[0.6rem]">
                        Hủy
                    </div>
                </div>
                <div v-else class="modal bg-white rounded w-[25rem]" @click.stop>
                    <div class="flex flex-col gap-2 items-center px-4 py-4 border-b-[1px] border-black/[0.3]">
                        <span class="text-xl">Xóa bình luận?</span>
                        <span class="text-sm text-gray-500">Bạn có chắc chắn muốn xóa bình luận này không?</span>
                    </div>
                    <div @click="handleDeleteComment(this.$store.state.post.commentAction?._id)"
                        class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center text-red-500 font-bold border-b-[1px] border-black/[0.3] rounded-tl-[0.6rem] rounded-tr-[0.6rem]">
                        Xóa
                    </div>
                    <div @click="hiddenModal()" class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer active:bg-gray-200 transition-all duration-100
                     justify-center border-b-[1px] border-black/[0.3] rounded-bl-[0.6rem] rounded-br-[0.6rem]">
                        Hủy
                    </div>
                </div>
            </div>
            <div v-else-if="!reportDone">
                <div class="modal bg-white rounded w-[25rem]" @click.stop>
                    <div
                        class="relative flex gap-3 px-4 py-3 items-center w-full justify-center border-b-[1px] border-black/[0.5]">
                        <span class="font-bold">Báo cáo</span>
                        <font-awesome-icon icon="fa-solid fa-xmark" class="absolute right-4 text-xl cursor-pointer" />
                    </div>
                    <div class="relative flex gap-3 px-4 py-3 w-full border-b-[1px] border-black/[0.2]">
                        <span class="font-bold">Tại sao bạn báo cáo bài viết này?</span>
                    </div>
                    <div v-for="option in options" :key="option"
                        @click="handleReport(this.$store.state.post.postAction?._id, this.$store.state.post.commentAction?._id, this.$store.state.auth.user?._id, option._id)"
                        class="relative cursor-pointer flex items-center justify-between gap-3 px-4 py-3 w-full active:bg-gray-200 transition-all duration-100 border-b-[1px] border-black/[0.2]">
                        <span class="text-sm">{{ option.text }}</span>
                        <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-gray-400" />
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="modal bg-white rounded w-[25rem]" @click.stop>
                    <div class="relative flex flex-col gap-3 px-4 py-3 w-full border-b-[1px] border-black/[0.2]">
                        <font-awesome-icon :icon="['far', 'circle-check']" class="text-green-500 text-3xl" />
                        <span class="font-bold text-center">Bạn không muốn nhìn thấy nội dụng này ư?</span>
                        <span class="text-center text-sm">
                            Khi nhìn thấy nội dung mình không thích trên Instafake,
                            bạn có thể báo cáo nếu nội dung này vi phạm Nguyên tắc cộng đồng của chúng tôi hoặc xóa người
                            chia sẻ nội dung này khỏi trải nghiệm của bạn.
                        </span>
                    </div>
                    <div @click="hiddenModal()"
                        class="relative flex gap-3 px-4 py-3 items-center w-full cursor-pointer justify-center active:bg-gray-200 transition-all duration-100
                         text-cyan-500 font-bold border-b-[1px] border-black/[0.3] rounded-tl-[0.6rem] rounded-tr-[0.6rem]">
                        <span>Đóng</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- Bạn không muốn nhìn thấy bình luận này ư? -->
<!-- Khi nhìn thấy nội dung mình không thích trên Instagram, bạn có thể báo cáo nếu nội dung này vi phạm Nguyên tắc cộng đồng của chúng tôi hoặc xóa người chia sẻ nội dung này khỏi trải nghiệm của bạn. -->

<script>
import { onBeforeMount, ref, toRef, watch } from 'vue';
import { useStore } from 'vuex';

import optionService from "@/services/option_report.service";

import useReport from "@/uses/useReport";
import usePost from "@/uses/usePost";
import { useRoute, useRouter } from 'vue-router';

export default {
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        const showOptionReport = ref(false);
        const showConfirmDelete = ref(false);
        const reportDone = ref(false);
        const options = ref();

        const {
            addNewReport,
        } = useReport();

        const {
            arriveToPost,
            getAllPosts,
            deletePost,
            deleteComment,
        } = usePost();

        const hiddenModal = () => {
            reportDone.value = false;
            showOptionReport.value = false;
            showConfirmDelete.value = false;
            store.dispatch('post/handleSetPostAction', null);
            store.dispatch('post/handleSetCommentAction', null);
            store.dispatch('modal/handleShowActionModal', false);
        }

        const fetchOptions = async () => {
            try {
                const response = await optionService.getOptions();
                if (response.status == 200) {
                    options.value = response.data;
                }
            } catch (err) {
                console.log(err);
            }
        }

        watch(() => route.name, () => {
            console.log(`Current route: ${route.name}`);
        })

        const handleDeletePost = async (postId) => {
            const response = await deletePost(postId);

            if(route.name == 'DetailPost') {
                router.back();
            }
            hiddenModal();
        }

        const handleDeleteComment = async (commentId) => {
            const response = await deleteComment(commentId);

            hiddenModal();
        }

        const handleReport = async (postId, commentId, userId, optionId) => {
            const response = await addNewReport(postId, commentId, userId, optionId);
            if (response.status == 201) {
                getAllPosts(userId);
                reportDone.value = true;
            }
        }

        onBeforeMount(() => {
            fetchOptions();
        })

        return {
            hiddenModal,
            handleReport,
            handleDeletePost,
            handleDeleteComment,
            arriveToPost,
            showOptionReport,
            showConfirmDelete,
            reportDone,
            options,
        }
    }
}
</script>