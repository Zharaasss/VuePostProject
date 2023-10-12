<template>
    <AppNavbar></AppNavbar>
    <div class="app">
       <router-view></router-view> 
    </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';
export default {
    components: {
        AppNavbar
    }
}
</script>


<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    padding: 20px;
}   

</style>