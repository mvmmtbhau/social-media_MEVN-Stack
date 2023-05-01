<template>
    <section class="">
        <aside class="fixed z-10 top-0 flex border-r-2 border-gray-300">
            <section class="flex flex-col px-4 overflow-hidden transition duration-300"
                :class="{ 'w-20': this.$store.state.modal?.showSearchBox || this.$store.state.modal?.showNotifications }">
                <router-link to="/" class="text-3xl font-bold flex mx-auto py-10">
                    <font-awesome-icon
                        v-if="this.$store.state.modal?.showSearchBox || this.$store.state.modal?.showNotifications"
                        class="transition duration-300" icon="fa-brands fa-instagram" />
                    <span
                        :class="{ 'hidden': this.$store.state.modal?.showSearchBox || this.$store.state.modal?.showNotifications }">Instafake</span>
                </router-link>
                <div class="navigation relative flex flex-col gap-2 items-start text-lg">
                    <router-link to="/"
                        class=" hover:bg-gray-50 hover:rounded-3xl hover:translate-x-1 w-48 px-3 py-3 flex gap-4 transition duration-300">
                        <font-awesome-icon :icon="['fas', 'house']" class="text-2xl" />
                        <span :class="[
                            this.$store.state.modal?.showSearchBox || this.$store.state.modal?.showNotifications ? 'hidden' : '',
                            route.name == 'Home'
                                ? 'font-bold' : 'font-medium'
                        ]" class="text-[0.8]">Trang chủ</span>
                    </router-link>
                    <div id="showSearchBox"
                        class=" hover:bg-gray-50 hover:rounded-3xl cursor-pointer hover:translate-x-1 w-48 px-3 py-3 flex gap-4 transition duration-300">
                        <font-awesome-icon
                            :class="{ 'border-2 p-2 rounded-full -ml-2': this.$store.state.modal?.showSearchBox }"
                            class="text-2xl" icon="fa-solid fa-magnifying-glass" />
                        <span
                            :class="{ 'hidden': this.$store.state.modal?.showSearchBox || this.$store.state.modal?.showNotifications }"
                            class="font-medium text-[0.8]">Tìm kiếm</span>
                    </div>
                    <router-link to="/explore/people"
                        class=" hover:bg-gray-50 hover:rounded-3xl hover:translate-x-1 w-48 px-3 py-3 flex gap-4 transition duration-300">
                        <font-awesome-icon :icon="[
                            route.name != 'Explore-People'
                                || (route.name == 'Explore-People' &&
                                    this.$store.state.modal?.showSearchBox || this.$store.state.modal?.showNotifications)
                                ? 'far' : 'fas',
                            'compass']" class="text-2xl" />
                        <span :class="[
                            route.name == 'Explore-People' ? 'font-bold' : 'font-medium',
                            this.$store.state.modal?.showSearchBox || this.$store.state.modal?.showNotifications ? 'hidden' : ''
                        ]
                        " class=" text-[0.8]">Khám phá</span>
                    </router-link>
                    <router-link to="/inbox"
                        class=" hover:bg-gray-50 hover:rounded-3xl hover:translate-x-1 w-48 px-3 py-3 flex gap-4 transition duration-300">
                        <font-awesome-icon :icon="[
                            route.name != 'Inbox'
                                || (route.name == 'Inbox' &&
                                    this.$store.state.modal?.showSearchBox || this.$store.state.modal?.showNotifications)
                                ? 'far' : 'fas',
                            'message']" class="text-2xl" />
                        <span :class="[
                            route.name == 'Inbox' ? 'font-bold' : 'font-medium',
                            this.$store.state.modal?.showSearchBox || this.$store.state.modal?.showNotifications ? 'hidden' : ''
                        ]
                        " class=" text-[0.8]">Tin nhắn</span>
                    </router-link>
                    <div id="showNotifications"
                        class=" hover:bg-gray-50 hover:rounded-3xl hover:translate-x-1 w-48 px-3 py-3 flex gap-4 transition duration-300 cursor-pointer">
                        <font-awesome-icon v-if="!this.$store.state.modal?.showNotifications" class="text-2xl"
                            icon="fa-regular fa-heart" />
                        <font-awesome-icon v-else class="text-2xl"
                            :class="{ 'border-2 p-2 rounded-full -ml-2': this.$store.state.modal?.showNotifications }"
                            icon="fa-solid fa-heart" />
                        <span
                            :class="{ 'hidden': this.$store.state.modal?.showSearchBox || this.$store.state.modal?.showNotifications }"
                            class="font-medium text-[0.8]">Thông báo</span>
                    </div>
                    <div @click="handleShowModal"
                        class="hover:bg-gray-50 hover:rounded-3xl hover:translate-x-1 w-48 px-3 py-3 flex gap-4 transition duration-300 cursor-pointer">
                        <font-awesome-icon class="text-2xl" icon="fa-regular fa-square-plus" />
                        <span
                            :class="{ 'hidden': this.$store.state.modal?.showSearchBox || this.$store.state.modal?.showNotifications }"
                            class="font-medium text-[0.8]">Tạo bài viết</span>
                    </div>
                    <div v-if="this.$store.state.auth.user?._id" @click="arriveToUser(this.$store.state.auth.user?._id)"
                        class=" items-center hover:bg-gray-50 hover:rounded-3xl hover:translate-x-1 w-48 px-3 py-3 flex gap-4 transition duration-300 cursor-pointer">
                        <div :class="[
                            route.name == 'User' ? 'border-[2px] rounded-full border-black' : ''
                        ]">
                            <img class="w-6 h-6 rounded-full" src="../../assets/images/image-login.avif" alt="">
                        </div>
                        <span :class="[
                            this.$store.state.modal?.showSearchBox || this.$store.state.modal?.showNotifications ? 'hidden' : '',
                            route.name == 'User' ? 'font-bold' : 'font-medium'
                        ]" class="text-[0.8]">Trang cá nhân</span>
                    </div>
                    <div class="absolute bottom-8">
                        <div id="showMore"
                            class=" w-48 px-3 py-3 flex gap-4 transition duration-300 cursor-pointer hover:bg-gray-50 hover:rounded-3xl hover:translate-x-1">
                            <font-awesome-icon class="text-2xl" icon="fa-solid fa-bars" />
                            <span
                                :class="{ 'hidden': this.$store.state.modal?.showSearchBox || this.$store.state.modal?.showNotifications }"
                                class="font-medium text-[0.8]">
                                Xem thêm
                            </span>
                        </div>
                        <div v-if="isShowMore"
                            class="absolute bottom-12 left-3 w-48 rounded-md z-20 flex flex-col bg-black">
                            <router-link to="/accounts/edit"
                                class="py-2 px-2 flex items-center justify-between w-full cursor-pointer hover:text-black hover:bg-white border-b-2 border-white hover:border-black">
                                <span>Cài đặt</span>
                                <font-awesome-icon icon="fa-solid fa-gear" />
                            </router-link>
                            <div class="py-2 px-2 flex items-center justify-between w-full cursor-pointer hover:text-black hover:bg-white border-b-2 border-white hover:border-black"
                                @click="handleLogOut">
                                <span>Đăng xuất</span>
                                <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <search-box id="searchBox" :class="{ 'hidden': !this.$store.state.modal?.showSearchBox }"></search-box>
            <Notifications id="notifications" :class="{ 'hidden': !this.$store.state.modal?.showNotifications }" />
        </aside>
        <create-post />
        <action-modal />
    </section>
</template>

<script>
import createPost from '@/components/client/createPost.vue';
import SearchBox from "@/components/client/searchbox.vue";
import Notifications from "@/components/client/notifications.vue";
import actionModal from "@/components/client/actionModal.vue";

import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import socket from "@/plugins/socket";
import { onBeforeMount, ref, watch } from 'vue';

import useUser from '@/uses/useUser';

export default {
    name: 'sidebarNavigation',
    components: {
        createPost,
        SearchBox,
        Notifications,
        actionModal,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        const {
            arriveToUser,
        } = useUser();

        const isShowMore = ref(false);

        // Show thông báo
        document.addEventListener('click', (e) => {
            const showNotifications = document.getElementById('showNotifications');
            const notifications = document.getElementById('notifications');
            if (notifications.contains(e.target) || showNotifications.contains(e.target)) {
                store.dispatch('modal/handleShowNotifications', true);
            } else {
                store.dispatch('modal/handleShowNotifications', false);
            }
        })

        // Show searchbox
        document.addEventListener('click', (e) => {
            const showSearchBox = document.getElementById('showSearchBox');
            const searchBox = document.getElementById('searchBox');
            if (searchBox.contains(e.target) || showSearchBox.contains(e.target)) {
                store.dispatch('modal/handleShowSearchBox', true);
            } else {
                store.dispatch('modal/handleShowSearchBox', false);
            }
        })

        // Show moreOptions
        document.addEventListener('click', (e) => {
            const showMore = document.getElementById('showMore');
            if (showMore.contains(e.target) && isShowMore.value == false) {
                isShowMore.value = true;
            } else {
                isShowMore.value = false;
            }
        })


        const handleShowModal = () => {
            store.dispatch('modal/handleShowCreatePostModal', true);
        }

        const handleLogOut = () => {
            localStorage.removeItem('access_token');
            store.dispatch('auth/handleSetUser', null);
            router.push('/login');
            socket.on("disconnected");
        }

        return {
            handleShowModal,
            handleLogOut,
            arriveToUser,
            isShowMore,
            route,
        }
    },
}
</script>

