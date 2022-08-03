import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import localforage from 'localforage'
localforage.config({
  name: 'XGN', // 给当前项目的存储空间命名为fangtu
  driver: [localforage.INDEXEDDB,localforage.LOCALSTORAGE]
});

createApp(App).use(createPinia()).mount('#app')

