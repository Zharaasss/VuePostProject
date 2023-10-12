<template>
    <div > 
        <h1>Site with Posts</h1>
        <my-input
        v-focus
        v-model="searchQuery"
        placeholder="search..."
        />
        <div class="app__btns">
            <my-button 
                @click="showDialog" 
            >
                Create new post
            </my-button> 
            <my-select
            v-model="selectedSort"
            :options="sortOptions"
            />   
        </div>
        <!-- <my-button @click="fetchPosts">Получить посты </my-button> -->
        <!-- <input type="text" v-model.trim="modificatorValue"> -->
       
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
    <div v-else class="spinner"></div>  
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- <div class="page__wrapper">
            <div 
                v-for="pageNumber in totalPages" 
                :key="pageNumber"
                class="page"
                :class="{
                    'current-Page' :page === pageNumber
                }"
                @click="changePage(pageNumber)"
                >
                {{pageNumber}}
            </div>
        </div> -->
    </div>
    </template>
    
    
    <script>
    import PostForm from '@/components/PostForm.vue'
    import PostList from '@/components/PostList.vue';
    import MyButton from '@/components/UI/MyButton.vue';
    import MySelect from '@/components/UI/MySelect.vue';
    import axios from 'axios';
    export default {
        components: {
            MyButton,
            PostForm, PostList, MySelect
        },
    
        data() {
            return {
                posts:[ ],  
                dialogVisible: false,
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
                // modificatorValue: '',
            }
        },
    
        methods: {
            createPost(post) {
                this.posts.push(post);
                //при нажатии на кнопку add чтобы диалоговое окно уходило 
                this.dialogVisible = false;
            },
            removePost(post) {
                this.posts = this.posts.filter(p => p.id !== post.id)
            },
            showDialog() {
                this.dialogVisible = true;
            },
        
            //СТАРАЯ ВЕРСИЯ ПАГИНАЦИИ
            // changePage(pageNumber) {
            //   this.page = pageNumber;
    
            // },
    
            async fetchPosts() {
                try {
                    this.isPostsLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
                    this.totalPages = Math.ceil(response.headers['x-total-count']/ this.limit)
                    this.posts = response.data;
                } catch (e) {
                    alert('Error')
                } finally {
                    this.isPostsLoading = false;
                }
            }, 
            //для палигации новой версии
            async loadMorePosts() {
                try {
                    this.page +=1;
                    // this.isPostsLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
                    this.totalPages = Math.ceil(response.headers['x-total-count']/ this.limit)
                    this.posts = [...this.posts, ...response.data]
                } catch (e) {
                    alert('Error')
                // } finally {
                    // this.isPostsLoading = false;
                }
            }, 
        },
        mounted() {
            this.fetchPosts();
            console.log(this.$refs.observer);
            //Intersection observer API взли с интернета
            // const options = {
            //     rootMargin: '0px',
            //     threshold: 1.0
            // }
            // const callBack = (entries, ) => {
            //     if(entries[0].isIntersecting && this.page < this.totalPages) {
            //         this.loadMorePosts();
                    
            //     }
            // };
            // const observer = new IntersectionObserver(callBack, options);
            // observer.observe(this.$refs.observer);
        },
    
        //для сортировки листов 
        computed: {
            sortedPosts() {
                return[...this.posts].sort((post1, post2)=> post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
            },
            sortedAndSearchedPosts() {
                return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
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
    