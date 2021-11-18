<template>
<img class = "logo" src="../assets/plan2meetLogo.svg" />
<h1>Create Event</h1>
<div class ="login">
    <input type="text" v-model="name" placeholder="Enter Name of Event" />
    <input type="date" v-model="date" placeholder="Enter Event Date" />
    <input type="time" v-model="time" placeholder="Enter Event Time" />
    <input type="text" v-model="location" placeholder="Enter Event Location" ref="autocomplete" />

    <button v-on:click="createEvent"> Create Event </button>
    <p>
        <router-link to="/delete-event"> Would you like to delete an Event? </router-link>
    </p>
    <p>
        <router-link to="/add-new-user"> Would you like to add a new user to an Event? </router-link>
    </p>

</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CreateEvent',
    data()
    {
        return {
            name:'',
            date:'',
            time:'',
            location:''
        }
    },
    mounted(){
        const autocomplete = new window.google.maps.places.Autocomplete(
        this.$refs["autocomplete"],
        {
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(45.508888, -73.561668)
        ),
      }
    );
        autocomplete.addListener("place_changed", () => {
        //var place = autocomplete.getPlace();
        console.log(autocomplete.getPlace());
        })
    },
    methods:{
        async createEvent()
        {
            //console.warn("signup", this.name, this.email, this.password)
            let result = await axios.post("http://localhost:3000/event",
            {
                name: this.name, 
                date: this.date,
                time: this.time,
                location: this.location

            });

            console.warn(result);
            if(result.status==201)
            {              
                localStorage.setItem("event-info",JSON.stringify(result.data))
                this.$router.push({name:'create-event'})
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
