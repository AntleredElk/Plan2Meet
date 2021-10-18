import Home from './components/Home.vue';
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
<<<<<<< HEAD
import AddNewUser from './components/AddNewUser.vue';
import CreateEvent from './components/CreateEvent.vue';
=======
import CreateEvent from './components/CreateEvent.vue';
import DeleteEvent from './components/DeleteEvent.vue';
>>>>>>> Implement create new event and delete event features
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        name: 'Home',
        component: Home,
        path:'/'
    },
    {
        name: 'Login',
        component: Login,
        path:'/login'
    },
    {
        name: 'SignUp',
        component: SignUp,
        path:'/sign-up'

    },
<<<<<<< HEAD
    {
        name:'AddNewUser',
        component: AddNewUser, 
        path:'/AddNewUser'
    },
=======

>>>>>>> Implement create new event and delete event features
    {
        name: 'CreateEvent',
        component: CreateEvent,
        path:'/create-event'

    },
<<<<<<< HEAD
=======

    {
        name: 'DeleteEvent',
        component: DeleteEvent,
        path:'/delete-event'

    }
>>>>>>> Implement create new event and delete event features
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;