// initial state
// shape: [{ id, quantity }]
const state = () => ({
    showCreatePostModal: false,
    showDetailPostModal: false,
    showSearchBox: false,
    showNotifications: false,
    showActionModal: false,
});

// getters
const getters = {};

// actions
const actions = {
    handleShowCreatePostModal({ commit }, showCreatePostModal) {
        commit("setShowCreatePostModal", showCreatePostModal);
    },
    handleShowDetailPostModal({ commit }, showDetailPostModal) {
        commit("setShowDetailPostModal", showDetailPostModal);
    },
    handleShowSearchBox({ commit }, showSearchBox) {
        commit("setShowSearchBox", showSearchBox);
    },
    handleShowNotifications({ commit }, showNotifications) {
        commit("setShowNotifications", showNotifications);
    },
    handleShowActionModal({ commit }, showActionModal) {
        commit("setShowActionModal", showActionModal);
    },
};

// mutations
const mutations = {
    setShowCreatePostModal(state, payload) {
        state.showCreatePostModal = payload;
    },
    setShowDetailPostModal(state, payload) {
        state.showDetailPostModal = payload;
    },
    setShowSearchBox(state, payload) {
        state.showSearchBox = payload;
    },
    setShowNotifications(state, payload) {
        state.showNotifications = payload;
    },
    setShowActionModal(state, payload) {
        state.showActionModal = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};