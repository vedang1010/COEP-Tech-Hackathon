"use client"
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import app from "../config/config"
import { getDatabase, ref, onValue, set } from "firebase/database";
import Navbar from '../../../components/Navbar'

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
  const [remarkText, setRemarkText] = useState({});
  const database = getDatabase(app);
  const auth = getAuth();
  const [user] = useAuthState(auth);
  
  // useEffect(() => {
  //   fetchData();
  // }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleApproval = async (id) => {
    await set(ref(database, `Requests/${id}/Facultystatus`), 'accepted');
  };

  const handleCancel = async (id) => {
    await set(ref(database, `Requests/${id}/Facultystatus`), 'cancelled');
  };

  const handleRemark = async (id) => {
    if (remarkText[id]) {
      await set(ref(database, `Requests/${id}/facRemark`), remarkText[id]);
    }
  };

  const updateRemarkText = (id, text) => {
    setRemarkText({ ...remarkText, [id]: text });
  };

  useEffect(() => {
    const fetchData = async () => {
      const rootRef = ref(database, "Requests");
      onValue(rootRef, (snapshot) => {
        const requests = snapshot.val();
        const newData = [];
        for (const userId in requests) {
          const userData = requests[userId];
          if (userData.Facultystatus === activeTab) {
            newData.push({ ...userData, id: userId });
          }
        }
        setData(newData);
      });
    };

    fetchData();
  }, [activeTab, database]);

  return (
    <div>
      <Navbar />
      <TabContainer>
        <TabButton onClick={() => handleTabClick('pending')} active={activeTab === 'pending'}>Pending</TabButton>
        <TabButton onClick={() => handleTabClick('accepted')} active={activeTab === 'accepted'}>Accepted</TabButton>
        <TabButton onClick={() => handleTabClick('cancelled')} active={activeTab === 'cancelled'}>Cancelled</TabButton>
      </TabContainer>

      <div className="content">
        {data.map((item, index) => (
          <div key={index}>
            <h2>{item.title}</h2>
            <p>Start Time: {item.start_time}</p>
            <p>End Time: {item.end_time}</p>
            <p>Club: {item.club}</p>
            <p>Venue: {item.venue}</p>
            {activeTab === 'pending' && (
              <>
                <button onClick={() => handleApproval(item.id)}>Approve</button>
                <button onClick={() => handleCancel(item.id)}>Cancel</button>
                <input type="text" placeholder="Add a remark" value={remarkText[item.id] || ''} onChange={(e) => updateRemarkText(item.id, e.target.value)} />
                <button onClick={() => handleRemark(item.id)}>Add Remark</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;