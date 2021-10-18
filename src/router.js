import Home from './components/Home.vue';
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import CreateEvent from './components/CreateEvent.vue';
import DeleteEvent from './components/DeleteEvent.vue';
import ViewEvents from './components/ViewEvents.vue';
import AddNewUser from './components/AddNewUser.vue';
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
    {
        name:'AddNewUser',
        component: AddNewUser, 
        path:'/AddNewUser'
    },
    {
        name: 'CreateEvent',
        component: CreateEvent,
        path:'/create-event'

    },
    {
        name: 'DeleteEvent',
        component: DeleteEvent,
        path:'/delete-event'

    },
    {
        name: 'ViewEvents',
        component: ViewEvents,
        path:'/view-events'

    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;