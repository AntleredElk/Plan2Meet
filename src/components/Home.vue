<template>
    <h1>Welcome to Home Page</h1>
    <p>
    <a v-on:click="viewProfile" href="#">User Profile</a> 
    </p>
    <p>
    <a v-on:click="createEvent" href="#">Create Event</a> 
    </p>
    <p>
    <a v-on:click="viewEvents" href="#">View Events</a> 
    </p>
    <p>
    <a v-on:click="deleteEvent" href="#">Delete Event</a> 
    </p>
    <p>
    <a v-on:click="addNewUser" href="#">Add New User to an Event</a> 
    </p>
    <p>
    <a v-on:click="donate" href="#">Make a donation</a> 
    </p>
    <p>
    <a v-on:click="deleteUser" href="#">Delete This User</a> 
    </p>
    <p>
    <a v-on:click="logout" href="#">Logout</a> 
    </p>
</template>
<script>
export default {
    name: 'Home',
    methods: {
        logout()
        {
            localStorage.clear();
            this.$router.push({name:'Login'})
        },
        createEvent()
        {
            this.$router.push({name:'CreateEvent'})
        },
        deleteEvent()
        {
            this.$router.push({name:'DeleteEvent'})
        },
        viewEvents()
        {
            this.$router.push({name:'ViewEvents'})
        },
        addNewUser()
        {
            this.$router.push({name:'AddNewUser'})
        },
        viewProfile()
        {
            this.$router.push({name:'ViewProfile'})
        },
        deleteUser()
        {
            this.$router.push({name:'DeleteUser'})
        },
        donate()
        {
            this.$router.push({name:'Donation'})
        }
        
    },
    mounted()
    {
        let user = localStorage.getItem('user-info');
        if(!user){
            this.$router.push({name:'Login'})
        }
    }
    
}
</script>