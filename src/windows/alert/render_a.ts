import '../../styles/index.scss'

import {createApp} from "vue";
import {createPinia} from "pinia";
import Index from "./Index.vue";

const pinia = createPinia();
const app = createApp(Index);
app.use(pinia)
app.mount('#alert-window')