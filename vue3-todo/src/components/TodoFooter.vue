<template>
    <div>
        <div class="clearAllContainer">
            <span class="clearAllBtn" @click="clearTodo">Clear All</span>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['clear:todo'],
    setup(props, { emit }) {    //setup 옵션에서 props를 안써도 emit이 파라미터 이므로 setpup을 적는다.
        const clearTodo = () => {
            emit('clear:todo')
        }
        return { clearTodo }
    }
}
</script>

<style scoped>
.clearAllContainer {
    width: 8.5rem;
    height: 50px;
    line-height: 50px;
    background-color: white;
    border-radius: 5px;
    margin: 0 auto;
}

.clearAllBtn {
    color: #e20303;
    display: block;
}
</style>