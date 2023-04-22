<template>
  <main class="homeview">
    <Post />
    <SideBarHome />
  </main>
</template>

<script>
import Post from '@/components/client/post.vue';
import SideBarHome from '@/components/client/sidebarHome.vue';

export default {
  components: {
    Post,
    SideBarHome,
  }
};
</script>
