import { createApp } from "vue";
import App from "./App.vue";
import { store } from "@/store/index.js";

//app 컴포넌트가 store객체를 사용할 수 있도록 주입
createApp(App).use(store).mount("#app");
