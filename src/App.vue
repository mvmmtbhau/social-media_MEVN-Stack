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

    socket.connect();

    socket.on("getUsers", (data) => {
      console.log(data);
    })
    
    const getCurrentUser = async () => {
      const access_token = localStorage.getItem("access_token") || "";

      if (access_token) {
        const decodedHeader = jwt_decode(access_token);
        store.dispatch("auth/handleSetUser", decodedHeader);

        if (store.state.auth.user) {
          getConversations(store.state.auth.user._id);

          socket.emit("addUser", store.state.auth.user?._id);
        }

        if (location.pathname == '/login' || location.pathname == '/register') {
          router.push({
            name: 'Home',
          })
        };
      }

      if (!access_token || store.state.auth.user == null) {
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
