import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/main.scss'

import UiIcon from '@/components/icons/IconWrapper.vue';
import UiButton from '@/components/UI/UiButton.vue';
import LayoutDefault from "@/views/layouts/LayoutDefault.vue"
import LayoutAuth from "@/views/layouts/LayoutAuth.vue"

const app = createApp(App)

app.component('UiIcon', UiIcon);
app.component('UiButton', UiButton);

app.component("LayoutDefault", LayoutDefault)
app.component("LayoutAuth", LayoutAuth)

app.use(createPinia())
app.use(router)

app.mount('#app')
