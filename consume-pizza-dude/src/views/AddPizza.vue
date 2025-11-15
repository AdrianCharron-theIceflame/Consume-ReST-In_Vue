<script>
import PizzaForm from '@/components/PizzaForm.vue';
export default {
    components: {
        PizzaForm
    },
    data: () => ({
    }),
    methods: {
        async postPizza(pizza) {
            await this.$axios.post('/pizza', pizza)
                .then(response => {
                    this.$emit(`success`, `${response.data.name} was added!`)
                })
                .catch(error => {
                    if (error.status >= 500)
                        this.$emit('warning', this.$warning)
                    if (error.status < 500) {
                        this.$emit(`error`, error.response.data)
                    }
                })
        }
    }
}
</script>

<template>
    <VCard class="mt-3">
        <VCardTitle>
            <h2>Add A Pizza</h2>
        </VCardTitle>
        <PizzaForm @submit="postPizza" />
    </VCard>
</template>