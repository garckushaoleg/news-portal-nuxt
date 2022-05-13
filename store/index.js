export const state = () => ({
    posts: [],
    isAuthenticated: false
})
  
export const mutations = {

    addPost(state, newPosts) {
        state.posts = [ ...newPosts, ...state.posts ]
    },

    addImages(state, newPosts) {
        state.posts = [ ...state.posts, ...newPosts ]
    },

    deletePost(state, id) {
        const index = state.posts.findIndex(post => post.id === id);
        state.posts.splice(index, 1);
    },

    changeAccess(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated
    }
}