<template>
  <img class="logo" src="../assets/plan2meetLogo.svg" />
  <h1>View Events</h1>
  <div class="viewEvents">

<center>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th width="20%">Event ID</th>
            <th width="20%">Event Name</th>
            <th width="20%">Date</th>
            <th width="20%">Time</th>
            <th width="20%">Location</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="event in events" :key="event.id">
            <td width="20%">{{event.id}}</td>
            <td width="20%">{{event.name}}</td>
            <td width="20%">{{event.date}}</td>
            <td width="20%">{{event.time}}</td>
            <td width="20%">{{event.location}}</td>
            </tr>

        </tbody>
      </table>
</center>

    <p>
      <router-link to="/create-event"> Back Home </router-link>
    </p>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  name: "ViewEvents",
  data() {
  return {
    events: []
  }
},
  methods: {
    async created(){
      try{
        let allEvents = await axios.get("http://localhost:3000/event/");
        this.events = allEvents.data;
      } catch(e){
        console.error(e);
      }
    }

  }
};
</script>