import axios from "axios";
export const postModule = {
    state: () => ({
        posts:[],  
        isPostsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        //для создание сортировки и выбори по содежр или названию
        sortOptions: [
            {value: 'title', name: 'by Name'}, 
            {value: 'body', name: 'by description'}
        ]
    }),

    getters: {
        sortedPosts(state) {
            return[...state.posts].sort((post1, post2)=> post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },

    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },

        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },

        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },

        setPage(state, page) {
            state.page = page;
        },

        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },

    },
//Написан правильно но ошибки выходят 
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading' , true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages'. Math.ceil(response.headers['x-total-count']/ state.limit))
                commit('setPosts', response.data)
            } catch (e) {
                alert('Error')
            } finally {
                commit('setLoading', false);
            }
        }, 

        //для палигации новой версии
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e) {
                console.log(e)
            }
        }
    },
    namespaced: true
}