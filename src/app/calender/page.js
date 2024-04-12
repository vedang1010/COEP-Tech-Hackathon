"use client"
import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import app from "../config/config"

import { getDatabase, ref, onValue } from "firebase/database";
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
    const fetchDataForDate = (date) => {
      const rootRef = ref(database, "Requests");
      onValue(rootRef, (snapshot) => {
        const venue = snapshot.val();
        const newData = [];
        for (const userId in venue) {
          const userData = venue[userId];
          if (userData.date === date) {
            newData.push(userData);
          }
        }
        setListData(newData);
      });
    };
    

    if (selectedDate) {
      fetchDataForDate(selectedDate);
    }
  }, [database, selectedDate]);


  // Dummy data for demonstration
  const dataForDate = () => {
    // const len=listData.length;
    listData.forEach((userData) => {
      console.log(userData);
      // Perform operations on userData
    });
  };
  const handleDateClick = (date) => {
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));

    const formattedDate = localDate.toISOString().split('T')[0];
    console.log(formattedDate)
    // console.log("FFF",date)
    setSelectedDate(formattedDate);
    setListData(listData)
  };

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
              <ListItem key={index}>
                <p>Event Venue: {item.venue}</p>
                <p>Event Name: {item.title}</p>
                <p>Event Start Time: {item.start_time}</p>
                <p>Event End Time: {item.end_time}</p>
                <p>Event Club: {item.end_time}</p>
                {/* Add more properties as needed */}
              </ListItem>
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
