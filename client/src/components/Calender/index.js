import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from "@fullcalendar/timegrid";

//import events from "./events";

//export default class Schedule extends Component {

 export default function Schedule() {

//    const events=[{title: 'Appointment', start: '08-17-2020'}, {title: "", start: "08-17-2020"}];
//    const events={this.formatEvents()};

        // 
        //constructor () {
    const events = [{ title: 'event 1', date: '2020-08-18' }];
        //}

    // const  formatEvents = () =>{
    //     return props.appointments.map(appointment => {
    //             const {title, end, start} = appointment
    
    //             let startTime = new Date(start)
    //             let endTime = new Date(end)
    
    //             return {
    //                 title, 
    //                 start: startTime,
    //                 end: endTime, 
    //                 extendedProps: {...appointment}
    //             }
    //         });
    // };

    // const  handleEventClick = ({event}) => {
    //  // openAppointment is a function I wrote to open a form to edit that appointment
    //     this.props.openAppointment(event.extendedProps);
    // }

    // const handleEventDrop = (info) => {
    //         if(window.confirm("Are you sure you want to change the event date?")){
    //             console.log('change confirmed')

    //             // updateAppointment is another custom method
    //             this.props.updateAppointment({...info.event.extendedProps, start: info.event.start, end: info.event.end})

    //         } else {
    //             console.log('change aborted')
    //         }
    // }

        return (<FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                    left: "prev,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    events={events}
                    locale="en"
                 
                />
            )
}

// events={[
//     { title: 'event 1', date: '2020-08-18' },
//     { title: 'event 2', date: '2020-08-18' }
//     ]}

// eventDrop={this.handleEventDrop}
//             eventClick={this.handleEventClick}
//             events={this.formatEvents()}