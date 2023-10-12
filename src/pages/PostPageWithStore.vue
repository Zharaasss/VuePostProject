<template>
    <div>
      <h1>Site with Posts</h1>
      <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Search...."
        v-focus
      />
      <div class="app__btns">
        <my-button
          @click="showDialog"
        >
          Create post
        </my-button>
        <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
        />
      </div>
      <my-dialog v-model:show="dialogVisible">
        <post-form
          @create="createPost"
        />
      </my-dialog>
      <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
      />
      <div v-else>Loading...</div>
      <div v-intersection="loadMorePosts" class="observer"></div>
      <div class="page__wrapper">
        <div
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          class="page"
          :class="{
                'current-page': page === pageNumber
              }"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </div>
      </div>
    </div>
  </template>
    
    
    <script>
    import PostForm from '@/components/PostForm.vue'
    import PostList from '@/components/PostList.vue';
    import MyButton from '@/components/UI/MyButton.vue';
    import MySelect from '@/components/UI/MySelect.vue';
    import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
    export default {
        components: {
            MyButton,
            PostForm, PostList, MySelect
        },
    
        data() {
            return {

                dialogVisible: false
                // modificatorValue: '',
            }
        },
    
        methods: {
            ...mapMutations({   
                setPage: 'post/setPage',
            }),
            ...mapActions({
                loadMorePosts: 'post/loadMorePosts',
                fetchPosts: 'post/fetchPosts'
            }),
            createPost(post) {
                this.posts.push(post);
                this.dialogVisible = false;
            },

            removePost(post) {
                this.posts = this.posts.filter(p => p.id !== post.id)
            },

            showDialog() {
                this.dialogVisible = true;
            },
     
        },
        mounted() {
            this.fetchPosts()
        },
    
        //для сортировки листов 
        computed: {
            ...mapState({
                posts: state => state.post.posts,  
                isPostsLoading: state => state.post.isPostsLoading,
                selectedSort: state => state.post.selectedSort,
                searchQuery: state => state.post.searchQuery,
                page: state => state.post.page,
                limit: state => state.post.limit,
                totalPages: state => state.post.totalPages,
                //для создание сортировки и выбори по содежр или названию
                sortOptions: state => state.post.sortOptions
            }),

            ...mapGetters({
                sortedPost: 'post/sortedPost',
                sortedAndSearchedPosts:'post/sortedAndSearchedPosts'
            }),
        },
        //СТАРАЯ ВЕРСИЯ ПАГИНАЦИИ
        watch: {
            // page() {
            //     this.fetchPosts();
            // }
        }
    }
    </script>
    
    
    
    <style>   
        .spinner {
                border: 4px solid rgba(0, 0, 0, 0.3);
                border-top: 4px solid #3498db;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
    
        .app__btns {
            display: flex;
            justify-content: space-between;
            margin: 15px 0px
        }
    
        .page__wrapper {
            display: flex;
            margin-top: 15px;
        }
        .page {
            border: 1px solid black;
            padding: 10px;
        }
        .current-Page {
            border: 2px solid teal;
        }
        .observer {
            height: 30px;
            background: green;
        }
    
    </style>    
    