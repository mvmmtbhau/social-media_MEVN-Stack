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
                    <img v-if="(conversation.userOne?._id != this.$store.state.auth.user?._id)
                        && (conversation.userTwo?._id == this.$store.state.auth.user?._id)
                        && conversation.userOne?.avatar" :src="publicImage + conversation.userOne?.avatar.filename"
                        class="w-14 h-14 rounded-full">

                    <img v-if="(conversation.userTwo?._id != this.$store.state.auth.user?._id)
                        && (conversation.userOne?._id == this.$store.state.auth.user?._id)
                        && conversation.userTwo?.avatar" :src="publicImage + conversation.userTwo?.avatar.filename"
                        class="w-14 h-14 rounded-full">

                    <img v-else src="../../assets/images/no-avatar.jfif" class="w-14 h-14 rounded-full">
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
                            <span>
                                {{
                                    conversation.hasMessages[conversation.hasMessages.length - 1].message.length > 20
                                    ? conversation.hasMessages[conversation.hasMessages.length - 1].message.substring(0, 19) +
                                    '...'
                                    : conversation.hasMessages[conversation.hasMessages.length - 1].message
                                }}
                            </span>
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

import socket from "@/plugins/socket";

import { publicImage } from "@/constants";

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

        socket?.on('senderSend', (data) => {
            getConversations(store.state.auth.user?._id);
        })

        socket?.on('getMessage', (data) => {
            getConversations(store.state.auth.user?._id);
        })

        return {
            handleSelectChatbox,
            conversations,
            publicImage,
        }
    }
}

</script>