import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerGlobalComponent } from '@/utils/import';
import store from '@/store/index.js';
import vuetify from "@/plugins/vuetify";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far}  from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';

import './assets/main.css'
import './assets/global.css'

const app = createApp(App)

registerGlobalComponent(app);

library.add(fas, far, fab);

app.use(router);
app.use(store);
app.use(vuetify);

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
