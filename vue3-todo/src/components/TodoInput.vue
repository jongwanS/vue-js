<template>
    <div class="inputBox shadow">
        <input type="text" :value="newTodoItem" @input="handleInput" @keyup.enter="addTodo">
        <span class="addContainer" @click="addTodo">
            <i class="fas fa-plus addBtn"></i>
        </span>
        <MyModal v-if="showModal" @close="showModal = false"><!-- v-show 치환가능 -->
            <template v-slot:header>
                <h3>
                    경고!
                    <i class="closeModalBtn fas fa-times" @click="showModal = false"></i>
                </h3>
            </template>
            <template v-slot:body>
                <div>아무것도 입력하지 않으셨습니다.</div>
            </template>
        </MyModal>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import { useStore } from "vuex"

import MyModal from './common/MyModal.vue'

const newTodoItem = ref("")
const showModal = ref(false)
const store = useStore()

const handleInput = (event) => {
    const todoText = event.target.value
    if (!todoText) return
    //emit("input:todo", todoText)
    newTodoItem.value = todoText
}

const addTodo = () => {
    if (newTodoItem.value !== "") {
        const todoItem = newTodoItem.value
        const itemObj = { completed: false, item: todoItem }
        //store.commit("addTodo", todoItem) : mutation 호출시
        store.dispatch("moduleTodo/addTodo", itemObj)
        clearInput();
    } else {
        showModal.value = !showModal.value  //아무것도 입력되지 않았을시에, flag값 변경
    }
}

const clearInput = () => {
    newTodoItem.value = ""
}

</script>

<style scoped>
.closeModalBtn {
    color: #42b983;
}


input:focus {
    outline: none;
}

.inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}

.inputBox input {
    border-style: none;
    font-size: 0.9rem;
    width: 80%;
}

.addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}

.addBtn {
    color: white;
    vertical-align: middle;
}
</style>