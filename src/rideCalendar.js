import data from './rides.json' with { type: 'json' };
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { generateRideEvents } from './calendarUtils';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function RideCalendar() {
  const today = new Date();
        function generateAccessibleColor() {
        const hue = Math.floor(Math.random() * 360); // full hue range
        const saturation = 80;  // strong color
        const lightness = 40;   // not too light (avoid <60 on light maps)

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      }

     

  const events = generateRideEvents(data);
  // This function tells the calendar how to style each event
  const eventStyleGetter = (event) => {
    const backgroundColor = generateAccessibleColor();
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
