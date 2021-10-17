<template>
<img class = "logo" src="../assets/plan2meetLogo.svg" />
<h1>Delete Event</h1>
<div class ="login">
    <input type="text" v-model="name" placeholder="Enter id of Event" />

    <button v-on:click="deleteEvent"> Delete Event </button>
        <p>
        <router-link to="/create-event"> Would you like to create an Event? </router-link>
    </p>

</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'DeleteEvent',
    data()
    {
        return {
            name:''
        }
    },
    methods:{
        async deleteEvent()
        {
            let allEvents = await axios.get("http://localhost:3000/event/");
            let deleteThisEvent 

            var arrayLength = allEvents.data.length;
                for (var i = 0; i < arrayLength; i++) {
                    if(allEvents.data[i].name == this.name){
                        deleteThisEvent = allEvents.data[i].id
                    }

                }
            
            //console.warn("signup", this.name, this.email, this.password)
            let result = await axios.delete("http://localhost:3000/event/"+deleteThisEvent);

            console.warn(result);
            if(result.status==201)
            {              
                localStorage.setItem("event-info",JSON.stringify(result.data))
                this.$router.push({name:'DeleteEvent'})
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