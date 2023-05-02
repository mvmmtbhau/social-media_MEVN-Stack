import notificationService from "@/services/notification.service";

import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

export default function () {
    const store = useStore();
    const router = useRouter();

    const getNotis = async (userId) => {
        try {
            const response = await notificationService.getByUserId(userId);
            if(response.status == 200) {
                store.dispatch('auth/handleSetNotis', response.data);
            }
        } catch (err) {
            return err.response;
        }
    }

    const updateNotis = async (userId) => {
        try {
            const response = await notificationService.update(userId);
            if(response.status == 200) {
                await getNotis(userId);
            }
        } catch (err) {
            return err.response;
        }
    }

    return {
        getNotis,
        updateNotis,
    }

}