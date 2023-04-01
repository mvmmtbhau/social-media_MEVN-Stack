<template>
    <section>
        <div class="sidebar px-2 py-2">
            <div class="flex gap-5 items-center">
                <img v-if="this.$store.state.auth.user?.avatar"
                        :src="publicImage + this.$store.state.auth.user?.avatar.filename"
                        class="w-14 h-14 rounded-full">
                    <img v-else src="../../assets/images/no-avatar.jfif" class="w-14 h-14 rounded-full">
                <div class="flex flex-col">
                    <span class="font-bold">{{ this.$store.state.auth.user?.fullName }}</span>
                </div>
            </div>
            <div class="mt-2">
                <div class="py-3 relative text-sm">
                    <span class="text-gray-500">Gợi ý cho bạn</span>
                    <span class="absolute right-0 font-bold">Xem tất cả</span>
                </div>
                <div class="flex items-center gap-3 text-sm relative py-2">
                    <img src="../../assets/images/image-login.avif" class="w-8 h-8 rounded-full">
                    <div>
                        <span class="font-bold">Username</span>
                    </div>
                    <span class="absolute right-0 text-cyan-500 hover:text-cyan-700 cursor-pointer">Theo dõi</span>
                </div>
            </div>
        </div>
    </section>  
</template>

<script>
import { useStore } from 'vuex';
import {publicImage} from "@/constants"

export default {
    name: 'SidebarHome',
    setup() {
        const store = useStore();

        return {
            publicImage
        }        
    }
}
</script>