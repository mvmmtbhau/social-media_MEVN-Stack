<template>
    <section>
        <user-screen />
        <!-- <detail-post /> -->
    </section>
</template>

<script>
import userScreen from "@/components/client/user.vue";
// import DetailPost from "@/components/client/detailPost.vue";
import { useStore } from 'vuex';
import authService from "@/services/auth.service";

export default {
    components: {
        userScreen,
        // DetailPost,
    },
    setup() {
        
    },
}
</script>