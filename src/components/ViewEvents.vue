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

            <td v-if=edit && eventToEdit = event.id width="20%"><input type="text" v-model="editName" id='nameId' placeholder="New Name" ></td>
            <td v-else> {{event.name}}</td> 

            <td v-if=!edit>{{event.date}}</td> 
            <td v-else width="20%"><input type="date" v-model="editDate" placeholder="New Date"></td>

            <td v-if=!edit>{{event.time}}</td> 
            <td v-else width="20%"><input type="time" v-model="editTime" placeholder="New Time"></td>

            <td v-if=edit && eventToEdit = event.id width="20%"><input type="text" v-model="editLocation" placeholder="New Location"></td>
            <td v-else>{{event.location}}</td> 
            

            <td v-if=!edit><button v-on:click="editEvent(event)"> Edit Events </button></td> <td v-else> <button style="color: red" v-on:click="saveEvent(event)">Save Events</button> <button style="color: red" onclick="document.getElementById('nameId').value='Aurelia'; edit=!edit"> Cancel Edit </button></td>

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
      <br/>
      <button v-if="!edit" v-on:click="editEvent"> Edit Events </button>
      <button v-else style="color: red" onclick="document.getElementById('nameId').value='Aurelia'; edit=!edit"> Cancel Edit </button>
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
    errorView:'',

    edit: false,
    eventToEdit:'',
    editName:'',
    editDate:'',
    editTime:'',
    editLocation:'',
    placeholderName:'',
  }
},
  methods: {
    async refresh(){
      this.errorView =""
      let allEvents = await axios.get("http://localhost:3000/event");
      this.events = allEvents.data;
    },

    async searchID(){
      let allEvents = await axios.get("http://localhost:3000/event");

      var arrayLength = allEvents.data.length;
      for (var i = 0; i < arrayLength; i++) {
        if(allEvents.data[i].name == this.id_name || allEvents.data[i].id == this.id_name){
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
    },

    async editEvent(event){
      this.edit = !this.edit
      this.eventToEdit = event.id
      document.getElementById('nameId').value = " Aurelia"
    },

    async saveEvent(event){
      this.edit = !this.edit
      this.eventToEdit = ''
      let allEvents = await axios.get("http://localhost:3000/event");
      var arrayLength = allEvents.data.length;
      for (var i = 0; i < arrayLength; i++) {
        if (event.id == allEvents.data[i].id){
          if(this.editName.length != 0){
            event.name = this.editName
          }
          if(this.editDate.length != 0){
            event.date = this.editDate
          }
          if(this.editTime.length != 0){
            event.time = this.editTime
          }
          if(this.editLocation.length != 0){
            event.location = this.editLocation
          }

          let result = await axios.put("http://localhost:3000/event/"+event.id,
          {
            name: event.name, 
            date: event.date,
            time: event.time,
            location: event.location
          });
            
          console.warn(result);
          if(result.status==201)
          {              
            localStorage.setItem("event-info",JSON.stringify(result.data))
          }
          return
        }
      }
    },


  }
};
</script>