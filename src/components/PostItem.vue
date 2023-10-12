<template>
<div class="post">
    <div>
        <div> <strong>Number: </strong>{{post.id}}</div>
    <div><strong>Name: </strong>{{post.title}}</div>
    <div><strong>Description: </strong>{{post.body}}</div>
</div>
    <div class="post__bnts">
        <my-button 
            @click="$router.push(`/posts/${post.id}`)"
            style="color: green;">
                    Open
        </my-button>
        <my-button 
            @click="$emit('remove', post)"
            style="color: red;">
                    Delete
        </my-button>
    </div>
</div>
</template>


<script>

export default {

    props: {    
        post: {
            type: Object,
            required: true,
        }
    }
}
</script>


<style scoped>
    .post {
        padding: 15px;
        border: 2px solid  #1b92f2;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .post__bnts {
        display: flex;
    }
</style>