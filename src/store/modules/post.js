// initial state
// shape: [{ id, quantity }]
const state = () => ({
    post: null,
    comments: null,
    commentLikes: null,
});

// getters
const getters = {
};

// actions
const actions = {
    handleSetDetailPost({ commit }, post) {
        commit("setDetailPost", post);
    },
    handleSetComments({ commit }, comments) {
        commit("setComments", comments);
    },
    handleUpdatePostWithLike({commit}, like) {
        commit("updatePostWithLike", like)
    },
    handleUpdatePostWithDislike({commit}, like) {
        commit("updatePostWithDislike", like)
    },
    handleUpdateCommentsWithLike({commit}, like) {
        commit("updateCommentsWithLike", like)
    },
    handleUpdateCommentsWithDislike({commit}, like) {
        commit("updateCommentsWithDislike", like)
    },
};

// mutations
const mutations = {
    setDetailPost(state, payload) {
        state.post = payload;
    },
    setComments(state, payload) {
        state.comments = payload;
    },
    updateCommentsWithLike(state, payload) {
        state.comments[payload.index].likes = [
            ...state.comments[payload.index].likes,
            payload.newLikeComment,
           ]
    },
    updateCommentsWithDislike(state, payload) {
        state.comments[payload.index].likes = 
        state.comments[payload.index].likes.filter(like => like._id !== payload.newLikeComment._id);
    },
    updatePostWithLike(state, payload) {
        state.post.likes = [...state.post.likes, payload];
    },
    updatePostWithDislike(state, payload) {
        state.post.likes = state.post.likes.filter(like => like._id !== payload._id);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};