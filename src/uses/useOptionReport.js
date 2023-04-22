import optionService from "@/services/option_report.service";

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

    const addNewOption = async (optionText) => {
        try {
            const data = {
                text: optionText,
            }

            const response = await optionService.addNew(data);
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const fetchAllOptions = async (page, per_page, sortBy, searchText) => {
        try {
            const response = await optionService.getAll(page, per_page, sortBy, searchText);
            if(response.status == 200) {
                options.value = response.data.options;
                totalPage.value = response.data.totalPage;
            }
        } catch (err) {
            console.log(err);
        }
    }

    const updateOption = async (optionUpdate) => {
        try {
            const response = await optionService.update(optionUpdate._id, {text: optionUpdate.text} )

            return response;
        } catch (err) {
            return err.response;
        }
    }

    const deleteOption = async (optionId) => {
        try {
            const response = await optionService.delete(optionId);
            return response;
        } catch (err) {
            return err.response;
        }
    }

    return {
        addNewOption,
        updateOption,
        deleteOption,
        fetchAllOptions,
        options,
        page,
        per_page,
        sortBy,
        totalPage,
        
    }

}