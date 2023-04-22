<template>
    <main class="w-full h-full">
        <div class="h-[650px] flex bg-gray-50">
            <ListChat class="w-[35%] border-top-1 border-left-1 border-right-1 border-bottom-1" />
            <!-- <ChatBox /> -->
            <div class="w-[65%] border-top-1 border-right-1 border-bottom-1">
                <div v-if="!true" class="flex h-full flex-col gap-2 items-center justify-center">
                    <span class="text-2xl">Tin nhắn của bạn</span>
                    <span class="text-gray-400 text-md">Gửi ảnh và tin nhắn riêng tư cho bạn bè</span>
                    <button type="submit"
                        class="bg-cyan-500 text-white p-2 rounded-full mt-2 hover:bg-cyan-600 hover:-translate-y-1">Gửi
                        tin nhắn</button>
                </div>
                <router-view :key="this.$route.fullPath"></router-view>
            </div>
        </div>
    </main>
</template>

<script>
import { ref, watch } from "@vue/runtime-core";
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import ListChat from "@/components/client/listChat.vue";
import ChatBox from "@/components/client/chatbox.vue";

export default {
    components: {
        ListChat,
        ChatBox,
    }
    ,
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        return {
        }
    },
}
</script>
