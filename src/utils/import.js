import { defineAsyncComponent } from "vue";

export function registerGlobalComponent(app) {
    app.component(
        'auth-layout',
        defineAsyncComponent(() => import('@/layouts/Auth.vue')
        ));

    app.component(
        'default-layout',
        defineAsyncComponent(() => import('@/layouts/Default.vue')
        ));

    app.component(
        'admin-layout',
        defineAsyncComponent(() => import('@/layouts/Admin.vue')
        ));
}