<template>
<img class = "logo" src="../assets/plan2meetLogo.svg" />
<h1>Create/Update Profile</h1>
<div class ="CreateProfile">
    <!-- Name -->
    <input type="text" v-model="firstName" placeholder="Enter First Name" /><br><br>
    <input type="text" v-model="lastName" placeholder="Enter Last Name" /><br><br>

    <!-- Contact -->
    <input type="text" v-model="phoneNumber" placeholder="Enter Phone Number" /><br><br>
    <input type="text" v-model="userEmail" placeholder=userEmail /><br><br>
    <!-- Location -->
    <input type="text" v-model="userLocation" placeholder="Enter Location" /><br><br>
    <!-- Status --> 
    <input type="text" v-model="userStatus" placeholder="Status" /><br><br>

    <p>
        Full name: {{firstName}} {{lastName}}, <br>
        Phonenumber: {{phoneNumber}}, <br>
        Email: {{userEmail}}, <br>
        Location: {{userLocation}}, <br>
        Status: {{userStatus}} <br>
    </p>
    <!-- Edit Profile Button-->
    <button v-on:click="save"> Save Changes </button><br>
    <button v-on:click="cancel"> Cancel Changes </button>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Save",
  data()
  {
      return {
          firstName:'',
          lastName:'',
          phoneNumber:'',
          userEmail:'',
          userLocation:'',
          userStatus:''
      }
  },
  methods: {
      async save(){
          let result = await axios.get(
              `http://localhost:3000/user?email=${this.userEmail}`
          )
            
        if(result.status==200 && result.data.length>0)
            {    
                var userName = result.data[0].name
                var userEmail = result.data[0].email 
                var userPassword =  result.data[0].password
                console.log("user get!")  
                var firstName = this.firstName;
                var lastName = this.lastName;
                var phoneNumber = this.phoneNumber;
                var userLocation = this.userLocation;
                var userStatus = this.userStatus;
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
                        firstName: firstName,
                        lastName: lastName,
                        phoneNumber: phoneNumber,
                        userEmail: userEmail,
                        userLocation: userLocation,
                        userStatus: userStatus
                    });
                    console.warn(newUser);
                    if(newUser.status==201)
                    {              
                        console.log("user created!")
                        localStorage.setItem("user-info",JSON.stringify(newUser.data))
                        this.$router.push({name:'ViewProfile'})
                    }
                }
            }
        else{
            alert("Please Enter Valid Email address!");
        }
          console.warn(result)
      },
      async cancel(){
          this.$router.push({name:'ViewProfile'})
      }
  }
};
</script>