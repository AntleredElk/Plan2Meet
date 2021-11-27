<template>
    <div>
        <Fullcalendar
        :options="calendarOptions"
        />
    </div>
</template>

<script>
import '@fullcalendar/core/vdom';
import Fullcalendar from "@fullcalendar/vue3";
import DayGridPlugin from "@fullcalendar/daygrid";
import TimeGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin from "@fullcalendar/interaction";

export default{
    components : {Fullcalendar},

    data: function() {
        
        return {  
            calendarOptions: {
                plugins: [DayGridPlugin, TimeGridPlugin, InteractionPlugin],
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                },
                editable: true,
                events: this.currentEvents,
                selectable: true,
                dateClick: this.handleDateClick,
                // eventRender: this.events
                //select: this.handleDateClick                
            },
            currentEvents: [
                    {
                    id: 'a',
                    title: 'my event',
                    start: '2021-11-11'
                    }
            ],        
        }
    },

    methods: {
        handleDateClick: function(arg){
            var dateObject = arg;
            let event = {
                title: "test",
                start: dateObject.dateStr,
                end: dateObject.dateStr,
                display: 'auto'
            }
            this.currentEvents.push(event)
            alert('Clicked on: ' + dateObject.dateStr);
            console.log(this.currentEvents)
        },
        handleSelect: function(arg){
            var dateObject = arg;
            console.log(dateObject)
        },
    },
}
</script>

<style>
</style>