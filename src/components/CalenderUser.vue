<template>
    <div>
        <Fullcalendar :options="calendarOptions"/>
    </div>
</template>

<script>
import '@fullcalendar/core/vdom'
import Fullcalendar from "@fullcalendar/vue3"
import DayGridPlugin from "@fullcalendar/daygrid";
import TimeGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin from "@fullcalendar/interaction";

export default{
    components : {Fullcalendar},
        data () {
            return {
                isShowModal: false,
                calendarOptions: {
                    plugins: [DayGridPlugin, TimeGridPlugin, InteractionPlugin],
                    initialView: "timeGridWeek",
                    headerToolbar: {
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                    },
                
                },
        
            }

    
    
    }
}
</script>

<style>
</style>