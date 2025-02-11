import { createStore, createLogger } from "vuex";
import http from "@/common/http-common";
import axios from "axios";

export const store = createStore({
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  //상태변수를 선언하는 object
  state: {
    todoItems: [],
  },

  //상태변수를 변경하는 비동기함수를 포함하는 객체
  actions: {
    //조회
    loadTodoItems({ commit }) {
      http
        .get("/todos")
        .then((r) => r.data) //axios는 항상 data 라는 속성을 준다.(규칙임)
        .then((items) => {
          //결국 items는 r.data임
          commit("setTodoItems", items); //밑에있는 mutations 메서드와 매핑
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            //error?.response? 리스폰스가 없으면 해당되는 속성이 없으면 undeinfed 가 되어 오류방지 가능하다.
            console.log(error?.response?.status + " : " + error.message);
          } else {
            console.error(error);
          }
        });
    },
    //추가
    addTodo({ commit }, payload) {
      http
        .post(`/todos`, payload)
        .then((r) => r.data)
        .then((items) => {
          commit("setTodoItems", items);
        });
    },
    //삭제
    removeTodo({ commit }, payload) {
      http
        .delete(`/todos/${payload.id}`)
        .then((r) => r.data)
        .then((items) => {
          commit("setTodoItems", items);
        });
    },
    //수정
    toggleTodo({ commit }, payload) {
      http
        .patch(`/todos/${payload.id}`, payload)
        .then((r) => r.data)
        .then((items) => {
          commit("setTodoItems", items);
        });
    },
    //삭제
    clearTodo({ commit }) {
      http
        .delete("/todos")
        .then((r) => r.data)
        .then((items) => {
          commit("setTodoItems", items);
        });
    },
  },

  //상태변수를 변경하는 동기함수를 포함하는 객체
  mutations: {
    //TODO list 불러오는 아이템 저장
    setTodoItems(state, items) {
      state.todoItems = items;
    },

    /*
    addTodo(state, todoItem) {
      const obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      state.todoItems.push(obj);
    },
    */
  },
});
