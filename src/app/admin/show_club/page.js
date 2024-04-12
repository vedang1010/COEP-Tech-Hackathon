"use client"
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import app from "../../config/config"

import { getDatabase, ref, onValue } from "firebase/database";

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Card = styled.div`
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: calc(50% - 20px);
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Align button to the bottom */
  @media (max-width: 768px) {
    width: calc(100% - 20px);
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto; /* Align button to the right */
`;

const show_all = () => {
    const [listData, setListData] = useState([]);
    const database = getDatabase(app);
    useEffect(() => {
        const rootRef = ref(database, "Clubs");
        onValue(rootRef, (snapshot) => {
            const club = snapshot.val();
            const newData = [];
            for (const userId in club) {
                const userData = club[userId];
                // if (userData.date === date) {
                  newData.push(userData);
                // }
                // console.log(userData)
              }
              console.log(newData);
              setListData(newData);
        })
        // const fetchDataForDate = (date) => {
        //   const rootRef = ref(database, "Requests");
        //   onValue(rootRef, (snapshot) => {
        //     const venue = snapshot.val();
        //     const newData = [];
        //     for (const userId in venue) {
        //       const userData = venue[userId];
        //       if (userData.date === date) {
        //         newData.push(userData);
        //       }
        //     }
        //     setListData(newData);
        //   });
        // };
        
    
        // if (selectedDate) {
        //   fetchDataForDate(selectedDate);
        // }
      }, [database]);
  return (
    <>
            <Title>Clubs And Faculty Advisor</Title>
            <Container>
                {listData.map((item,index)=>(
                    <Card key={index}>
                        <p style={{color:"black"}}>Club Name: {item.name}</p>
                        <p style={{color:"black"}}>Advisor mail id: {item.advisor}</p>
                        {/* <p>Event Start Time: {item.start_time}</p>
                        <p>Event End Time: {item.end_time}</p>
                        <p>Event Club: {item.end_time}</p> */}
                        {/* Add more properties as needed */}
                        <Button type="submit">Change Faculty Advisor</Button>
                    </Card>
                ))}
            </Container>
        </>
  )
}



export default show_all
