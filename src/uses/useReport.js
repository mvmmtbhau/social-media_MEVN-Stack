import reportService from "@/services/report.service";

import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

export default function () {
    const store = useStore();
    const router = useRouter();

    const options = ref();
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

    return {
        addNewReport,
    }

}