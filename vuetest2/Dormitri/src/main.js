import { createApp } from 'vue';
import VueSocketIO from 'vue-3-socket.io';
import App from './App.vue';
import router from './routes/router';
import {store} from './store/index';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
// create Vue app
createApp(App).use(router).use(new VueSocketIO({
    debug:true,
    connection:'http://localhost:4000',
    vuex:{
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    options: {
        autoConnect: false,
    }
})).mount('#app')
