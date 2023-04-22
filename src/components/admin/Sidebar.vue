<template>
    <div class="bg-[#4E73DF] h-screen px-6">
        <div class="px-[15px] py-[30px] flex items-center justify-center border-b">
            <h1 class="text-white text-xl leading-[24px] font-extrabold cursor-pointer">Admin</h1>
        </div>
        <router-link to="/" class="flex items-center gap-4 py-5 border-b text-white cursor-pointer">
            <font-awesome-icon :icon="['fas', 'house']" />
            <p class="leading-[20px] font-bold">Dashboard</p>
        </router-link>
        <div class="pt-[15px] border-b">
            <router-link to="/" class="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
                <div class="flex items-center gap-[10px] text-white">
                    <font-awesome-icon :icon="['fas', 'list']" />
                    <p class="text-[14px] leading-[20px] font-normal">
                        Danh sách phòng
                    </p>
                </div>
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-white" />
            </router-link>
            <router-link to="/" class="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
                <div class="flex items-center gap-[10px] text-white">
                    <font-awesome-icon :icon="['fas', 'list']" />
                    <p class="text-[14px] leading-[20px] font-normal">
                        Danh sách công việc
                    </p>
                </div>
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-white" />
            </router-link>
            <router-link to="/" class="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
                <div class="flex items-center gap-[10px] text-white">
                    <font-awesome-icon :icon="['fas', 'list']" />
                    <p class="text-[14px] leading-[20px] font-normal">
                        Danh sách nhân sự
                    </p>
                </div>
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-white" />
            </router-link>

            <div class="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
                <div class="flex items-center gap-[10px] text-white">
                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                    <p class="text-[14px] leading-[20px] font-normal">Đăng xuất</p>
                </div>
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-white" />
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();

        const logout = () => {
            if (confirm('Bạn muốn đăng xuất?')) {
                localStorage.setItem("access_token", "");
                store.dispatch('auth/handleSetUser', null);
                router.push('/login');
            }
        };
        return {
            logout,
        };
    },
}
</script>