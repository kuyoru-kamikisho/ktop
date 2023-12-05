import './styles/index.scss';
import {createApp} from "vue";
import App from "./App.vue";
import {createPinia} from "pinia";
import KRipple from "./kapi/KRipple";

const pinia = createPinia();
const app = createApp(App);
app.directive('ripple', KRipple)
app.use(pinia)
app.mount('#app')