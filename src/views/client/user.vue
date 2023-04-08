<template>
    <section>
        <user-screen />
        
    </section>
</template>

<script>
import userScreen from "@/components/client/user.vue";
import { useStore } from 'vuex';
import authService from "@/services/auth.service";

export default {
    components: {
        userScreen,
    },
    setup() {
        
    },
}
</script>