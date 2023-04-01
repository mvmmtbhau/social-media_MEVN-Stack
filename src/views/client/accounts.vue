<template>
    <section class="w-full h-full flex border-2">
        <ListOptions class="w-[25%] border-right-2 text-sm flex flex-col" />
        <router-view class="w-[75%]"></router-view>
    </section>
</template>

<script>
import ListOptions from "@/components/client/listOptions.vue";

export default {
    components: {
        ListOptions,
    }
}

</script>