"use client"
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import app from "../config/config"
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
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
  const database = getDatabase(app);
  const auth = getAuth();
  const [user] = useAuthState(auth);
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

      const rootRef2 = ref(database, "Clubs");
      var club = ""
      onValue(rootRef2, (snapshot) => {
        const request = snapshot.val();
        const newData = [];
        for (const userId in request) {
          const userData = request[userId];
          // console.log(userData)
          if (userData.advisor === user.email) {
            console.log(userData.name)
            club = userData.name;

            newData.push(userData);
          }
        }
        // setListData(newData);
      });
      // console.log("REach")
      const rootRef = ref(database, "Requests");
      onValue(rootRef, (snapshot) => {
        const requests = snapshot.val();
        const newData = [];
        for (const userId in requests) {
          const userData = requests[userId];
          if (userData.club === club) {

            if (userData.Facultystatus === tab) {
              console.log(Object.values(userData))
              newData.push(userData);
            }
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
        <TabButton onClick={() => handleTabClick('cancelled')} active={activeTab === 'cancelled'}>cancelled</TabButton>
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
        {activeTab === 'cancelled' && (
          <div>
            <h2>cancelled Items</h2>
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

            {/* Render cancelled items */}
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
