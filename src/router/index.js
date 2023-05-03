import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */'@/views/client/home.vue'),
    },
    {
      path: '/explore/people',
      name: 'Explore-People',
      component: () => import(/* webpackChunkName: "home" */'@/views/client/explore.vue'),
    },
    {
      path: '/p/:id',
      name: 'DetailPost',
      component: () => import(/* webpackChunkName: "detailPost" */'@/views/client/detailPost.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        layout: 'auth',
      },
      component: () => import(/* webpackChunkName: "register" */'@/views/client/register.vue'),
      props: true,
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        layout: 'auth',
      },
      component: () => import(/* webpackChunkName: "login" */'@/views/client/login.vue'),
      props: true,
    },
    {
      path: '/user/:id',
      name: 'User',
      component: () => import(/* webpackChunkName: "user" */'@/views/client/user.vue'),
    },
    {
      path: '/inbox',
      name: 'Inbox',
      component: () => import(/* webpackChunkName: "inbox" */'@/views/client/inbox.vue'),
      children: [
        {
          path: 't/:id',
          name: 'ChatBox',
          component: () => import(/* webpackChunkName: "chatBox" */'@/views/client/chat.vue'),
        },
      ],
    },
    {
      path: '/accounts',
      name: 'Edit',
      component: () => import(/* webpackChunkName: "accounts" */'@/views/client/accounts.vue'),
      children: [
        {
          path: 'edit',
          name: 'EditAccount',
          component: () => import(/* webpackChunkName: "accountEdit" */'@/views/client/editAccount.vue'),
        },
        {
          path: 'change/password',
          name: 'ChangePassword',
          component: () => import(/* webpackChunkName: "changePassword" */'@/views/client/changePassword.vue'),
        },
        {
          path: 'who_can_see_your_content',
          name: 'WhoCanSeeYourContent',
          component: () => import(/* webpackChunkName: "changePassword" */'@/views/client/whoCanSee.vue'),
        },
      ],
    },
    {
      path: "/haadminha",
      name: 'AdminHome',
      component: () => import(/* webpackChunkName: "admin_home" */'@/views/admin/HomeView.vue'),
      meta: {
        layout: 'admin',
        requiresAuth: true,
      },
      children: [
        {
          path: 'option_reports',
          name: 'ListOptionReports',
          component: () => import(/* webpackChunkName: "option_report" */'@/views/admin/ListOptionReportView.vue'),
        },
        {
          path: 'report_post',
          name: 'ListReportPost',
          component: () => import(/* webpackChunkName: "option_report" */'@/views/admin/ListReportPostView.vue'),
        },
        {
          path: 'report_comment',
          name: 'ListReportComment',
          component: () => import(/* webpackChunkName: "option_report" */'@/views/admin/ListReportCommentView.vue'),
        }
      ]
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   // const isLoggedIn = /* your authentication check here */;
//   // const isAdmin = /* your authorization check here */;

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isLoggedIn) {
//       next({ name: 'login' });
//     } else if (!isAdmin) {
//       next({ name: 'home' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
