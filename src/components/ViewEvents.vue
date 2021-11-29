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
            <th width="16%">Event ID</th>
            <th width="16%">Event Name</th>
            <th width="16%">Date</th>
            <th width="16%">Time</th>
            <th width="16%">Location</th>
            <th width="16%">Archive Event</th>

          </tr>
        </thead>
        <tbody>
            <tr v-for="event in events" :key="event.id" >
            
            <td>{{event.id}}</td>
            <td>{{event.name}}</td>
            <td>{{event.date}}</td> 
            <td>{{event.time}}</td> 
            <td>{{event.location}}</td> 
            <td v-if="event.archived"><button v-on:click="unArchiveEvent(event)">Unarchive</button></td>
            <td v-else><button v-on:click="archiveEvent(event)">Archive</button></td>
            </tr>
        </tbody>
      </table>
</center>

    <p>
      <span v-if="errorView" style="color: red"
        >Error: {{ errorView}}
      </span>
      <br/>
      <button v-if="!edit" v-on:click="refresh"> Refresh </button>
      <br/>
      <button v-if="!edit" v-on:click="editEvent(event)"> Edit Events </button>

      <div1 v-if="edit">
        <span >Edit Event with ID: </span>
        <select v-model="selectedEvent">
          <option v-for="event in events" v-bind:key="event.id">{{ event.id }} </option>
        </select>
        <br/>
        Enter New Name: <input v-if="edit" type="text" v-model="editName" ng-attr-placeholder="Name" />
        <br/>
        Enter New Date: <input v-if="edit" type="date" v-model="editDate" placeholder="Date" />
        <br/>
        Enter New Time: <input v-if="edit" type="time" v-model="editTime" placeholder="Time" />
        <br/>
        Enter New Location: <input v-if="edit" v-model="editLocation" placeholder="Location" />
        <br/>
        <button v-if="edit" style="color: red" v-on:click="editEvent()"> Cancel Edit </button>
        <br/> 
        <button v-if="edit" style="color: red" v-on:click="saveEvent(selectedEvent)"> Save Edit </button>
        <br />
        <button
          v-if="edit"
          style="color: red"
          v-on:click="downloadICS(selectedEvent)"
        >
          Download JSON
        </button>
      </div1>
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
    temp_event: [],

    id_name:'',
    date:'',
    errorView:'',

    edit: false,
    editName:'',
    editDate:'',
    editTime:'',
    editLocation:'',

    selectedEvent:'',

  }
},
  methods: {
    async refresh(){
      this.errorView =""
      let allEvents = await axios.get("http://localhost:3000/event");
      this.events = allEvents.data;
    },

    async archiveEvent(event){

      let result = await axios.put("http://localhost:3000/event/" + event.id,
          {
            name: event.name, 
            date: event.date,
            time: event.time,
            location: event.location,
            archived: 1
          });
      console.warn(result);
          if(result.status==201)
          {              
            localStorage.setItem("event-info",JSON.stringify(result.data))
          }

          this.errorView =""
          let allEvents = await axios.get("http://localhost:3000/event");
          this.events = allEvents.data;
          return
    },

    async unArchiveEvent(event){

      let result = await axios.put("http://localhost:3000/event/" + event.id,
          {
            name: event.name, 
            date: event.date,
            time: event.time,
            location: event.location,
            archived: 0
          });
      console.warn(result);
          if(result.status==201)
          {              
            localStorage.setItem("event-info",JSON.stringify(result.data))
          }

          this.errorView =""
          let allEvents = await axios.get("http://localhost:3000/event");
          this.events = allEvents.data;
          return
    },

    async searchID(){
      let allEvents = await axios.get("http://localhost:3000/event");
      this.events = allEvents.data
      this.errorView = "Invalid Search" 

      var arrayLength = allEvents.data.length;
      for (var i = 0; i < arrayLength; i++) {
        if (allEvents.data[i].id == this.id_name){
          this.events = allEvents.data.slice(i, i + 1)
          this.errorView = ""
          return
        }
        else if(allEvents.data[i].name != this.id_name){
          this.events.splice(i, 1)
          i = i - 1
        }
        else{
          this.errorView = "" 
        }
      }
    },

    async searchDate(){
      let allEvents = await axios.get("http://localhost:3000/event");
      this.events = allEvents.data
      this.errorView = "Invalid Search" 

      var arrayLength = allEvents.data.length;
      for (var i = 0; i < arrayLength; i++) {
        if(allEvents.data[i].date != this.date){
          this.events.splice(i, 1)
          i = i - 1 
        }
        else{
          this.errorView = "" 
        }
      }
    },

    async editEvent(){
      this.errorView =""
      this.edit = !this.edit
    },

    async saveEvent(eventId){
      if (eventId == ""){
        this.errorView = "Invalid Search" 
        return
      }
      this.errorView =""
      this.edit = !this.edit

      let allEvents = await axios.get("http://localhost:3000/event");
      var arrayLength = allEvents.data.length;
      console.log(allEvents);
      for (var i = 0; i < arrayLength; i++) {
        if (eventId == allEvents.data[i].id){
        console.log(allEvents.data[i]);

          if (allEvents.data[i].archived){
            this.errorView = "Cannot modify archived event.";
          } else {
            if(this.editName.length != 0){
              this.temp_event.name = this.editName
            }
            else{
              this.temp_event.name = this.events[i].name
            }

            if(this.editDate.length != 0){
              this.temp_event.date = this.editDate
            }
            else{
              this.temp_event.date= this.events[i].date
            }
    
            if(this.editTime.length != 0){
              this.temp_event.time = this.editTime
            }
            else{
              this.temp_event.time = this.events[i].time
            }

            if(this.editLocation.length != 0){
              this.temp_event.location = this.editLocation
            }
            else{
              this.temp_event.location = this.events[i].location
            }


            let result = await axios.put("http://localhost:3000/event/" + eventId,
            {
              name: this.temp_event.name, 
              date: this.temp_event.date,
              time: this.temp_event.time,
              location: this.temp_event.location
            });
              
            console.warn(result);
            if(result.status==201)
            {              
              localStorage.setItem("event-info",JSON.stringify(result.data))
            }

            this.errorView =""
            let allEvents = await axios.get("http://localhost:3000/event");
            this.events = allEvents.data;
            return
          }
        }
      }
    },

     async downloadICS(eventId) {
      console.log("Prepare downloading ics...");

      if (eventId == "") {
        this.errorView = "Invalid Search";
        return;
      }
      this.errorView = "";
      this.edit = !this.edit;

      let allEvents = await axios.get("http://localhost:3000/event");
      var arrayLength = allEvents.data.length;

      for (var i = 0; i < arrayLength; i++) {
        if (eventId == allEvents.data[i].id) {
          this.temp_event = allEvents.data[i];
        }
      }

      var fileName = this.temp_event.name + ".json";

      this.download(JSON.stringify(this.temp_event), fileName, "text/plain")

      return;
    },

    download(content, fileName, contentType) {
      const a = document.createElement("a");
      const file = new Blob([content], { type: contentType });
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    },

    addNewfield() {
      const clone = Object.assign({}, this.item);
      this.items.push(clone);
    },
  }
};
</script>