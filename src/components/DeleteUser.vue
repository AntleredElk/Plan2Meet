<template>
<img class = "logo" src="../assets/plan2meetLogo.svg" />
<h1>Delete User</h1>
<h2>Are you sure you want to delete this account?</h2>
<h3>Repeat your email address</h3>
<div class ="login">
    <input type="text" v-model="email" placeholder="Enter email" />

    <button v-on:click="deleteUser"> Delete User </button>

</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'DeleteUser',
    data()
    {
        return {
            email:''
        }
    },
    methods:{
        async deleteUser()
        {
            let allUsers = await axios.get("http://localhost:3000/user/");
            let deleteThisUser

            var arrayLength = allUsers.data.length;
                for (var i = 0; i < arrayLength; i++) {
                    if(allUsers.data[i].email == this.email){
                        deleteThisUser = allUsers.data[i].id
                    }

                }
            
            let result = await axios.delete("http://localhost:3000/user/"+deleteThisUser);

            console.warn(result);
            if(result.status==201)
            {              
                localStorage.setItem("event-info",JSON.stringify(result.data))
                this.$router.push({name:'DeleteUser'})
               
            }

            this.$router.push({name:'Login'});
        }
    }
}
</script>
