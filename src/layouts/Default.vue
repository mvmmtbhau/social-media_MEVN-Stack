<template>
    <div id="defaultLayout" class="">
        <sidebarNavigation></sidebarNavigation>
        <div class="ml-[25%] max-w-[70%] pt-8">
            <div class="max-w-[90%] pl-10">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import sidebarNavigation from '@/components/client/navigation.vue';
import { onBeforeMount, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    components: {
        sidebarNavigation,
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        onBeforeMount(() => {
            if(store.state.auth.user && store.state.auth.user?.role == 'admin') {
                alert('Xin dùng tài khoản khác');
                store.dispatch('auth/handleSetUser', null);
                router.push({
                    name: 'Login',
                })
            }
        })
    },
}
</script>