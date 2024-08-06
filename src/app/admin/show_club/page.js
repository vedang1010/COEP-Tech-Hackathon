'use client'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import app from "../../config/config"
import { getDatabase, ref, onValue } from "firebase/database";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
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

const ShowAll = () => {
  const router = useRouter();
    const [listData, setListData] = useState([]);
    const database = getDatabase(app);
    useEffect(() => {
        const rootRef = ref(database, "Clubs");
        onValue(rootRef, (snapshot) => {
            const club = snapshot.val();
            const newData = [];
            for (const userId in club) {
                const userData = club[userId];
                newData.push(userData);
            }
            setListData(newData);
        })
    }, [database]);

    const handleFacultyAdvisorChange = (clubName) => {
        // Set club name in cookie
        Cookies.set('clubName', clubName);
        // Redirect or perform any other action as needed
        // For example:
        // history.push('/change-faculty-advisor');
        router.push('/updateInfo')
    };

    return (
        <>
            <Title>Clubs And Faculty Advisor</Title>
            <Container>
                {listData.map((item,index)=>(
                    <Card key={index}>
                        <p style={{color:"black"}}>Club Name: {item.name}</p>
                        <p style={{color:"black"}}>Advisor mail id: {item.advisor}</p>
                        <Button onClick={() => handleFacultyAdvisorChange(item.name)}>Change Faculty Advisor</Button>
                    </Card>
                ))}
            </Container>
        </>
    )
}

export default ShowAll;
