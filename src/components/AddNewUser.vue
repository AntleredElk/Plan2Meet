<template>
<img class = "logo" src="../assets/plan2meetLogo.svg" />
<h1>AddNewUser</h1>
<div class ="AddNewUser">
    <input type="text" v-model="userEmail" placeholder="User Email" />
    <input type="text" v-model="eventName" placeholder="Event name" />
    <button v-on:click="AddNewUser"> addUser </button>
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
          eventName:'',
          
      }
  },
  methods: {
      async AddNewUser(){
          let result = await axios.get(
              `http://localhost:3000/user?email=${this.userEmail}`
          )
            
            //console.log(result.data[0].name)
            
        if(result.status==200 && result.data.length>0)
            {    
                var userName = result.data[0].name
                var userEmail = result.data[0].email 
                var userPassword =  result.data[0].password
                console.log("user get!")          
                let event = await axios.get(
                    `http://localhost:3000/event?name=${this.eventName}`
                )
                if(event.status==200 && result.data.length>0){
                    console.log("event get!")
                    var eventName = event.data[0].name
                    //console.log(event.data)
                    let deletedUser = await axios.delete("http://localhost:3000/user/"+result.data[0].id)
                    console.warn(deletedUser);
                    if (deletedUser.status == 200)
                    {
                        console.log("user deleted!")
                        let newUser = await axios.post("http://localhost:3000/user",
                        {
                            name: userName, 
                            email: userEmail,
                            password: userPassword,
                            event: eventName
                        });
                        console.warn(newUser);
                        if(newUser.status==201)
                        {              
                            console.log("user created!")
                            localStorage.setItem("user-info",JSON.stringify(newUser.data))
                            this.$router.push({name:'CreateEvent'})
                        }
                    }
                }
                
                
                // if(event.status==200 && event.data.length>0)
                // {

                // }
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
}
</script>
