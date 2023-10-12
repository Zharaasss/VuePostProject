<template>
    <button class="btn">
        <slot></slot>
        
    </button>
</template>


<script>
export default {
    name: 'my-button'
}
</script>


<style scoped>
.btn {
    background-color:  transparent;
    transparent: background-color 0.3s;
    cursor: pointer;
    padding: 10px 15px;
    color: #1b92f2;
    border: 1px solid #0288F7;
}
</style>