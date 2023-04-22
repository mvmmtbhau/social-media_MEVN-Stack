<template>
    <div>
        <div class="py-4 relative flex items-center justify-center border-bottom-1">
            <span class="font-bold">
                {{ this.$store.state.auth.user.fullName }}
            </span>
            <span class="absolute right-5">Cài đặt</span>
        </div>
        <div class="h-[90%] overflow-y-scroll">
            <div class="py-2 px-2 hover:bg-white" v-for="conversation in conversations" :key="conversation._id">
                <div class="flex items-center px-2 py-1 gap-4 cursor-pointer"
                    @click="handleSelectChatbox(conversation._id)">
                    <img src="../../assets/images/image-login.avif" class="w-14 h-14 rounded-full" />
                    <div class="flex flex-col justify-center">
                        <div v-if="conversation.userOne._id === this.$store.state.auth.user._id
                            && conversation.userTwo._id !== this.$store.state.auth.user._id">
                            <span class="font-bold">
                                {{ conversation.userTwo.fullName }}
                            </span>
                        </div>
                        <div v-if="conversation.userOne._id !== this.$store.state.auth.user._id
                            && conversation.userTwo._id === this.$store.state.auth.user._id">
                            <span class="font-bold">
                                {{ conversation.userOne.fullName }}
                            </span>
                        </div>

                        <div class="flex relative gap-2 text-gray-500">
                            <span>Tin nhắn</span>
                            <p class="flex absolute gap-1 -right-16">
                                <span>-</span>
                                <span>1 ngày</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import conversationService from "@/services/conversation.service";

export default {
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        const conversations = ref();

        onBeforeMount(() => {
            getConversations(store.state.auth.user?._id);
        })
        
        const getConversations = async (userId) => {
            try {
                const response = await conversationService.getConversationsByUserId(userId);
                if (response.status == 200) {
                    store.dispatch("auth/handleSetConversations", response.data);
                    conversations.value = store.state.auth?.conversations;
                }
            } catch (err) {
                console.log(err);
            }
        }

        const handleSelectChatbox = async (selectedId) => {
            router.push({
                name: 'ChatBox',
                params: { id: selectedId }
            })
        }

        return {
            handleSelectChatbox,
            conversations,

        }
    }
}

</script>