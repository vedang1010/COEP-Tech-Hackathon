"use client";
import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { app } from "../config/config";
import Layout from "../../../components/Layout";
import {
  ref,
  set,
  getDatabase,
  orderByChild,
  onValue,
} from "firebase/database";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Select = styled.select`
  width: 50%;
  margin: 4rem auto 1rem 26vw;
  padding: 1rem;
  background-color: #F2A379;
  border: none;
  border-radius: 4px;
  color: #000;
  outline: none;
  font-size: medium;
`;

const Option = styled.option`
  background-color: #EFD5B7;
  color: black;
`;

const Output = styled.output`
  color: white;
  padding: 2rem;
  width: 50%;
  height: 100%;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease; /* Add transition for smooth effect */
  line-height: 1.5;
  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.12);
  }
`;

const Page = () => {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [requests, setRequests] = useState([]);
  const router = useRouter();
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
            if (
              request.status === "accepted" &&
              request.venue === selectedVenue
            ) {
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
    // <>
    <Layout>
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

      {requests.map((item, index) => (
        <OutputWrapper key={index}>
          <Output key={index} className="output">
            <h2>Club: {item.club}</h2>
            <p>Title: {item.title}</p>
            <p>Start Time: {item.start_time}</p>
            <p>End Time: {item.end_time}</p>
            <p>Status: {item.status}</p>
          </Output>
        </OutputWrapper>
      ))}
    </Layout>
  );
};
const OutputWrapper = styled.div`
  height: 100%;
  width: 50%;
  border: 2px solid  #F2A379;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:100px 253px 100px 480px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease; /* Add transition for smooth effect */
  /* background-color: #F2A379; */
  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.12);
  }
`;
export default Page;
