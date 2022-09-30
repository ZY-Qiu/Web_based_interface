<template>
<div> 
    <div v-if="text.name" dismissible type="error" @input="onClose" :value="true">
        {{ text.name[0] }}
    </div>
    <div v-if="text.email" dismissible type="error" @input="onClose" :value="true">
        {{ text.email[0] }}
    </div>
    <div v-if="text.password" dismissible type="error" @input="onClose" :value="true">
        {{ text.password[0] }}
    </div>
    <div v-if="text.model" dismissible type="error" @input="onClose" :value="true">
        {{ text.model[0] }}
    </div>
     <div v-if="text.price" dismissible type="error" @input="onClose" :value="true">
        {{ text.price[0] }}
    </div>
    <div v-if="text.consuming" dismissible type="error" @input="onClose" :value="true">
        {{ text.consuming[0] }}
    </div>
    <div v-if="text.image" dismissible type="error" @input="onClose" :value="true">
        {{ text.image[0] }}
    </div>
    <div v-if="text.year" dismissible type="error" @input="onClose" :value="true">
        {{ text.year[0] }}
    </div>
    <div v-if="text.registration" dismissible type="error" @input="onClose" :value="true">
        {{ text.registration[0] }}
    </div>
    <div v-if="text.address" dismissible type="error" @input="onClose" :value="true">
        {{ text.address[0] }}
    </div>
    <div v-if="text.phone" dismissible type="error" @input="onClose" :value="true">
        {{ text.phone[0] }}
    </div>
    <div v-if="text.message" dismissible type="error" @input="onClose" :value="true">
        {{ text.message[0] }}
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

