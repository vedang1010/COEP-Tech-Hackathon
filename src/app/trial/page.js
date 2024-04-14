"use client"
import React, { useState, useEffect } from 'react';
import { styled } from "styled-components";
import app from "../config/config";
import { ref, getDatabase, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

function AcceptedItems() {
  const [acceptedItems, setAcceptedItems] = useState([]);
  const auth = getAuth();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchAcceptedItems = async () => {
      try {
        const database = getDatabase(app); 
        const rootRef = ref(database, "Requests");
        
        onValue(rootRef, (snapshot) => {
          const requests = snapshot.val();
          const acceptedItemsArray = [];
          for (const requestId in requests) {
            const request = requests[requestId];
            if (request.status === 'accepted') {
              acceptedItemsArray.push(request);
            }
          }
          setAcceptedItems(acceptedItemsArray);
        });
      } catch (error) {
        console.error('Error fetching accepted items:', error);
      }
    };

    fetchAcceptedItems();
  }, []);

  return (
    <Container>
      <Title>Accepted Items</Title>
      <Content>
        {acceptedItems.map((item, index) => (
          <Item key={index}>
            <h2>{item.title}</h2>
            <p>Start Time: {item.start_time}</p>
            <p>End Time: {item.end_time}</p>
            {/* Render other item details if needed */}
          </Item>
        ))}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  margin-top: 3.5rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Item = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
`;

export default AcceptedItems;
