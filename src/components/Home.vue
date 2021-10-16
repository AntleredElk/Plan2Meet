<template>
    <a v-on:click="logout" href="#">Logout</a>
    <h1>Welcome to Home Page</h1>
    <p>this page needs to be updated with the plan2meet app contents </p>
</template>
<script>
export default {
    name: 'Home',
    methods: {
        logout()
        {
            localStorage.clear();
            this.$router.push({name:'Login'})
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
