<template>
    <div>
        <slot />
    </div>
</template>

<script>
import { onBeforeMount } from 'vue'

export default {
    setup() {
        onBeforeMount(() => {
            
        });
    }
}
</script>