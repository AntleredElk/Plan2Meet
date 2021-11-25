import Home from './components/Home.vue';
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import CreateEvent from './components/CreateEvent.vue';
import ViewCalendar from './components/ViewCalendar.vue';
import DeleteEvent from './components/DeleteEvent.vue';
import ViewEvents from './components/ViewEvents.vue';
import AddNewUser from './components/AddNewUser.vue';
import CreateProfile from './components/CreateProfile.vue';
import ViewProfile from './components/ViewProfile.vue';
import DeleteUser from './components/DeleteUser.vue';
import SendEmail from './components/SendEmail.vue';
import Donation from './components/Donation.vue';
import CalenderUser from './components/CalenderUser'
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        name: 'SendEmail',
        component: SendEmail,
        path:'/sendEmail'
    },
    {
        name: 'Home',
        component: Home,
        path:'/home'
    },
    {
        name: 'Login',
        component: Login,
        path:'/'
    },
    {
        name: 'SignUp',
        component: SignUp,
        path:'/sign-up'

    },
    {
        name:'AddNewUser',
        component: AddNewUser, 
        path:'/add-new-user'
    },
    {
        name: 'CreateEvent',
        component: CreateEvent,
        path:'/create-event'

    },
    {
        name:'DeleteEvent',
        component: DeleteEvent,
        path:'/delete-event'

    },
    {
        name: 'ViewEvents',
        component: ViewEvents,
        path:'/view-events'

    },
    {
        name: 'ViewCalendar',
        component: ViewCalendar,
        path:'/ViewCalendar'
    },
    {
        name: 'CreateProfile',
        component: CreateProfile,
        path:'/create-profile'
    },
    {
        name: 'ViewProfile',
        component: ViewProfile,
        path:'/view-profile'
    },
    {
        name: 'DeleteUser',
        component: DeleteUser,
        path: '/DeleteUser'
    },
    {
        name: 'Donation',
        component: Donation,
        path: '/Donate'
    },
    {
        name: 'CalenderUser',
        component: CalenderUser,
        path: '/CalenderUser'
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;