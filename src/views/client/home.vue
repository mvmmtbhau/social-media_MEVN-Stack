<template>
  <main class="homeview">
    <Post />
    <SideBarHome />
    <!-- <DetailPost /> -->
  </main>
</template>

<script>
import Post from '@/components/client/post.vue';
import SideBarHome from '@/components/client/sidebarHome.vue';
// import DetailPost from '@/components/client/detailPost.vue';

export default {
  components: {
    Post,
    SideBarHome,
    // DetailPost,
  },
  data() {
    return {
      user: '',
      posts: [],
    };
  },
  created() {
    this.user = this.$store.state.auth.user;
  },
  methods: {
    handleLogOut() {
      localStorage.removeItem('access_token');
      this.$router.push({ name: 'Login' });
    },
  }
};
</script>
