<template>
    <div>
        <slot />
    </div>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();

        onBeforeMount(() => {
            if (store.state.auth.user?.role != 'admin') {
                alert('Bạn không có quyền truy cập')
                router.push({
                    name: 'Login'
                })
                store.dispatch('auth/handleSetUser', null);
            }
        })
    }
}
</script>