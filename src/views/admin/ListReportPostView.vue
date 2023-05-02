<template>
    <div class="pt-[25px] px-[25px] bg-[#F8F9FC] h-[90%]">
        <div>
            <div class="flex items-center justify-between">
                <h1 class="text-[#5a5c69] text-[28px] leading-[34px] font-normal">
                    Report Post List
                </h1>
            </div>
            <div class="mt-[25px] grid grid-cols-2 gap-2">
                <div class="border-[2px] px-4 py-2" v-for="report in reports" :key="report">
                    <div class="flex flex-col">
                        <span>
                            <b>Báo cáo bởi :</b> {{ report.fromUser.fullName }}
                        </span>
                        <span>
                            <b>Nguyên nhân báo cáo :</b> {{ report.optionReport.text }}
                        </span>
                    </div>
                    <div class="post mb-5 border-2 px-2 py-2">
                        <div class="post-top relative flex items-center gap-2 text-sm py-4 px-2">
                            <div class="flex items-center gap-2">
                                <img src="../../assets/images/no-avatar.jfif" class="w-8 h-8 rounded-full cursor-pointer">
                                <span class="font-bold cursor-pointer">
                                    {{ report.post.owner.fullName }}
                                </span>
                            </div>
                        </div>
                        <div class="post-content">
                            <v-carousel :continuous="false" dark hide-delimiter-background height="350" show-arrows="hover"
                                color="black">
                                <v-carousel-item v-for="image in report.post.images" :key="image">
                                    <v-sheet class="h-full w-full bg-cyan-500" tile>
                                        <div class="h-full w-full">
                                            <img :src="publicImage + image.filename" class="h-full w-full object-contain">
                                        </div>
                                    </v-sheet>
                                </v-carousel-item>
                            </v-carousel>
                        </div>
                        <div class="post-footer mb-5 text-md">
                            <div class="mt-2">
                                <span>
                                    {{ report.post.content == 'undefined' ? '' : report.post.content }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <span @click="handleUpdate(report._id, 1)"
                        class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md cursor-pointer">
                            Xác nhận vi phạm
                        </span>
                        <span @click="handleUpdate(report._id,2)"
                        class="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md cursor-pointer">
                            Không có vi phạm quy tắc cộng đồng
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onBeforeMount, ref, watch } from "vue";
import { publicImage } from "@/constants";

import useReport from "@/uses/useReport";

export default {
    setup() {

        const {
            getReportPost,
            updateReport,
        } = useReport();

        const reports = ref();

        onBeforeMount(async () => {
            const response = await getReportPost();
            if(response.status == 200) {
                reports.value = response.data;
            }
        })

        const handleUpdate = async (reportId, newStatus) => {
            const response = await updateReport(reportId, newStatus);
            if(response.status == 200 || response.status == 404) {
                alert(response.data);
                const newReports = await getReportPost();
                reports.value = newReports.data;
            }
        }

        return {
            reports,
            publicImage,
            handleUpdate,
        }
    }
}
</script>