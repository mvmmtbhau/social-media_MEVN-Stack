<template>
    <div class="pt-[25px] px-[25px] bg-[#F8F9FC] h-[90%]">
        <div>
            <div class="flex items-center justify-between">
                <h1 class="text-[#5a5c69] text-[28px] leading-[34px] font-normal">
                    Report Comment List
                </h1>
                <div id="actions" class="flex gap-1">
                    <div class="border rounded-md">
                        <select class="px-4 text-center bg-[#4E73DF] text-white h-full outline-none">
                            <option value="0">Báo cáo cũ nhất</option>
                            <option value="1">Báo cáo mới nhất</option>
                            <option value="2">Tên báo cáo A-Z</option>
                            <option value="3">Tên báo cáo Z-A</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="mt-[25px]">
                <div class="relative overflow-x-auto border-b shadow-lg rounded-md">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr class="bg-[#4E73DF] text-white text-center">
                                <th scope="col" class="w-10 py-3">
                                    ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Báo cáo bình luận
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Nguyên nhân báo cáo
                                </th>
                                <th scope="col" class="w-[18rem] py-3">
                                    Quản lý
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(report, index) in reportComments" :key="report"
                                class="bg-white border-b text-center">
                                <td scope="row" class="w-10 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {{ (index + 1) + (5 * (page - 1)) }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ report.comment.text }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ report.optionReport.text }}
                                </td>
                                <td id="actions" class="flex flex-col gap-2 justify-center items-center py-4">
                                    <span @click="showDetailModal(report)"
                                        class="bg-cyan-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-cyan-700">
                                        <font-awesome-icon :icon="['fas', 'eye']" /> Xem chi tiết
                                    </span>
                                    <span @click="handleUpdateReport(report._id, 1)"
                                        class="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-red-700">
                                        Xác nhận vi phạm
                                    </span>
                                    <span @click="handleUpdateReport(report._id, 2)"
                                        class="bg-gray-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-gray-700">
                                        Không có vi phạm quy tắc cộng đồng
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-[25px]">
                <v-pagination v-model="page" :length="totalPage"></v-pagination>
            </div>
        </div>
        <div v-if="isShowDetailModal" class="fixed z-20">
            <div class="fixed top-0 bottom-0 left-0 right-0 bg-black/[0.6] flex items-center justify-center"
                @click="isShowDetailModal = false">
                <div class="bg-white w-[30rem] min-h-[10rem] flex flex-col rounded-[0.6rem]" @click.stop>
                    <div class="flex items-center justify-center border-b py-2 relative">
                        <span class="font-bold">Xem chi tiết báo cáo</span>
                        <font-awesome-icon :icon="['fas', 'xmark']" class="absolute right-4 text-xl cursor-pointer"
                            @click="isShowDetailModal = false" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-col border-b-[1px] px-2 py-2">
                            <span>
                                <b>Báo cáo bởi :</b> {{ reportDetail.fromUser.fullName }}
                            </span>
                            <span>
                                <b>Nguyên nhân báo cáo :</b> {{ reportDetail.optionReport.text }}
                            </span>
                        </div>
                        <div class="flex flex-col px-2 py-2">
                            <span>
                                <b>Bình luận bị báo cáo :</b> <i>{{ reportDetail.comment.text }}</i>
                            </span>
                            <span>
                                <b>Người bình luận :</b> <i>{{ reportDetail.comment.owner.fullName }}</i>
                            </span>
                        </div>
                        <div class="flex gap-2 px-2 py-2">
                            <span @click="handleUpdateReport(report._id, 1)"
                            class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md cursor-pointer">
                                Xác nhận vi phạm
                            </span>
                            <span @click="handleUpdateReport(report._id, 2)"
                            class="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md cursor-pointer">
                                Không có vi phạm quy tắc cộng đồng
                            </span>
                        </div>
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
        const reportDetail = ref();

        const {
            page,
            per_page,
            totalPage,
            sortBy,
            reportComments,
            getReportComment,
            updateReport,
        } = useReport();

        const isShowDetailModal = ref(false);

        const showDetailModal = (report) => {
            reportDetail.value = report;
            isShowDetailModal.value = true;
        }

        const handleUpdateReport = async (reportId, newStatus) => {
            const response = await updateReport(reportId, newStatus);
            if(response.status == 200 || response.status == 404) {
                alert(response.data);
                await getReportComment(page.value, per_page, sortBy.value);
                isShowDetailModal.value = false;
            }
        }

        onBeforeMount(async () => {
            await getReportComment(page.value, per_page, sortBy.value);
        })

        watch(page, () => {
            getReportComment(page.value, per_page, sortBy.value);
        })

        watch(sortBy, () => {
            getReportComment(page.value, per_page, sortBy.value);
        })

        return {
            showDetailModal,
            handleUpdateReport,
            publicImage,
            isShowDetailModal,
            page,
            totalPage,
            sortBy,
            reportComments,
            reportDetail,
            updateReport,
        }
    }
}
</script>