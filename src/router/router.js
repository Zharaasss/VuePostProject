import MainPages from "@/pages/MainPages";
import PostPage from "@/pages/PostPage";
import AboutPage from "@/pages/AboutPage"
import PostIdPage from "@/pages/PostIdPage"
import PostPageWithStore from "@/pages/PostPageWithStore"
import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: '/',
        component: MainPages
    }, 
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: AboutPage
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/store',
        component: PostPageWithStore
    },
    
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})  

export default router;