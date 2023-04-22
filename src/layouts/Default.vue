<template>
    <div id="defaultLayout" class="">
        <sidebarNavigation></sidebarNavigation>
        <div class="ml-[25%] max-w-[70%] pt-8">
            <div class="max-w-[90%] pl-10">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import sidebarNavigation from '@/components/client/navigation.vue';
import { onUnmounted } from 'vue';

export default {
    components: {
        sidebarNavigation,
    },
    setup() {
        onUnmounted(() => {
            
        })
    },
}
</script>