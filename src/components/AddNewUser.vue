<template>
<img class = "logo" src="../assets/plan2meetLogo.svg" />
<h1>AddNewUser</h1>
<div class ="AddNewUser">
    <input type="text" v-model="userEmail" placeholder="User Email" />
    <button v-on:click="addUser"> addUser </button>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: "AddNewUser",
  data()
  {
      return {
          userEmail:'',
          
      }
  },
  methods: {
      async AddNewUser(){
          let result = await axios.get(
              `http://localhost:3000/user?email=${this.userEmail}`
          )

        if(result.status==200 && result.data.length>0)
            {              
                localStorage.setItem("user-info",JSON.stringify(result.data))
                this.$router.push({name:'Home'})
            }
        else{
            alert("Incorrect email or user does not exist!");
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
