"use client"
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import app from "../config/config"
import { getDatabase, ref, onValue, set } from "firebase/database";

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top:5rem;
`;

const TabButton = styled.button`
  padding: 15px 25px;
  margin: 20px 10px;
  background-color: ${props => props.active ? '#3285A6' : 'rgba(50, 133, 166, 0.5)'};
  color: ${props => props.active ? 'white' : 'white'};
  border: 1px solid #3285A6;
  border-radius: 5px;
  cursor: pointer;
  font-size:20px;
`;

const IndexPage = () => {
  const [activeTab, setActiveTab] = useState('pending'); // Default tab
  const [data, setData] = useState([]);
  const database = getDatabase(app);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // console.log(tab)
    fetchData(tab); // Call fetchData whenever tab is changed
  };
  const handleApproval = async (id) => {
    console.log(id)
    // const reqRef = ref(database, "Requests/"+id+"/Facultystatus");
    // const reqSnapshot = await get(reqRef);
    // const reqData = reqSnapshot.val();
    // const request = ;

    await set(ref(database, `Requests/${id}/Facultystatus`), 'accepted');

  }
  const handleCancel = async (id) => {
    console.log(id)
    // const reqRef = ref(database, "Requests/"+id+"/Facultystatus");
    // const reqSnapshot = await get(reqRef);
    // const reqData = reqSnapshot.val();
    // const request = ;

    await set(ref(database, `Requests/${id}/Facultystatus`), 'cancelled');

  }


  const fetchData = async (tab) => {
    try {
      // console.log("REach")
      const rootRef = ref(database, "Requests");
      onValue(rootRef, (snapshot) => {
        const requests = snapshot.val();
        const newData = [];
        for (const userId in requests) {
          const userData = requests[userId];
          if (userData.Facultystatus === tab) {
            console.log(Object.values(userData))
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
                  <p>Club: {item.club}</p>
                  <p>Venue: {item.venue}</p>

                  <button onClick={() => handleApproval(item.id)}>Approve</button>
                  <button onClick={() => handleCancel(item.id)}>Cancel</button>

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
                  <p>Club: {item.club}</p>
                  <p>Venue: {item.venue}</p>

                  {/* Render other item details if needed */}
                  {/* <button onClick={() => handleApproval(item.key())}>Approve{item.key()}</button> */}
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
                  <p>Venue: {item.venue}</p>

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
