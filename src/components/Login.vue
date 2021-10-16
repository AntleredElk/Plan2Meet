<template>
<img class = "logo" src="../assets/plan2meetLogo.svg" />
<h1>Login</h1>
<div class ="login">
    <input type="text" v-model="email" placeholder="Enter Email ID" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <button v-on:click="login"> Login </button>
    <p>
        <router-link to="/sign-up"> Sign Up </router-link>
    </p>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Login",
  data()
  {
      return {
          email:'',
          password:''
      }
  },
  methods: {
      async login(){
          let result = await axios.get(
              `http://localhost:3000/user?email=${this.email}&password=${this.password}`
          )

        if(result.status==200 && result.data.length>0)
            {              
                localStorage.setItem("user-info",JSON.stringify(result.data))
                this.$router.push({name:'Home'})
            }
        else{
            alert("Incorrect email or password");
        }
          console.warn(result)
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
};
</script>
