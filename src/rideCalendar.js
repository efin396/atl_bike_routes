import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function RideCalendar() {
  const today = new Date();

  const events = [
    {
      title: 'Morning Ride',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9),
      color: '#1e90ff', // blue
    },
    {
      title: 'Evening Ride',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19),
      color: '#ff6347', // tomato
    },
  ];

  // This function tells the calendar how to style each event
  const eventStyleGetter = (event) => {
    const backgroundColor = event.color || '#3174ad'; // fallback color
    const style = {
      backgroundColor,
      borderRadius: '6px',
      opacity: 0.9,
      color: 'white',
      border: '0',
      display: 'block',
    };
    return { style };
  };

  return (
    <div style={{ height: '90vh', padding: '1rem' }}>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        date={today}
        toolbar={false} 
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}

export default RideCalendar;
