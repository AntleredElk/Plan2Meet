<template>
<div class="page">
<h1>Add Availibility</h1>
    <div class ="login">
        <input type="text" v-model="user" placeholder="Enter Name of Participant" />
        <input type="text" v-model="event" placeholder="Enter Name of Event" />
        <input type="date" v-model="date" placeholder="Enter Availibility Date" />
        <input type="time" v-model="time" placeholder="Enter Availibility Start Time" />
        <input type="time" v-model="time" placeholder="Enter Availibility End Time" />

        <button v-on:click="addAvailibility"> Add Availibility </button>
        <p>
            <router-link to="/remove-availibility"> Would you like to remove an availibility? </router-link>
        </p>

    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'AddAvailibility',
    data()
    {
        return {
            user:'',
            event:'',
            date:'',
            startTime:'',
            endTime:''
        }
    },
    methods:{
        async addAvailibility()
        {
            //console.warn("signup", this.name, this.email, this.password)
            let result = await axios.post("http://localhost:3000/availibility",
            {
                user: this.user,
                event: this.event,
                date: this.date,
                startTime: this.startTime,
                endTime: this.endTime
            });
            console.warn(result);
            if(result.status==201)
            {              
                localStorage.setItem("availibility-info",JSON.stringify(result.data))
                this.$router.push({name:'AddAvailibility'})
            }
        }
    }
}
</script>