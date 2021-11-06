<template>
<img class = "logo" src="../assets/plan2meetLogo.svg" />
<h1>View Profile</h1>
<div class ="ViewProfile">

    <!-- Profile to view -->
    <cemter>View Profile</cemter><br>
    <input type="text" v-model="userEmail" placeholder="Enter User Email of Profile" /><br><br>
    <!-- Name -->
    <p v-for="user in users" :key="user.userEmail">{{user.firstName + user.lastName}}</p>
    <!-- Status --> 
    <p v-for="user in users" :key="user.userEmail">{{user.userStatus}}</p>
    <!-- Contact -->
    <p v-for="user in users" :key="user.userEmail">{{user.userEmail}}</p>
    <p v-for="user in users" :key="user.userEmail">{{user.phoneNumber}}</p>
    <!-- Location -->
   <p v-for="user in users" :key="user.userEmail">{{user.userLocation}}</p>
    <!-- Edit Profile Button-->
    <button v-on:click="viewprofile"> View Profile </button><br>
    <button v-on:click="editprofile"> Edit Profile </button>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: "EditProfile",
  data()
  {
      return {
          users: []
      }
  },
  methods: {
      async editprofile(){
        this.$router.push({name:'CreateProfile'})
      },
      async viewprofile(){
        let allUsers = await axios.get("http://localhost:3000/user");
        var arrayLength = allUsers.data.length;
        for (var i = 0; i < arrayLength; i++) {
        if(allUsers.data[i].email == this.userEmail){
            this.users = allUsers.data.slice(i, i + 1)
            this.errorView = "" 
            return
            }
        else{
                this.errorView = "Invalid Search" 
                this.events = allUsers.data.slice(0, 0)
            }
        }
      }
  }
};
</script>