<template>
    <section class="px-10 py-10">
        <p class="text-2xl mb-6">Ai có thể xem nội dung của bạn</p>
        <div class="">
            <p class="text-sm font-[600] mb-2">Quyền riêng tư của tài khoản</p>
            <label for="private" class="flex gap-2 py-1 items-center">
                <div class="border-2 h-4 w-4 rounded-sm">
                    <font-awesome-icon v-if="privateState" :icon="['fas', 'check']" class="mb-1 text-sm" />
                </div>
                <span class="text-sm font-[600]" v-if="!privateState">Tài khoản riêng tư</span>
                <span class="text-sm font-[600]" v-else>Tài khoản công khai</span>
                <input type="checkbox" id="private" name="private" @click="showModalConfirm">
            </label>
            <div class="select-text my-2 pb-2 border-b-2 text-sm text-grey-darken-2 flex flex-col gap-2">
                <p class="">
                    Khi bạn đặt tài khoản ở chế độ công khai, bất kì ai cũng có thể xem trang cá nhân và bài viết của bạn.
                </p>
                <p>
                    Khi bạn đặt tài khoản ở chế độ riêng tư, chỉ những người theo dõi được phê duyệt mới có thể xem nội dung
                    mà bạn chia sẻ - bao gồm ảnh hoặc video, cũng như danh sách theo dõi và danh sách người theo dõi của bạn.
                </p>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const privateState = ref(store.state.auth.user.private);

        const handleChange = async () => {

        }

        return {
            handleChange,
            privateState
        }
    }
}
</script>