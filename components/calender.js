"use client"
import React, { useState } from 'react';
import './calender.css'; // Import CSS file for styling

const eventData = [
  { startDate: '2024-04-10', endDate: '2024-04-10', info: 'Event 1' },
  { startDate: '2024-04-5', endDate: '2024-04-6', info: 'main' },
  { startDate: '2024-04-15', endDate: '2024-04-16', info: 'cogini' },
  { startDate: '2024-04-20', endDate: '2024-04-20', info: 'main' }
];

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});

  // Populate events from eventData
  useState(() => {
    const eventsDataMap = {};
    eventData.forEach(event => {
      const { startDate, endDate, info } = event;
      const start = new Date(startDate);
      const end = new Date(endDate);
      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        const dateKey = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        if (!eventsDataMap[dateKey]) {
          eventsDataMap[dateKey] = [];
        }
        eventsDataMap[dateKey].push(info);
      }
    });
    setEvents(eventsDataMap);
  }, []);

  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const monthYearString = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(firstDay);

    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(<div key={`empty-${i}`} className="empty-day" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${month + 1}-${day}`;
      days.push(
        <div key={`day-${day}`} className="calendar-day" onClick={() => handleDayClick(dateKey)}>
          <div className="day-number">{day}</div>
          {events[dateKey] && (
            <div className="event-container">
              {events[dateKey].map((event, index) => (
                <div key={`${dateKey}-${index}`} className="event-info">
                  {event}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div id="calendar ">
        <div id="header">
          <button onClick={prevMonth}>&#10094;</button>
          <span id="month-year">{monthYearString}</span>
          <button onClick={nextMonth}>&#10095;</button>
        </div>
        <div id="days" className="calendar-grid">{days}</div>
      </div>
    );
  };

  const prevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  };

  const handleDayClick = dateKey => {
    const eventText = prompt('Enter event:');
    if (eventText) {
      setEvents(prevEvents => ({
        ...prevEvents,
        [dateKey]: [...(prevEvents[dateKey] || []), eventText]
      }));
    }
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return generateCalendar(currentYear, currentMonth);
}

export default Calendar;

