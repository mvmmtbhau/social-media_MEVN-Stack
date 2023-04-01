<template>
    <div>
        <router-link :to="{ name: 'EditAccount' }" class="px-8 py-3 cursor-pointer hover:bg-cyan-50">Chỉnh sửa trang cá
            nhân</router-link>
        <router-link :to="{name: 'ChangePassword'}" class="px-8 py-3 cursor-pointer hover:bg-cyan-50">Đổi mật khẩu</router-link>
        <router-link :to="{name: 'WhoCanSeeYourContent'}" class="px-8 py-3 cursor-pointer hover:bg-cyan-50">Ai có thể xem nội dung của bạn</router-link>
    </div>
</template>

<script>
import { ref, watch } from 'vue';


export default {
    setup() {
        

        return {

        }
    }
}
</script>