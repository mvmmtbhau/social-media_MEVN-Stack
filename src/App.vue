<template>
  <component :is="layout">
    <router-view :key="this.$route.fullPath"></router-view>
  </component>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, onBeforeMount } from "vue";
import { public_layout } from "@/constants";
import jwt_decode from "jwt-decode";
import socket from "@/plugins/socket";
import { useStore } from "vuex";

import conversationService from "@/services/conversation.service";
import notificationService from "@/services/notification.service";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();

    socket?.connect();

    socket?.on("getUsers", (data) => {
      console.log(data);
    })

    
    const getCurrentUser = async () => {
      const accessToken = localStorage.getItem("token_of_hau") || null;
      if (accessToken) {
        const decoded = jwt_decode(accessToken);
        
        store.dispatch('auth/handleSetUser', decoded);
        socket?.emit('addUser', store.state.auth.user?._id);

        if (store.state.auth.user?.role == 'user' && (location.pathname == '/login' || location.pathname == '/register')) {
          router.push({
            name: 'Home',
          });
          getConversations(store.state.auth.user?._id);
        }

        if (store.state.auth.user?.role == 'admin') {
          router.push({
            name: 'AdminHome',
          })
        }
      }

      if (accessToken == null || store.state.auth?.user == null) {
        console.log(accessToken);
        router.push({
          name: 'Login',
        })
      }
    }

    const getConversations = async (userId) => {
      try {
        const response = await conversationService.getConversationsByUserId(userId);
        if (response.status == 200) {
          store.dispatch("auth/handleSetConversations", response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    onBeforeMount(() => {
      getCurrentUser();
    })

    return {
      layout: computed(() => (route.meta.layout || public_layout) + '-layout'),
    }


  }
}
</script>

<style scoped></style>
