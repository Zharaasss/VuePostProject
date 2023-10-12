<template>
    <div class="navbar">
        <div @click="$router.push('/')" class="iconName"><strong>LAW QAJ</strong></div>
        <div class="navbar__bnts">
            <my-button @click="$router.push('/posts')" style="color: white;">Posts</my-button>
            <my-button @click="$router.push('/about')" style="color: white; margin-left: 15px;">Our Website</my-button>
            <my-button @click="$router.push('/store')" style="color: white; margin-left: 15px;">Store</my-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: linear-gradient(90deg, #00D1D8 0%, #0288F7 100%);
    box-shadow: 2px 2px 4px grey;
    display: flex;
    align-items: center;
    padding: 0 15px;
}
.navbar__bnts {
    margin-left: auto;
}
.iconName {
    color: white; 
    margin-left: 20px;
    font-size: large ;
    font-family: sans-serif;
    font-size: 18px;
}
</style>