"use client"

import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import app from "../config/config"

const GlobalStyle = createGlobalStyle`
  /* Calendar Component CSS */

  /* Set background color of calendar container to black */
  .CalendarGfg {
    background-color: black;
  }

  /* Set date color to white */
  .react-calendar__tile {
    color: black; /* Change to white */
  }

  /* Set color of today's date to green */
  .react-calendar__tile--now {
    background-color: green;
    color: black;
  }

  /* Set color of selected date to blue */
  .react-calendar__tile--active {
    background-color: blue;
    color: black;
  }

  /* Set color of day names to black */
  .react-calendar__month-view__weekdays__weekday abbr {
    color: black;
  }

  /* Set color of arrows for navigation to black */
  .react-calendar__navigation button {
    color: black;
  }

  /* Set color of month and year to black */
  .react-calendar__navigation__label__labelText {
    color: black;
  }

  /* Set overall calendar container to be responsive */
  .CalendarContainer {
    width: 100%;
    max-width: 800px; /* Adjust max-width as needed */
  }

  /* Add custom styles for the list of events */
  .ListContainer {
    margin-top: 20px;
    background-color: #444; /* Dark background for the list */
    padding: 10px;
  }

  .ListItem {
    color: black; /* White text for list items */
  }
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const CalendarTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: black; /* White text for the title */
`;

const StyledCalendar = styled(Calendar)`
  width: 800px;
  /* Additional styles if needed */
`;

const ListContainer = styled.div`
  margin-top: 20px;
`;

const ListItem = styled.div`
  margin-bottom: 10px;
`;

const CalendarGfg = () => {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [listData, setListData] = useState([]);
  const database = getDatabase(app);


useEffect(() => {
  console.log("hello")
  // console.log(database)
  const rootRef = ref(database, "Venue");
  onValue(rootRef, (snapshot) => {
    const venue = snapshot.val();
    // console.log(venue)
    // const updatedWebsites = [];

    for (const userId in venue) {
      const userData = venue[userId];
      console.log(userData.id1.date)
    }

    // setWebsites(updatedWebsites);
  });

}, [database]);


  // Dummy data for demonstration
  const dataForDate = {
    '2024-04-17': ['Event 1', 'Event 2', 'Event 3'],
    '2024-04-18': ['Event on 18th'], // Corrected date
    '2024-04-19': ['Event 4', 'Event 5'],
    // Add more data as needed
  };

  useEffect(() => {
    // Automatically display today's events on load
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    setListData(dataForDate[today] || []);
  }, []); // Empty dependency array means this effect runs once on mount

  const handleDateClick = (date) => {
    // Create a new Date object with the local time zone offset applied
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    const formattedDate = localDate.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    setListData(dataForDate[formattedDate] || []);
  };

  // const renderEventsForToday = () => {
  //   const todayEvents = dataForDate[selectedDate] || [];
  //   return todayEvents.map((event, index) => <ListItem key={index}>{event}</ListItem>);
  // };

  return (
    <>
      <GlobalStyle />
      <CalendarContainer className="CalendarGfg">
        <CalendarTitle>Event Look Calendar</CalendarTitle>
        <StyledCalendar onChange={onChange} value={value} onClickDay={handleDateClick} />
        {selectedDate && (
          <ListContainer>
            <h2>Events for {selectedDate}</h2>
            {listData.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </ListContainer>
        )}
        {/* <ListContainer>
          <h2>Today's Events</h2>
          {renderEventsForToday()}
        </ListContainer> */}
      </CalendarContainer>
    </>
  );
};

export default CalendarGfg;
