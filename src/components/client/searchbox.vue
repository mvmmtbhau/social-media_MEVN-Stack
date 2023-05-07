<template>
    <section class="h-full w-[28rem] bg-white 
                                shadow-[10px_0_10px_-5px_rgba(0,0,0,0.3)] border-l-2 -right-[28rem] flex flex-col">
        <div class="flex flex-col border-b-2 pb-10 border-gray-200 ">
            <span class="text-2xl px-6 py-8 font-bold">Tìm kiếm</span>
            <div class="relative bg-gray-100 border-2 w-[90%] mx-auto pl-3 py-2 rounded-md">
                <input type="text" v-model="searchText" class="w-full" placeholder="Tìm kiếm">
                <span @click="searchText = ''" class="absolute right-4 cursor-pointer">
                    <font-awesome-icon  icon="fa-solid fa-xmark" />
                </span>
            </div>
        </div>
        <div v-if="searchResult" class="flex flex-col h-[80%] overflow-y-scroll">
            <div v-if="searchResult.length">
                <div v-for="(user, index) in searchResult" :key="index" @click="selectSearch(user)"
                    class="w-full flex items-center gap-3 relative hover:bg-gray-200 px-6 py-2 cursor-pointer">
                    <img v-if="user?.avatar" :src="publicImage + user?.avatar.filename"
                        class="h-12 w-12 rounded-full object-cover">
                    <img v-else src="../../assets/images/no-avatar.jfif" class="h-12 w-12 rounded-full object-cover">
                    <div class="flex gap-2">
                        <span class="font-bold">
                            {{ user.fullName }}
                        </span>
                    </div>
                </div>
            </div>
            <div v-else class="flex items-center justify-center h-full">
                <span>Không tìm thấy kết quả trùng khớp</span>
            </div>

        </div>
        <div v-else class="pt-3 flex flex-col h-[80%] overflow-y-scroll">
            <div class="flex py-2 items-center justify-between px-6">
                <span class="font-bold">Gần đây</span>
                <span v-if="this.$store.state.auth.searchHistory && this.$store.state.auth.searchHistory.histories.length"
                    class="text-cyan-500 font-[500] cursor-pointer hover:text-black"
                    @click="handleRemoveAll(this.$store.state.auth.searchHistory)">
                    Xóa tất cả
                </span>
            </div>
            <div v-if="this.$store.state.auth.searchHistory && this.$store.state.auth.searchHistory.histories.length">
                <div v-for="(history, index) in this.$store.state.auth.searchHistory.histories" :key="index"
                    class="w-full flex items-center gap-3 relative hover:bg-gray-200 px-6 py-2 cursor-pointer"
                    @click="arriveHistory(history)">
                    <img v-if="history?.avatar" :src="publicImage + history?.avatar.filename"
                        class="h-12 w-12 rounded-full object-cover">
                    <img v-else src="../../assets/images/no-avatar.jfif" class="h-12 w-12 rounded-full object-cover">
                    <div class="flex gap-2">
                        <span class="font-bold break-words">
                            {{ history.fullName }}
                        </span>
                        <span v-if="this.$store.state.auth.user.follows.some(follow => follow._id == history._id)"
                            class="text-[rgba(0,0,0,0.5)] flex gap-1">
                            <p>-</p>
                            <p>Đang theo dõi</p>
                        </span>
                    </div>
                    <font-awesome-icon @click.stop="handleRemove(history, index)" icon="fa-solid fa-xmark"
                        class="absolute right-8 text-2xl text-gray-400" />
                </div>
            </div>
            <div v-else class="flex items-center justify-center h-full">
                <span>Không có lịch sử tìm kiếm gần đây</span>
            </div>
        </div>
    </section>
</template>

<script>
import { onBeforeMount, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { publicImage } from "@/constants/"

import searchService from "@/services/search.service";
import { useRouter } from 'vue-router';

export default {
    name: "SearchBox",
    setup() {
        const store = useStore();
        const router = useRouter();
        const searchText = ref();
        const searchResult = ref();

        const handleSearch = async (searchKey) => {
            try {
                const response = await searchService.searching(searchKey, store.state.auth.user._id);
                if (response.status == 200) {
                    searchResult.value = response.data;
                }
            } catch (err) {
                console.log(err);
            }
        }

        watch(searchText, (newVal) => {
            if (newVal) {
                handleSearch(newVal);
            } else {
                searchResult.value = '';
            }
        });

        const selectSearch = async (user) => {
            try {
                const data = {
                    userId: store.state.auth.user._id,
                    newSearch: user,
                }

                if (!store.state.auth.searchHistory.histories.some(h => h._id == user._id)) {
                    const response = await searchService.saveNewSearch(data);
                    if (response.status == 201) {
                        store.dispatch('auth/handleUpdateSearchHistoryWithSearch', response.data);
                        console.log(response.data);
                    }
                }
                searchText.value = '';
                router.push({
                    name: 'User',
                    params: { id : user._id}
                })
                

            } catch (err) {
                console.log(err);
            }
        }

        const handleRemove = async (history, index) => {
            try {
                const data = {
                    history: history,
                    owner: store.state.auth.user._id,
                };

                const response = await searchService.removeHistory(data);
                if (response.status == 200) {
                    store.dispatch("auth/handleUpdateSearchHistoryWithRemove", history);
                }
            } catch (err) {
                console.log(err);
            }
        }

        const handleRemoveAll = async (history) => {
            try {
                const response = await searchService.removeAll(history);
                if(response.status == 200) {
                    store.dispatch("auth/handleUpdateSearchHistoryWithRemoveAll", history);
                }
            } catch (err) {
                console.log(err);
            }
        }

        const arriveHistory = (user) => {
            router.push({
                name: 'User',
                params: {id : user._id}
            });
        }

        const fetchHistory = async (userId) => {
            try {
                const response = await searchService.getByUserId(userId);
                if (response.status == 200) {
                    store.dispatch("auth/handleSetSearchHistory", response.data);
                }
            } catch (err) {
                console.log(err);
            }
        }

        onBeforeMount(() => {
            if(store.state.auth.user) {
                fetchHistory(store.state.auth.user._id);
            }
        });

        return {
            selectSearch,
            handleRemove,
            handleRemoveAll,
            arriveHistory,
            publicImage,
            searchText,
            searchResult,
        }
    }
}
</script>

<style>
.hello-from-navigation {
    transition: showSearchBox 3s ease;
}

@keyframes showSearchBox {
    from {
        width: 0%;
        font-size: 0%;
    }

    to {
        width: 100%;
        font-size: 100%;
    }
}
</style>