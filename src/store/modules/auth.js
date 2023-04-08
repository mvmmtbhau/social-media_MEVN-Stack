// initial state
// shape: [{ id, quantity }]
const state = () => ({
    user: null,
    conversations: null,
    notifications: null,
    userById: null,
    searchHistory: null,
});

// getters
const getters = {};

// actions
const actions = {
    handleSetUser({ commit }, user) {
        commit("setUser", user);
    },
    handleSetSearchHistory({ commit }, searchHistory) {
        commit("setSearchHistory", searchHistory);
    },
    handleSetConversations({ commit }, conversations) {
        commit("setConversations", conversations);
    },
    handleSetNotifications({ commit }, notifications) {
        commit("setNotifications", notifications);
    },
    handleSetUserById({ commit }, userById) {
        commit("setUserById", userById);
    },
    handleUpdateUserWithFollow({ commit }, follow) {
        commit("updateUserWithFollow", follow);
    },
    handleUpdateUserWithUnFollow({ commit }, follow) {
        commit("updateUserWithUnFollow", follow);
    },
    handleUpdateUserWithNewFollowState({ commit }, follow) {
        commit("updateUserWithNewFollowState", follow);
    },
    handleUpdateUserWithNewSavedPost({ commit }, savedPost) {
        commit("updateUserWithNewSavedPost", savedPost);
    },
    handleUpdateUserWithRemoveSavedPost({ commit }, savedPost) {
        commit("updateUserWithRemoveSavedPost", savedPost);
    },
    handleUpdateUserByIdWithFollow({ commit }, follow) {
        commit("updateUserByIdWithFollow", follow);
    },
    handleUpdateUserByIdWithUnFollow({ commit }, follow) {
        commit("updateUserByIdWithUnFollow", follow);
    },
    handleUpdateUserByIdWithNewFollowState({ commit }, follow) {
        commit("updateUserByIdWithNewFollowState", follow);
    },
    handleUpdateSearchHistoryWithSearch({ commit }, search) {
        commit("updateSearchHistoryWithSearch", search);
    },
    handleUpdateSearchHistoryWithRemove({ commit }, search) {
        commit("updateSearchHistoryWithRemove", search);
    },
    handleUpdateSearchHistoryWithRemoveAll({ commit }, search) {
        commit("updateSearchHistoryWithRemoveAll", search);
    },
    handleUpdateNotificationsWithNewNoti({ commit }, newNoti) {
        commit("updateNotificationsWithNewNoti", newNoti);
    },
    handleUpdateUserWithNewPrivateState({ commit }, newState) {
        commit("updateUserWithNewPrivateState", newState);
    }
};

// mutations

const mutations = {
    setUser(state, payload) {
        state.user = payload;
    },
    setSearchHistory(state, payload) {
        state.searchHistory = payload;
    },
    setConversations(state, payload) {
        state.conversations = payload;
    },
    setNotifications(state, payload) {
        state.notifications = payload;
    },
    setUserById(state, payload) {
        state.userById = payload;
    },
    updateUserWithNewPrivateState(state, payload) {
        state.user.private = payload;
    },
    updateUserWithNewSavedPost(state, payload) {
        state.user.savedPosts = [...state.user.savedPosts, payload];
    },
    updateUserWithRemoveSavedPost(state, payload) {
        state.user.savedPosts = state.user.savedPosts.filter(id => id !== payload);
    },
    updateUserWithFollow(state, payload) {
        state.user.follows = [...state.user.follows, payload];
    },
    updateUserWithUnFollow(state, payload) {
        state.user.follows = state.user.follows.filter(follow => follow._id !== payload._id);
    },
    updateUserByIdWithFollow(state, payload) {
        state.userById.hasFollowers = [...state.userById.hasFollowers, payload];
    },
    updateUserByIdWithUnFollow(state, payload) {
        state.userById.hasFollowers = state.userById.hasFollowers.filter(follow => follow._id !== payload._id);
    },
    updateSearchHistoryWithSearch(state, payload) {
        state.searchHistory.histories = [...state.searchHistory.histories, payload];
    },
    updateSearchHistoryWithRemove(state, payload) {
        state.searchHistory.histories = state.searchHistory.histories.filter(h => h._id != payload._id);
    },
    updateSearchHistoryWithRemoveAll(state, payload) {
        state.searchHistory.histories = [];
    },
    updateNotificationsWithNewNoti(state, payload) {
        state.notifications = [...state.notifications, payload];
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};