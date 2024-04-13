// "use client";
// import React from "react";
// import { useEffect, useState } from "react";
// import Navbar from "../../../components/Navbar";
// import { app } from "../config/config";
// import Layout from "../../../components/Layout";
// import {
//   ref,
//   set,
//   getDatabase,
//   orderByChild,
//   onValue,
// } from "firebase/database";
// import { useRouter } from "next/navigation";
// import styled from "styled-components";

// const Select = styled.select`
//   width: 50%;
//   margin: 4rem auto 1rem 26vw;
//   padding: 1rem;
//   background-color: #F2A379;
//   border: none;
//   border-radius: 4px;
//   color: #000;
//   outline: none;
//   font-size: medium;
// `;

// const Option = styled.option`
//   background-color: #EFD5B7;
//   color: black;
// `;

// const Output = styled.output`
//   color: white;
//   padding: 2rem;
//   width: 50%;
//   height: 100%;
//   margin: 20px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
//   transition: box-shadow 0.3s ease; /* Add transition for smooth effect */
//   line-height: 1.5;
//   &:hover {
//     box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.12);
//   }
// `;

// const Page = () => {
//   const [venues, setVenues] = useState([]);
//   const [selectedVenue, setSelectedVenue] = useState("");
//   const [requests, setRequests] = useState([]);
//   const router = useRouter();
//   const database = getDatabase();

//   useEffect(() => {
//     const fetchVenues = () => {
//       const venuesRef = ref(database, "Venue");
//       onValue(venuesRef, (snapshot) => {
//         const venuesData = [];
//         snapshot.forEach((childSnapshot) => {
//           venuesData.push(childSnapshot.val());
//         });
//         setVenues(venuesData);
//       });
//     };

//     fetchVenues();
//   }, [database]);

//   useEffect(() => {
//     const fetchData = () => {
//       if (selectedVenue) {
//         const requestsRef = ref(database, "Requests");
//         onValue(requestsRef, (snapshot) => {
//           const requestsData = [];
//           snapshot.forEach((childSnapshot) => {
//             const request = childSnapshot.val();
//             if (
//               request.venue === selectedVenue
//             ) {
//               requestsData.push(request);
//             }
//           });
//           setRequests(requestsData);
//         });
//       }
//     };

//     fetchData();
//   }, [database, selectedVenue]);

//   return (
//     // <>
//     <Layout>
//       <Select
//         value={selectedVenue}
//         onChange={(e) => setSelectedVenue(e.target.value)}
//       >
//         <Option value="">Select Report To See</Option>
//         {venues.map((venue) => (
//           <Option key={venue.name} value={venue.name}>
//             {venue.name}
//           </Option>
//         ))}
//       </Select>

//       {requests.map((item, index) => (
//         <OutputWrapper>
//           <Output key={index} className="output">
//             <h2>Club: {item.club}</h2>
//             <p>Title: {item.title}</p>
//             <p>Start Time: {item.start_time}</p>
//             <p>End Time: {item.end_time}</p>
//             <p>Status: {item.status}</p>
//           </Output>
//         </OutputWrapper>
//       ))}
//     </Layout>
//   );
// };
// const OutputWrapper = styled.div`
//   height: 100%;
//   width: 50%;
//   border: 2px solid  #F2A379;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin:100px 253px 100px 480px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
//   transition: box-shadow 0.3s ease; /* Add transition for smooth effect */
//   /* background-color: #F2A379; */
//   &:hover {
//     box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.12);
//   }
// `;
// export default Page;

"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "../config/config";
import Navbar from "../../../components/Navbar";

const Container = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Select = styled.select`
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;

  &:hover,
  &:focus {
    border-color: #555;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 800px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 5px;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

const TableBody = styled.tbody`
background-color: #f5f5f5;
border-bottom-left-radius:15px;
border-bottom-right-radius:15px;
`;
const TableTitle = styled.th`
font-size: 25px;
font-weight: bold;
background-color: blue;
color: white;
text-align: center;
height:50px;
border-top-left-radius:15px;
border-top-right-radius:15px;
`;



const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 10px;
  color:black;
  border: 1px solid #ccc;
`;

const Option = styled.option``;

const Page = () => {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [requests, setRequests] = useState([]);
  const database = getDatabase();

  useEffect(() => {
    const fetchVenues = () => {
      const venuesRef = ref(database, "Venue");
      onValue(venuesRef, (snapshot) => {
        const venuesData = [];
        snapshot.forEach((childSnapshot) => {
          venuesData.push(childSnapshot.val());
        });
        setVenues(venuesData);
      });
    };

    fetchVenues();
  }, [database]);

  useEffect(() => {
    const fetchData = () => {
      if (selectedVenue) {
        const requestsRef = ref(database, "Requests");
        onValue(requestsRef, (snapshot) => {
          const requestsData = [];
          snapshot.forEach((childSnapshot) => {
            const request = childSnapshot.val();
            if (request.venue === selectedVenue) {
              requestsData.push(request);
            }
          });
          setRequests(requestsData);
        });
      }
    };

    fetchData();
  }, [database, selectedVenue]);

  return (
    <>
      <Navbar />
      <Container>
        <Select
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
        >
          <Option value="">Select Venue</Option>
          {venues.map((venue) => (
            <Option key={venue.name} value={venue.name}>
              {venue.name}
            </Option>
          ))}
        </Select>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
              <TableTitle colSpan="6">Venue Report</TableTitle>
              </TableRow>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Club</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.club}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.start_time}</TableCell>
                  <TableCell>{item.end_time}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Page;
