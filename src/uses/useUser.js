import authService from "@/services/auth.service";
import followService from "@/services/follow.service";

import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

export default function () {
    const store = useStore();
    const router = useRouter();

    const users = ref();

    const fetchCurrentUser = async (userId) => {
        try {
            const response = await authService.getUserById(userId);
            if (response.status == 200) {
                store.dispatch('auth/handleSetUser', response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getUserById = async (userId) => {
        try {
            const response = await authService.getUserById(userId);
            if (response.status == 200) {
                store.dispatch('auth/handleSetUserById', response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getUsers = async (userId) => {
        try {
            const response = await authService.getUsers(userId);
            if (response.status === 200) {
                fetchCurrentUser(store.state.auth.user?._id);

                users.value = response.data;
            }
        } catch (err) {
            if (err.response.status === 401) {
                router.push({ name: "Login" });
            }
        }
    }

    const followUser = async (fromUser, followUser) => {
        try {
            const data = {
                fromUser,
                followUser,
            }

            const response = await followService.following(data);
            if (response.status == 201) {
                fetchCurrentUser(fromUser);
                getUserById(followUser._id);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const unFollowUser = async (fromUser, followUser) => {
        try {
            const response = await followService.unFollow(fromUser, followUser);
            if (response.status == 200 || response.status == 204) {
                fetchCurrentUser(fromUser);
                getUserById(followUser);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const updateFollow = async (userId, followId) => {
        try {
            const response = await followService.updateState(followId);
            if (response.status == 204) {
                console.log(response.data);
            }

            if (response.status == 200) {
                fetchCurrentUser(store.state.auth.user?._id);
                getUserById(store.state.auth.userById?._id);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const arriveToUser = (userId) => {
        router.push({
            name: 'User',
            params: {
                id: userId,
            }
        })
    }

    return {
        arriveToUser,
        fetchCurrentUser,
        getUserById,
        getUsers,
        followUser,
        unFollowUser,
        updateFollow,
        users,
    }
}