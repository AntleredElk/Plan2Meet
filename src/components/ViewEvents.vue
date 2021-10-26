<template>
  <img class="logo" src="../assets/plan2meetLogo.svg" />
  <h1>View Events</h1>
  <br />
  <input type="text" v-model="id_name" placeholder="Search by ID or Name" />
  <button v-on:click="searchID"> Search</button>
  <br />
  <input type="date" v-model="date" placeholder="Search by Date" />
  <button v-on:click="searchDate"> Search</button>


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
            <td>{{event.id}}</td>
            <td>{{event.name}}</td>
            <td>{{event.date}}</td>
            <td>{{event.time}}</td>
            <td>{{event.location}}</td>
            </tr>

        </tbody>
      </table>
</center>

    <p>
      <span v-if="errorView" style="color: red"
        >Error: {{ errorView}}
      </span>
      <br />
      <button v-on:click="refresh"> Refresh </button>
    </p>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  name: "ViewEvents",
  data() {
  return {
    events: [],
    id_name:'',
    date:'',
    errorView:''
  }
},
  methods: {
    async refresh(){
      let allEvents = await axios.get("http://localhost:3000/event");
      this.events = allEvents.data;
    },

    async searchID(){
      let allEvents = await axios.get("http://localhost:3000/event");

      var arrayLength = allEvents.data.length;
      for (var i = 0; i < arrayLength; i++) {
        if(allEvents.data[i].name == this.id_name || allEvents.data[i].id == this.id_name){
          console.log("oui")
          this.events = allEvents.data.slice(i, i + 1)
          this.errorView = "" 
          return
        }
        else{
          this.errorView = "Invalid Search" 
          this.events = allEvents.data.slice(0, 0)
        }
      }
    },

    async searchDate(){
      let allEvents = await axios.get("http://localhost:3000/event");

      var arrayLength = allEvents.data.length;
      for (var i = 0; i < arrayLength; i++) {
        if(allEvents.data[i].date == this.date){
          this.events = allEvents.data.slice(i, i + 1)
          this.errorView = "" 
          return
        }
        else{
          this.errorView = "Invalid Search" 
          this.events = allEvents.data.slice(0, 0)
        }
      }
    }

  }
};
</script>