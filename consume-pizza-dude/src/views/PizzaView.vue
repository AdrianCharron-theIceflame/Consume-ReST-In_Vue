<script>
import PizzaForm from '@/components/PizzaForm.vue';

export default { // export default == Options API
    emits: ['success', 'error', 'warning'],
    components: {
        PizzaForm
    },
    data: () => ({
        pizzas: [],
        selectedPizza: null,
        editing: false,
        deleting: false
    }),
    methods: {
        async fetchPizzas() {
            await this.$axios.get(`/pizza`)
                .then(response => this.pizzas = response.data)
                .catch(error => {
                    if (error.status >= 500)
                        this.$emit('warning', this.$warningMessage)
                    else
                        this.$emit(`error`, error.response.data)
                })
        },
        async fetchPizza(id) {
            return await this.$axios.get(`/pizza/${id}`)
                .then(response => {
                    return response.data
                }).catch(error => {
                    if (error.status >= 500)
                        this.$emit(`warning`, this.$warningMessage)
                    else
                        this.$emit(`error`, error.response.data)
                })
        },
        async openEditModal(id) {
            let result = await this.fetchPizza(id)
            if (result) {
                this.selectedPizza = result
                this.editing = true
            }
        },
        async saveEdit(editedPizza) {
            this.editing = false
            editedPizza.id = this.selectedPizza.id
            await this.$axios.put(`/pizza/${this.selectedPizza.id}`, editedPizza)
                .then(async () => {
                    this.$emit('success', `${this.selectedPizza.name} pizza was updated!`)
                    await this.fetchPizzas()
                }).catch(error => {
                    if (error.status >= 500)
                        this.$emit(`warning`, this.$warningMessage)
                    else
                        this.$emit(`error`, error.response.data)
                })
        },
        async openDeleteModal(id) {
            let result = await this.fetchPizza(id)
            if (result) {
                this.selectedPizza = result
                this.deleting = true
            }
        },
        async deletePizza() {
            this.deleting = false
            await this.$axios.delete(`/pizza/${this.selectedPizza.id}`)
                .then(async () => {
                    this.$emit(`success`, `${this.selectedPizza.name} pizza was delete`)
                    await this.fetchPizzas()
                }).catch(error => {
                    if (error.status >= 500)
                        this.$emit(`warning`, this.$warningMessage)
                    else
                        this.$emit(`error`, error.response.data)
                })
        }
    },
    async mounted() {
        await this.fetchPizzas()
    },
    async beforeUpdate() {
        await this.fetchPizzas()
    }
}
</script>
<template>
    <v-card class="mt-3">
        <v-card-title>
            Pizzas
        </v-card-title>
        <v-card-text>
            <v-list lines="two">
                <v-list-item v-for="pizza in pizzas" :key="pizza.id" :title="pizza.name"
                    :subtitle="`Is Gluten Free? ${pizza.isGlutenFree ? `Yes` : `No`}`">
                    <template v-slot:append>
                        <v-btn-group>
                            <v-btn variant="tonal" color="warning" icon="mdi-pencil-outline" :aria-label="`Edit ${pizza.name}`"
                                @click="openEditModal(pizza.id)"></v-btn>
                            <v-btn variant="tonal" color="error" icon="mdi-trash-can-outline" :aria-label="`Delete ${pizza.name}`"
                                @click="openDeleteModal(pizza.id)"></v-btn>
                        </v-btn-group>
                    </template>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>

    <!-- Edit Modal -->
    <v-dialog v-model="editing" max-width="500">
        <v-card>
            <v-toolbar class="">
                <v-card-title>Edit {{ selectedPizza.name }}</v-card-title>
                <v-spacer></v-spacer>
                <v-btn class="" @click="editing = false" icon="mdi-close"></v-btn>
            </v-toolbar>
            <pizza-form @submit="saveEdit" v-model="selectedPizza">
                <template #cancelBtn>
                    <v-btn color="warning" @click="editing = false">Cancel</v-btn>
                    <v-spacer></v-spacer>
                </template>
            </pizza-form>
        </v-card>
    </v-dialog>

    <!-- Delete Modal -->
    <v-dialog v-model="deleting" max-width="500">
        <v-card>
            <v-toolbar class="pl-4">
                <v-card-title>Delete {{ selectedPizza.name }}</v-card-title>
                <v-spacer></v-spacer>
                <v-btn class="" @click="deleting = false" icon="mdi-close"></v-btn>
            </v-toolbar>
            <v-card-text>Are you sure you want to delete {{ selectedPizza.name }}?</v-card-text>
            <v-card-actions>
                <v-btn @click="deleting = false" color="warning">Cancel</v-btn>
                <v-spacer />
                <v-btn color="error" @click="deletePizza">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>