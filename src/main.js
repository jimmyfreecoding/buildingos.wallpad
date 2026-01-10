// main.ts
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "@/assets/main.css";
import "vant/lib/index.css";
import { createRouter, createWebHashHistory } from "vue-router";
import useMqtt from "./utils/useMqtt.ts";
import { PasswordInput, NumberKeyboard } from "vant";

import HomeView from "./views/index.vue";
import Light from "./views/light.vue";
// import President from "./views/ceo/president.vue";
import Ceo from "./views/ceo/index.vue";
import Shanghai from "./views/shanghai/index.vue";

const app = createApp(App);
app.use(ElementPlus);

const { startMqtt, publish, subscribe, unsubscribe, getMessage } = useMqtt();
app.provide("startMqtt", startMqtt); // 全局注入
app.provide("publish", publish); // 全局注入
app.provide("subscribe", subscribe); // 全局注入
app.provide("unsubscribe", unsubscribe); // 全局注入
app.provide("getMessage", getMessage); // 全局注入
// console.log(startMqtt,publish,subscribe,unsubscribe,getMessage)
startMqtt();

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/light", name: "light", component: Light },
  // { path: "/president", name: "president", component: President },
  { path: "/ceo", name: "ceo", component: Ceo },
  { path: "/shanghai", name: "shanghai", component: Shanghai },
];
const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

app.use(router);
app.use(PasswordInput);
app.use(NumberKeyboard);
app.mount("#app");
