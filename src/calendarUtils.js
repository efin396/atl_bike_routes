const dayToIndex = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function getNextWeekdayDate(dayIndex) {
  const today = new Date();
  const currentDay = today.getDay();
  const targetDate = new Date(today);

  if (Number(dayIndex) < Number(currentDay)){
    const diff = (dayIndex - currentDay) % 7 || 7;
    targetDate.setDate(today.getDate() + diff);
  } else if (Number(dayIndex) > Number(currentDay)){
    const diff = (currentDay - dayIndex) % 7 || 7;
    targetDate.setDate(today.getDate() - diff);
  }
  return targetDate;
}


export function generateRideEvents(rides) {
  return rides.map(ride => {
    const dayIndex = dayToIndex[ride.day];
    if (dayIndex === undefined) return null;

    const [hour, minute] = ride.time.split(':').map(Number);
    const date = getNextWeekdayDate(dayIndex);
    date.setHours(hour, minute, 0, 0);

    const start = new Date(date);
    const end = new Date(start);
    end.setHours(end.getHours() + 1); // default duration: 1 hour

    return {
      title: ride.name,
      start,
      end,
    };
  }).filter(Boolean); // remove nulls
}
