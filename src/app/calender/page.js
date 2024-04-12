"use client"
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import app from "../config/config"

import { getDatabase, ref, onValue } from "firebase/database";
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const CalendarTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledCalendar = styled(Calendar)`
  width: 800px;
  color: white;
  background-color: black;
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


  // Dummy data for demonstration
  const dataForDate = {

    // '2024-04-12': ['Event 1', 'Event 2', 'Event 3'],
    // '2024-04-13': ['Event 4', 'Event 5'],
    // Add more data as needed
  };

  // const handleDateClick = (date) => {
  //   const formattedDate = date.toISOString().split('T')[0];
  //   setSelectedDate(formattedDate);
  //   setListData(dataForDate[formattedDate] || []);
  // };

  return (
    <CalendarContainer>
      <CalendarTitle>NextJs Calendar - GeeksforGeeks</CalendarTitle>
      <StyledCalendar onChange={onChange} value={value} onClickDay={handleDateClick} />
      {selectedDate && (
        <ListContainer>
          <h2>Events for {selectedDate}</h2>
          {listData.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
        </ListContainer>
      )}
    </CalendarContainer>
  );
};

export default CalendarGfg;
