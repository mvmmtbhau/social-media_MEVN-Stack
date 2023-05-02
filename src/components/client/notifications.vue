<template>
    <section class="h-full w-[28rem] bg-white 
    shadow-[10px_0_10px_-5px_rgba(0,0,0,0.3)] border-l-2 -right-[28rem] flex flex-col">
        <div class="flex flex-col border-b-2 border-gray-200 ">
            <span class="text-2xl px-6 py-4 font-bold">Thông báo</span>
        </div>
        <div class="overflow-y-scroll h-[91%] flex flex-col mt-4">
            <div v-if="this.$store.state.auth.notifications">
                <div class="w-full flex items-center gap-3 hover:bg-gray-100 py-3 cursor-pointer"
                    v-for="noti in this.$store.state.auth.notifications" :key="noti"
                    @click="noti.postId ? arriveToPost(noti.postId) : arriveToUser(noti.fromUser._id)">
                    <div class="w-20">
                        <img @click.stop="arriveToUser(noti.fromUser._id)" v-if="noti.fromUser?.avatar"
                            :src="publicImage + noti.fromUser.avatar.filename" class="mx-auto w-12 h-12 rounded-full">
                        <img @click.stop="arriveToUser(noti.fromUser._id)" v-else src="../../assets/images/no-avatar.jfif"
                            class="mx-auto w-12 h-12 rounded-full">
                    </div>
                    <div class="flex w-[17rem] text-sm break-keep">
                        <p>
                            <b @click.stop="arriveToUser(noti.fromUser._id)">{{ noti.fromUser.fullName }}</b> {{ noti.text
                            }}
                        </p>
                    </div>
                </div>

            </div>
            <div v-else class="w-full flex items-center justify-center h-full">
                <span>Chưa có thông báo nào. Xấu hổ chưa lêu lêu</span>
            </div>
        </div>
    </section>
</template>

<script>
import { publicImage } from "@/constants/";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onBeforeMount, onMounted, ref } from "vue";

import socket from "@/plugins/socket";

import useNoti from "@/uses/useNoti";
import useUser from "@/uses/useNoti";
import usePost from "@/uses/useNoti";

export default {
    setup() {
        const store = useStore();
        const router = useRouter();

        const {
            getNotis,
        } = useNoti();

        const arriveToPost = (postId) => {
            router.push({
                name: 'DetailPost',
                params: { id: postId }
            })
        }

        const arriveToUser = (userId) => {
            router.push({
                name: 'User',
                params: { id: userId }
            })
        }

        onBeforeMount(() => {
            getNotis(store.state.auth.user?._id);
        })

        socket?.on("getLikePost", (data) => {
            getNotis(store.state.auth.user?._id);
        })

        socket?.on("getLikeComment", (data) => {
            getNotis(store.state.auth.user?._id);
        })

        socket?.on('getComment', (data) => {
            getNotis(store.state.auth.user?._id);
        })

        socket?.on('likeComment', (data) => {
            getNotis(store.state.auth.user?._id);
        })

        return {
            arriveToPost,
            arriveToUser,
            publicImage,
        }
    },
}
</script>