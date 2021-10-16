<template>
<img class = "logo" src="../assets/plan2meetLogo.svg" />
<h1>Create an Account</h1>
<div class ="register">
    <input type="text" v-model="name" placeholder="Enter Name" />
    <input type="text" v-model="email" placeholder="Enter Email ID" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <button v-on:click="signUp"> Register </button>
    <p>
        <router-link to="/login"> Login </router-link>
    </p>
</div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'SignUp',
    data()
    {
        return {
            name:'',
            email:'',
            password:''
        }
    },
    methods:{
        async signUp()
        {
            //console.warn("signup", this.name, this.email, this.password)
            let result = await axios.post("http://localhost:3000/user",
            {
                name: this.name, 
                email: this.email,
                password: this.password
            });

            console.warn(result);
            if(result.status==201)
            {              
                localStorage.setItem("user-info",JSON.stringify(result.data))
                this.$router.push({name:'Login'})
                //alert("sign up successful")
            }
        }
    }
    //,
    // mounted()
    // {
    //     let user = localStorage.getItem('user-info');
    //     if(user){
    //         this.$router.push({name:'Home'})
    //     }
    // }

}
</script>
