<template>
<img class = "logo" src="../assets/plan2meetLogo.svg" />
<h1>Calendar</h1>
<div class="content">
    <add-availibility></add-availibility>
    <div class="calendar">
        <div v-for="event in eventList" :key="event.id">
        </div>
        {{availibilityList}}
    </div>
</div>
</template>

<script>
import AddAvailibility from './AddAvailibility.vue';
import axios from 'axios'

export default {

    components: {
        AddAvailibility
    },
     data () {
        return {
            'availibilityList': [],
            'eventList': [],
        }
    },
    methods:{
        async ViewCalendar()
        {          
            let result = await axios.get("http://localhost:3000/availibility");
            if (result.status==200) {
                this.availibilityList = JSON.parse( localStorage.getItem("availibility-info"));
            }
            let response2 = await axios.get("http://localhost:3000/event");
            //console.log("response2: "+response2);
            if(response2.status==200)
            {              
                 this.eventList = JSON.parse( localStorage.getItem("event-info") );
            }
        }
    },
    async mounted () {
        this.ViewCalendar();
    }
}

</script>

<style scoped>
.content {
    display: flex;
    margin: 50px;
}
.calendar {
    margin-left: 20%;
}
</style>