<template>
    <section class="px-10 py-10">
        <p class="text-2xl mb-6">Ai có thể xem nội dung của bạn</p>
        <div class="">
            <p class="text-sm font-[600] mb-2">Quyền riêng tư của tài khoản</p>
            <label for="private" class="flex gap-2 py-1 items-center">
                <div class="border-2 h-4 w-4 rounded-sm">
                    <font-awesome-icon v-if="this.$store.state.auth.user.private" :icon="['fas', 'check']" class="mb-1 text-sm" />
                </div>
                <span class="text-sm font-[600]">Tài khoản riêng tư</span>
                <input v-if="!this.$store.state.auth.user.private" @click="showModalConfirmPrivate = true;" type="checkbox" id="private"
                    name="private">
                <input v-else @click="showModalConfirmPublic = true;" type="checkbox" id="private" name="private">
            </label>
            <div class="select-text my-2 pb-2 border-b-2 text-sm text-grey-darken-2 flex flex-col gap-2">
                <p class="">
                    Khi bạn đặt tài khoản ở chế độ công khai, bất kì ai cũng có thể xem trang cá nhân và bài viết của bạn.
                </p>
                <p>
                    Khi bạn đặt tài khoản ở chế độ riêng tư, chỉ những người theo dõi được phê duyệt mới có thể xem nội dung
                    mà bạn chia sẻ - bao gồm ảnh hoặc video, cũng như danh sách theo dõi và danh sách người theo dõi của
                    bạn.
                </p>
            </div>
        </div>
        <div v-if="showModalConfirmPrivate" class="fixed z-20">
            <div class="upload_file_modal flex items-center justify-center relative"
                @click="showModalConfirmPrivate = false">
                <div class="modal bg-white h-[17rem] rounded-[0.6rem] max-w-[25rem]" @click.stop>
                    <div class="text-center text-xl py-5">
                        Chuyển sang tài khoản riêng tư?
                    </div>
                    <div class="flex flex-col px-10 gap-4">
                        <div class="flex items-center gap-4">
                            <font-awesome-icon class="text-xl" :icon="['fas', 'film']" />
                            <span class="text-sm">Chỉ người theo dõi bạn mới nhìn thấy ảnh và video của bạn.</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <font-awesome-icon class="text-xl" :icon="['fas', 'at']" />
                            <span class="text-sm">Những người có thể nhắn tin sẽ không thay đổi.</span>
                        </div>
                    </div>
                    <div class="flex flex-col mt-6">
                        <div class="border-2 w-full py-3 text-cyan-500 font-bold text-sm text-center cursor-pointer"
                            @click="changePrivateState(this.$store.state.auth.user._id)">
                            Chuyển sang tài khoản riêng tư
                        </div>
                        <div class="py-2 text-center cursor-pointer text-sm" @click="showModalConfirmPrivate = false">
                            Hủy
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showModalConfirmPublic" class="fixed z-20">
            <div class="upload_file_modal flex items-center justify-center relative"
                @click="showModalConfirmPublic = false">
                <div class="modal bg-white h-[17rem] rounded-[0.6rem] max-w-[25rem]" @click.stop>
                    <div class="text-center text-xl py-5">
                        Chuyển sang tài khoản công khai?
                    </div>
                    <div class="flex flex-col px-10 gap-4">
                        <div class="flex items-center gap-4">
                            <font-awesome-icon class="text-xl" :icon="['fas', 'film']" />
                            <span class="text-sm">
                                Bất kỳ ai cũng có thể xem bài viết, video và tin của bạn.
                            </span>
                        </div>
                        <div class="flex items-center gap-4">
                            <font-awesome-icon class="text-xl" :icon="['fas', 'at']" />
                            <span class="text-sm">Những người có thể nhắn tin sẽ không thay đổi.</span>
                        </div>
                    </div>
                    <div class="flex flex-col mt-6">
                        <div class="border-2 w-full py-3 text-cyan-500 font-bold text-sm text-center cursor-pointer"
                            @click="changePrivateState(this.$store.state.auth.user._id)">
                            Chuyển sang tài khoản công khai
                        </div>
                        <div class="py-2 text-center cursor-pointer text-sm" @click="showModalConfirmPublic = false">
                            Hủy
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

import authService from "@/services/auth.service";

export default {
    setup() {
        const store = useStore();

        const showModalConfirmPrivate = ref(false);
        const showModalConfirmPublic = ref(false);

        const changePrivateState = async (userId) => {
            try {
                const response = await authService.changePrivateState(userId);
                if(response.status == 200) {
                    showModalConfirmPrivate.value = false;
                    showModalConfirmPublic.value = false;
                    store.dispatch('auth/handleUpdateUserWithNewPrivateState', response.data.newState)
                }
            } catch (err) {
                console.log(err);
            }
        }

        return {
            changePrivateState,
            showModalConfirmPrivate,
            showModalConfirmPublic,
        }
    }
}
</script>