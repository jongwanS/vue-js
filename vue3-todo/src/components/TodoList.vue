<template>
    <div>
        <TransitionGroup name="list" tag="ul">
            <li v-for="(todo, index) in todoItems" :key="index" class="shadow">

                <i class="fas fa-check checkBtn" :class="{ checkBtnCompleted: todo.completed }"
                    @click="toggleComplete(todo)">
                    <span :class="{ textCompleted: todo.completed }">{{ todo.item }}</span>
                </i>
                <span class="removeBtn" @click="removeTodo(todo)">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </li>
        </TransitionGroup>
    </div>
</template>

<script setup>
import { useStore } from "vuex"
import { computed, onMounted } from "vue"

//vuex 스토어 저장소 로드
const store = useStore()
//vux 저장된 todoItems 조회
//computed는 변경되었을때만 실행된다. methods는 실행할때마다
const todoItems = computed(() => store.state.todoItems)

onMounted(() => {
    console.log('onMounted...')
    //dispatch를 통해 데이터를 불러온다.
    //loadTodoItems함수 는 vux에서 axios 로 불러온다.
    store.dispatch("loadTodoItems")
})

const removeTodo = (todoItem) => {
    //dispatch를 통해 데이터를 불러온다.
    //removeTodo 함수 는 해당 아이템을 삭제한다.
    store.dispatch("removeTodo", todoItem)
}


const toggleComplete = (todoItem) => {
    //emit("toggle:todo", todoItem, index)
    //store.commit("toggleTodo", { todoItem, index })
    todoItem.completed = !todoItem.completed 
    store.dispatch("toggleTodo", todoItem)
};

</script>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
}

li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
}

.removeBtn {
    margin-left: auto;
    color: #de4343;
}

.checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
}

.checkBtnCompleted {
    color: #b3adad;
}

.textCompleted {
    text-decoration: line-through;
    color: #b3adad;
}
</style>