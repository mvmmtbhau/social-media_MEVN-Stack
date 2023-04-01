<template>
    <div class="h-full">
        <div class="h-full relative">
            <div class="p-4 border-bottom-1">
                <div class="flex gap-3">
                    <img src="../../assets/images/image-login.avif" class="h-6 w-6 rounded-full" />
                    <span class="font-bold" v-if="currentChat?.userOne._id === this.$store.state.auth.user._id">
                        {{ currentChat?.userTwo.fullName }}
                    </span>
                    <span class="font-bold" v-else>
                        {{ currentChat?.userOne.fullName }}
                    </span>
                </div>
                <div class="absolute top-3 right-4 text-2xl">
                    <div>
                        <font-awesome-icon icon="fa-solid fa-circle-info" class="cursor-pointer" />
                    </div>
                </div>
            </div>
            <div class="h-[80%] justify-end px-2 p-2 overflow-y-scroll">
                <div class="flex py-1 gap-2" v-for="message in messages" :key="message._id">
                    <div class="flex flex-col gap-2 w-full">
                        <span v-if="message.sender !== this.$store.state.auth.user._id"
                            class="message p-2 rounded-3xl max-w-[50%] w-fit break-keep bg-white">
                            {{ message.message }}
                        </span>
                        <span v-else-if="message.sender === this.$store.state.auth.user._id"
                            class="message p-2 rounded-3xl max-w-[50%] w-fit break-keep bg-black self-end">
                            {{ message.message }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="insert-chat absolute bottom-0 mx-4 my-2 bg-white rounded-3xl w-[90%]">
                <form class=" flex items-center relative auto"
                    @submit.prevent="sendMessage(currentChat?._id, currentChat?.userOne, currentChat?.userTwo)">
                    <input v-model="message" type="text" class="py-2 w-[70%] ml-10 break-words" placeholder="Nhắn tin...">
                    <font-awesome-icon class="text-2xl absolute left-2" icon="fa-regular fa-face-smile" />
                    <div class="absolute right-3">
                        <div v-if="!message" class="flex gap-2">
                            <font-awesome-icon class="text-2xl" icon="fa-regular fa-image" />
                            <font-awesome-icon class="text-2xl" icon="fa-regular fa-heart" />
                        </div>
                        <font-awesome-icon v-else icon="fa-solid fa-paper-plane"
                            class="text-xl cursor-pointer hover:scale-105" />
                    </div>
                </form>
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
        const router = useRouter();
        const route = useRoute();

        const currentChat = ref();
        const message = ref();
        const messages = ref();

        const fetchChatBox = async (chatBoxId) => {
            try {
                const response = await conversationService.getConversationById(chatBoxId);
                if(response.status == 200) {
                    currentChat.value = response.data;
                    messages.value = response.data.hasMessages;
                }
            } catch (err) {
                console.log(err);
            }
        }

        onBeforeMount(() => {
            fetchChatBox(route.params.id);
        })

        // const sendMessage = async (chatboxId, userOne, userTwo) => {
        //     if (!message.value) {
        //         return alert("Vui lòng nhập ký tự");
        //     }

        //     const [receiver] = [
        //         userOne,
        //         userTwo,
        //     ].filter(user =>
        //         user._id !== store.state.auth.user._id)

        //     const data = {
        //         conversationId: chatboxId,
        //         message: message.value,
        //         sender: store.state.auth.user._id,
        //     };

        //     socket.emit("sendMessage", {
        //         ...data,
        //         receiver: receiver._id,
        //     });

        //     try {
        //         const response = await messageService.sendMessage(data);
        //         if (response.status == 201) {

        //             messages.value = [...messages.value, response.data];
        //             message.value = '';
        //         }
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }

        // onMounted(() => {
        //     socket?.on("getMessage", async (message) => {
        //         messages.value = [...messages.value, message];
        //     });
        // })

        return {
            currentChat,
            message,
            messages,
        }
    }
}
</script>