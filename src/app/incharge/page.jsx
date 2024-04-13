"use client"
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import app from "../config/config"
import Navbar from '../../../components/Navbar'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  flex-wrap: wrap;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  width: 300px;
  margin: 20px;
  padding: 20px;
  color: black;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 8px 10px magenta;
`;

const Title = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 10px;
`;

const Field = styled.p`
  margin: 5px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: ${(props) => props.bgColor};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TabButton = styled.button`
  padding: 15px 25px;
  margin: 20px 10px;
  background-color: ${(props) => (props.active ? "#023e8a" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#white")};
  border: 1px solid blue;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
`;

const IndexPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [data, setData] = useState([]);
  const [remarkText, setRemarkText] = useState({});
  const database = getDatabase(app);
  const auth=getAuth()
  const [user]=useAuthState(auth)
  useEffect(() => {
    const rootRef2 = ref(database, "Clubs");
    var club=""
    onValue(rootRef2, (snapshot) => {
      const request = snapshot.val();
      const newData = [];
      for (const userId in request) {
        const userData = request[userId];
        console.log("firebase data is "+userData.advisor)
        console.log("user is "+user.email)
        if (userData.advisor === user.email) {
          console.log(userData.name)
          club=userData.name;
          // setClub(userData.name);

          console.log("clubbb name iss")
          console.log(club);

          newData.push(userData); 
          // console.log(userData.name)
          // setClub(userData.name);
          // console.log(club)
        }
      }
      // setListData(newData);
    });
    const fetchData = async () => {
      try {
        const rootRef = ref(database, "Requests");
        onValue(rootRef, (snapshot) => {
          const requests = snapshot.val();
          const newData = [];
          for (const userId in requests) {
            const userData = requests[userId];
            if (userData.status === activeTab  && userData.club===club) {
              newData.push({ ...userData, id: userId });
            }
          }
          setData(newData);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [activeTab, database]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleApproval = async (id) => {
    await set(ref(database, `Requests/${id}/status`), "accepted");
  };

  const handleCancel = async (id) => {
    await set(ref(database, `Requests/${id}/status`), "cancelled");
  };

  const handleRemark = async (id) => {
    if (remarkText[id]) {
      await set(ref(database, `Requests/${id}/remark`), remarkText[id]);
    }
  };

  const updateRemarkText = (id, text) => {
    setRemarkText({ ...remarkText, [id]: text });
  };

  return (
    <div>
      <Navbar></Navbar>
      <TabContainer>
        <TabButton
          onClick={() => handleTabClick("pending")}
          active={activeTab === "pending"}
        >
          Pending
        </TabButton>
        <TabButton
          onClick={() => handleTabClick("accepted")}
          active={activeTab === "accepted"}
        >
          Accepted
        </TabButton>
        <TabButton
          onClick={() => handleTabClick("cancelled")}
          active={activeTab === "cancelled"}
        >
          Cancelled
        </TabButton>
      </TabContainer>
      <Container>
        {data.map((item, index) => (
          <Card key={index}>
            <Title>{item.title}</Title>
            <Field>Start Time: {item.start_time}</Field>
            <Field>End Time: {item.end_time}</Field>
            <Field>Club: {item.club}</Field>
            <Field>Venue: {item.venue}</Field>
            {activeTab === "pending" && (
              <>
                <Button
                  bgColor="#28a745"
                  onClick={() => handleApproval(item.id)}
                >
                  Approve
                </Button>
                <Button bgColor="#dc3545" onClick={() => handleCancel(item.id)}>
                  Cancel
                </Button>
                <TextArea
                  placeholder="Add a remark"
                  value={remarkText[item.id] || ""}
                  onChange={(e) => updateRemarkText(item.id, e.target.value)}
                />
                <Button bgColor="#007bff" onClick={() => handleRemark(item.id)}>
                  Add Remark
                </Button>
              </>
            )}
            {activeTab === "accepted" && (
              <>
                {/* <Button
                  bgColor="#28a745"
                  onClick={() => handleApproval(item.id)}
                >
                  Approve
                </Button> */}
                <Button bgColor="#dc3545" onClick={() => handleCancel(item.id)}>
                  Cancel
                </Button>
                <TextArea
                  placeholder="Add a remark"
                  value={remarkText[item.id] || ""}
                  onChange={(e) => updateRemarkText(item.id, e.target.value)}
                />
                <Button bgColor="#007bff" onClick={() => handleRemark(item.id)}>
                  Add Remark
                </Button>
              </>
            )}
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default IndexPage;
