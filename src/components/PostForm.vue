<template>
    <form @submit.prevent>
        <h1>Create Post</h1>
        <my-input 
        v-focus
        v-model="post.title"
        class="input" 
        type="text" 
        placeholder="Post name"
        style="width: auto;"
        />

        <my-input
        v-model="post.body"
        class="input" 
        type="text" 
        placeholder="Post discription"
        style="width: auto;"
        />

        <my-button 
        style="align-self: flex-end; margin-top: 15px"
        @click="createPost"
        >
        Add
    </my-button>
    
    </form>
</template>

<script>

export default {

    data() {
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
                this.$emit('create', this.post)
                this.post = {
                    title: '',
                    body: ''
           }

        }
    },
}
</script>


<style scoped>
form {
    display: flex;
    flex-direction: column;
}

</style>
