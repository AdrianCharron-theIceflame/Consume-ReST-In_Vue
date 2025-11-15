<script setup>
import { ref } from 'vue';
import { useField } from 'vee-validate';
const model = defineModel({ required: false })
const emit = defineEmits(['submit'])
const name = ref(model?.value?.name ? model.value.name : ``)
const isGlutenFree = ref(model?.value?.isGlutenFree ? model.value.isGlutenFree : false)
const nameField = useField(name, { required: true }, {
    label: "Pizza Name",
    initialValue: model?.value?.name ? model.value.name : ``
})
function formSubmit() {
    nameField.validate()
    if (nameField.meta.validated && nameField.meta.valid)
        emit('submit', {
            name: name.value,
            isGlutenFree: isGlutenFree.value
        })
}
</script>
<template>
    <v-card-text>
        <v-text-field @input="nameField.handleChange" v-model="name" label="Pizza Name"
            :error-messages="nameField.errorMessage.value"></v-text-field>
        <VCheckbox v-model="isGlutenFree" label="Gluten Free?" color="primary"></VCheckbox>
    </v-card-text>
    <v-card-actions>
        <slot name="cancelBtn"></slot>
        <VBtn color="success" @click="formSubmit">Submit</VBtn>
    </v-card-actions>
</template>