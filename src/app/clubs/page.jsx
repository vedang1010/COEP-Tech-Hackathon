"use client"
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { app } from "../config/config"
import { getDatabase, ref, onValue, set } from "firebase/database";
import Layout from '../../../components/Layout';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic'
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

  const router = useRouter();

  // Retrieve position from cookies, default to null
  // const position = Cookies.get("position") || null;

  useEffect(() => {
    const userSession = sessionStorage.getItem("user");
    if (!user && !userSession) {
      router.push("/sign-in");
    }
  }, [user, router]);



  const [activeTab, setActiveTab] = useState('pending'); // Default tab
  const [Pdata, setPData] = useState([]);
  const [Cdata, setCData] = useState([]);
  const [Adata, setAData] = useState([]);
  const database = getDatabase(app);
  const auth = getAuth();
  const [user] = useAuthState(auth);

  // const router = useRouter();
  useEffect(() => {
    const userSession = sessionStorage.getItem("user");
    if (!user && !userSession) {
      router.push("/sign-in");
    }
  }, [user, router]);


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

    await set(ref(database, `Requests/${id}/status`), 'accepted');

  }
  const handleCancel = async (id) => {
    console.log(id)
    // const reqRef = ref(database, "Requests/"+id+"/Facultystatus");
    // const reqSnapshot = await get(reqRef);
    // const reqData = reqSnapshot.val();
    // const request = ;

    await set(ref(database, `Requests/${id}/status`), 'cancelled');

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
          if (user) {


            console.log(user.email)
            if (userData.email === user.email) {
              console.log(userData.name)
              club = userData.name;

              newData.push(userData);
            }
          }
        }
        // setListData(newData);
      });
      // console.log("REach")
      const rootRef = ref(database, "Requests");
      onValue(rootRef, (snapshot) => {
        const requests = snapshot.val();
        const newPData = [];
        const newCData = [];
        const newAData = [];
        for (const userId in requests) {
          const userData = requests[userId];
          // console.log(userData)
          if (userData.club === club) {
            if (userData.status === "pending" || userData.Facultystatus == "pending") {
              console.log(Object.values(userData))
              newPData.push(userData);
            }
            if (userData.status === "accepted" && userData.Facultystatus == "accepted") {
              console.log(Object.values(userData))
              newAData.push(userData);
            }
            if (userData.status === "cancelled" || userData.Facultystatus == "cancelled") {
              console.log(Object.values(userData))
              newCData.push(userData);
            }
          }
        }
        setPData(newPData); // Update state with new data
        setCData(newCData); // Update state with new data
        setAData(newAData); // Update state with new data
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Layout>
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
              {Pdata.map((item, index) => (
                <div key={index}>
                  <h2>{item.title}</h2>
                  <p>Date: {item.date}</p>
                  <p>Start Time: {item.start_time}</p>
                  <p>End Time: {item.end_time}</p>
                  <p>Club: {item.club}</p>
                  <p>Venue: {item.venue}</p>

                  {/* <button onClick={() => handleApproval(item.id)}>Approve</button> */}
                  {/* <button onClick={() => handleCancel(item.id)}>Cancel</button> */}

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
              {Adata.map((item, index) => (
                <div key={index}>
                  <h2>{item.title}</h2>
                  <p>Date: {item.date}</p>

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
              {Cdata.map((item, index) => (
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
    </Layout>
  );
};

// export default IndexPage;
export default dynamic(() => Promise.resolve(IndexPage), { ssr: false });
