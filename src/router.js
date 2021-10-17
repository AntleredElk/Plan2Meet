import Home from './components/Home.vue';
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;