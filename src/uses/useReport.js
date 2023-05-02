import reportService from "@/services/report.service";

import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

export default function () {
    const store = useStore();
    const router = useRouter();

    const reportComments = ref();
    const page = ref(1);
    const per_page = 5;
    const sortBy = ref(0);
    const totalPage = ref();

    const addNewReport = async (postId, commentId, userId, optionId) => {
        try {
            const data = {
                postId: postId ? postId : '',
                commentId: commentId ? commentId : '',
                userId: userId,
                optionId: optionId,
            }

            const response = await reportService.addNew(data);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    const getReportPost = async () => {
        try {
            const response = await reportService.getReportPosts();
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const updateReport = async (reportId, newStatus) => {
        try {
            const data = {
                reportId: reportId,
                status: newStatus,
            }

            return await reportService.update(data)
        } catch (err) {
            return err.response;
        }
    }

    const getReportComment = async (page, per_page, sortBy) => {
        try {
            const response = await reportService.getReportComments(page, per_page, sortBy);
            if(response.status == 200) {
                totalPage.value = response.data.totalPage;
                reportComments.value = response.data.reports;
            }
        } catch (err) {
            console.log(err.response);
        }
    }

    return {
        addNewReport,
        getReportPost,
        updateReport,
        getReportComment,
        page,
        per_page,
        sortBy,
        totalPage,
        reportComments
    }

}