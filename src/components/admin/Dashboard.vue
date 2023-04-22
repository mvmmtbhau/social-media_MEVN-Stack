<template>
    <div class="flex items-center justify-between h-[70px] shadow-lg px-[25px]">
        <div class="flex items-center rounded-md">
            <input class="bg-[#F8F9FC] pl-[13px] h-[40px] w-[350px] rounded-md placeholder:text-[14px] leading-[20px] font-normal" placeholder="Search for..." type="text"/>
            <div class="bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer text-white rounded-tr-md rounded-br-md">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </div>
        </div>
        <div class="flex items-center gap-[15px] relative">
            <div class="flex items-center gap-[25px] border-r pr-[25px]">
                <font-awesome-icon :icon="['far', 'bell']" />
                <font-awesome-icon :icon="['fas', 'envelope']" />
            </div>
            <div class="flex items-center gap-[15px] relative">
                <p>Admin</p>
                <div class="cursor-pointer">
                    <img src="../../assets/images/test.jpg" class="w-12 h-12 rounded-full object-cover">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    setup() {

        return {
        }
    }
}
</script>