<template>
    <div class="flex">
        <div class="basis-[15%] h-screen">
            <Sidebar />
        </div>
        <div class="basis-[85%] border h-screen overflow-y-scroll">
            <Dashboard />
            <!-- <dashboard-view v-if="route.path == '/'" /> -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Sidebar from "@/components/admin/Sidebar.vue";
import Dashboard from "@/components/admin/Dashboard.vue";
// import DashboardView from "@/views/admin/DashboardView.vue";

import { useRoute } from 'vue-router';

export default {
    components: {
        Sidebar,
        Dashboard,
        // DashboardView,
    },
    setup() {
        const route = useRoute();

        return {
            route,
        }
    }
}
</script>