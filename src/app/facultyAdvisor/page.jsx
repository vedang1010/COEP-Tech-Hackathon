"use client"
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import app from "../config/config"
import { getDatabase, ref, onValue } from "firebase/database";

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top:5rem;
`;

const TabButton = styled.button`
  padding: 15px 25px;
  margin: 20px 10px;
  background-color: ${props => props.active ? '#023e8a' : 'transparent'};
  color: ${props => props.active ? 'white' : 'white'};
  border: 1px solid blue;
  border-radius: 5px;
  cursor: pointer;
  font-size:20px;
`;

const IndexPage = () => {
  const [activeTab, setActiveTab] = useState('pending'); // Default tab
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // console.log(tab)
    fetchData(tab); // Call fetchData whenever tab is changed
  };

  const fetchData = async (tab) => {
    try {
      // console.log("REach")
      const database = getDatabase(app);
      const rootRef = ref(database, "Requests");
      onValue(rootRef, (snapshot) => {
        const requests = snapshot.val();
        const newData = [];
        for (const userId in requests) {
          const userData = requests[userId];
          if (userData.status === tab) {
            console.log(userData)
            newData.push(userData);
          }
        }
        setData(newData); // Update state with new data
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <TabContainer>
        <TabButton onClick={() => handleTabClick('pending')} active={activeTab === 'pending'}>Pending</TabButton>
        <TabButton onClick={() => handleTabClick('accepted')} active={activeTab === 'accepted'}>Accepted</TabButton>
        <TabButton onClick={() => handleTabClick('canceled')} active={activeTab === 'canceled'}>Canceled</TabButton>
      </TabContainer>

      <div className="content">
        {activeTab === 'pending' && (
          <div>
            <h2>Pending Items</h2>
            <div className="content">
              {data.map((item, index) => (
                <div key={index}>
                  <h2>{item.title}</h2>
                  <p>Start Time: {item.start_time}</p>
                  <p>End Time: {item.end_time}</p>
                  {/* Render other item details if needed */}
                </div>
              ))}
            </div>

            {/* Render pending items */}
          </div>
        )}
        {activeTab === 'accepted' && (
          <div>
            <h2>Accepted Items</h2>
            {/* Render accepted items */}
            <div className="content">
              {data.map((item, index) => (
                <div key={index}>
                  <h2>{item.title}</h2>
                  <p>Start Time: {item.start_time}</p>
                  <p>End Time: {item.end_time}</p>
                  {/* Render other item details if needed */}
                </div>
              ))}
            </div>

          </div>
        )}
        {activeTab === 'canceled' && (
          <div>
            <h2>Canceled Items</h2>
            <div className="content">
              {data.map((item, index) => (
                <div key={index}>
                  <h2>{item.title}</h2>
                  <p>Start Time: {item.start_time}</p>
                  <p>End Time: {item.end_time}</p>
                  <p>Club: {item.club}</p>
                  {/* Render other item details if needed */}
                </div>
              ))}
            </div>

            {/* Render canceled items */}
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
