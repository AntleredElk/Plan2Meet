<template>
    <div>
        <input type="user email" v-model="userEmail" placeholder="email of the user" />
        <button v-on:click="addAvailability"> Add Availability </button>
        <button v-on:click="removeAvailability"> remove Availability </button>
        <Fullcalendar :options="calendarOptions"></Fullcalendar>
    </div>
</template>

<script>
import '@fullcalendar/core';
import Fullcalendar from "@fullcalendar/vue3";
import DayGridPlugin from "@fullcalendar/daygrid";
import TimeGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin from "@fullcalendar/interaction";
import axios from 'axios'

export default{
    components : {Fullcalendar},

    data: function() {
        var self = this;
        return {  
            calendarOptions: {
                plugins: [DayGridPlugin, TimeGridPlugin, InteractionPlugin],
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                },
                editable: true,
                
                selectable: true,
                //dateClick: this.handleDateClick,
                initialView: 'dayGridMonth',
                events: self.currentAvailability,
                select: this.handleSelect                
            },
            userEmail:'',
            currentAvailability: [],
            selectionInfo: {},
            dataObject:'',
            color: 'yellow',   // an option!
            textColor: 'black' // an option!        
        }
    },

    methods: {
        // handleDateClick: function(arg){
        //     var dateObject = arg;
        //     // let event = {
        //     //     title: "test",
        //     //     start: dateObject.dateStr,
        //     //     end: dateObject.dateStr,
        //     //     display: 'auto'
        //     // }
        //     // let availibility = {
        //     //     startDate: dateObject.dateStr,
        //     //     endDate: dateObject.dateStr,
        //     // }

        //     // this.currentEvents.push(event)
        //     // this.currentAvailability.push(availibility)
        //     // calendarOptions.changeView('timeGridWeek');
        //     alert('Clicked on: ' + dateObject.dateStr);
        //     console.log(this.currentEvents)
        //     // console.log(this.currentAvailability)
        // },

        handleSelect: function(arg){
            var dateObject = arg
            let availibility = {
                title: '',
                start: dateObject.startStr,
                end: dateObject.endStr,
            }
            this.currentAvailability.push(availibility)
            console.log(this.currentAvailability)
        },

        async addAvailability(){
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
                var availability = this.currentAvailability;
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
                        userStatus: userStatus,
                        availability: availability,
                    });
                    console.warn(newUser);
                    if(newUser.status==201)
                    {              
                        console.log("user created!")
                        localStorage.setItem("user-info",JSON.stringify(newUser.data))
                        this.$router.push({name:'CalenderUser'})
                    }
                    this.currentAvailability = []
                    window.location.reload()
                }
            }
        else{
            alert("Please Enter Valid Email address!");
        }
          console.warn(result)
      },
      async removeAvailability(){
        let result = await axios.get(
            `http://localhost:3000/user?email=${this.userEmail}`
        )
        if(result.status==200 && result.data.length>0){
            var currentArrayLength = this.currentAvailability.length;
            // var arrayLength = result.data[0].availability.length;
            // var index = []
            // console.log(currentArrayLength)
            console.log(result)
            // console.log(arrayLength)

            for (var j = 0; j< currentArrayLength; j++){
                var arrayLength = result.data[0].availability.length;
                for (var i = arrayLength- 1; i >= 0; i--) {
                    console.log(result.data[0].availability[i])
                    console.log(result.data[0].availability[i]['startDate'])
                    if(result.data[0].availability[i]['startDate'] == this.currentAvailability[j]['startDate']){
                        if(result.data[0].availability[i]['endDate'] == this.currentAvailability[j]['endDate']){
                            console.log("find it!")
                            result.data[0].availability.splice(i,1)
                            // delete result.data[0].availability[i]
                            // index.push(i)
                        }
                    }
                }
            }
            console.log(result.data[0].availability)
            var userName = result.data[0].name
            var userEmail = result.data[0].email 
            var userPassword =  result.data[0].password
            console.log("user get!")  
            var firstName = this.firstName;
            var lastName = this.lastName;
            var phoneNumber = this.phoneNumber;
            var userLocation = this.userLocation;
            var userStatus = this.userStatus;
            var availability = result.data[0].availability;
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
                    userStatus: userStatus,
                    availability: availability,
                });
                console.warn(newUser);
                if(newUser.status==201)
                {              
                    console.log("user created!")
                    localStorage.setItem("user-info",JSON.stringify(newUser.data))
                    this.$router.push({name:'CalenderUser'})
                }
                this.currentAvailability = []
            }
        }


      },
    
    },
}
</script>

<style>
</style>