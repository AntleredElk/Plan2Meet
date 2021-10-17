<template>
<h1>Delete an Event</h1>
<div class ="deleteEvent">
    <input type="text" v-model="eventID" placeholder="Enter Event ID" />
    <button v-on:click="DeleteEvent"> Delete Event </button>
</div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'DeleteEvent',
    data()
    {
        return {
            eventID: ''
        }
    },
    methods:{
        async deleteEvent()
        {
            let result = await axios.delete("http://localhost:3000/event?eventID=${this.eventID}",
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
