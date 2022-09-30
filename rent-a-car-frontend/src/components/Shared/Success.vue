<template>
<div> 
    <div v-if="text.message" dismissible type="success" @input="onClose" :value="true">
        {{ text.message }}
    </div>
 </div>   
</template>

<script>
export default {
    props: ['text'],
    methods: {
        onClose () {
            this.$emit('dismissed');
        }
    }
}
</script>

