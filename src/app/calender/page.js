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
    margin-bottom: 12rem;

  }

  /* Set date color to white */
  .react-calendar__tile {
    color: black; /* Change to white */
  }

  /* Set color of today's date to green */
  .react-calendar__tile--now {
    background-color: #078C03;
    color: black;
    border-radius:15px; 
  }

  /* Set color of selected date to blue */
  .react-calendar__tile--active {
    background-color: #90e0ef;
    color: black;
    border-radius:15px;
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
  /* Set overall calendar container to be responsive */
  .CalendarContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    max-width: 800px; /* Adjust max-width as needed */
  }

  /* Add custom styles for the list of events */
  .ListContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
    background-color:#e3f2fd;
    // opacity:0.2;
    color:black;
    margin-top:3rem;
    
  }

  .ListItem {
    color: pink; /* White text for list items */
    padding: 10px;
    background-color: #444; /* Dark background for the list */
    width: 100%;
    max-width: 400px; /* Adjust max-width as needed */
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
  width: 700px;
  margin-left:9%;
  margin-right:9%;
  border-radius:20px;
  padding:3rem;
  /* Additional styles if needed */
`;

const ListContainer = styled.div`
  margin-top: 7rem;
  width:45%;
  // align-items:center;
  align-text:center;
  border: 1px solid white 0.5;
`;

const ListItem = styled.div`
  margin-top: 15px;
  padding-left:3rem;
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
          if (userData.date === date && userData.status==="accepted") {
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
            <ScrollableContainer className="ListContainer">
              {listData.map((item, index) => (
                <ListItem key={index}>
                  <p>Event Venue: {item.venue}</p>
                  <p>Event Name: {item.title}</p>
                  <p>Event Start Time: {item.start_time}</p>
                  <p>Event End Time: {item.end_time}</p>
                  <p>Event Club: {item.club}</p>
                  {/* Add more properties as needed */}
                </ListItem>
              ))}
            </ScrollableContainer>
          </ListContainer>
        )}
      </CalendarContainer>
    </>
  );
};
const ScrollableContainer = styled.div`
  width: 100%;
  max-height: 300px; /* Limiting the height of the scrollable container */
  overflow-y: auto; /* Enable vertical scrollbar when content exceeds container height */
`;
export default CalendarGfg;
