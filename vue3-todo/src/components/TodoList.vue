<template>
    <div>
        <ul>
            <li v-for="(item, index) in todoItems" :key="index">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
const todoItems = ref([])

onBeforeMount(() => {
    console.log('mounted in the composition api!')
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            const storageKey = localStorage.key(i)
            todoItems.value.push(localStorage.getItem(storageKey));
        }
    }
    console.log(todoItems.value)
})
</script>

<style scoped></style>