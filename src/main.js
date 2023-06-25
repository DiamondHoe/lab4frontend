import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import cors from 'cors';

loadFonts()

createApp(App).use(router)
  .use(vuetify)
    .use(cors)
    .mount('#app')

const ip = 'http://localhost:8081/api';
export default ip;