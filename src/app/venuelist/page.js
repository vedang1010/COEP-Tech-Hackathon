"use client";
import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { app } from "../config/config";
import { ref, set, getDatabase, orderByChild, onValue } from "firebase/database";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background-color: #444;
  border: none;
  border-radius: 4px;
  color: #fff;
  outline: none;
`;

const Option = styled.option`
  background-color: #444;
  color: #fff;
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
            if (request.status === 'accepted' && request.venue === selectedVenue) {
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
        <div key={index}>
          <h2>Club: {item.club}</h2>
          <p>Title: {item.title}</p>
          <p>Start Time: {item.start_time}</p>
          <p>End Time: {item.end_time}</p>
          <p>Status: {item.status}</p>
        </div>
      ))}
    </>
  );
};

export default Page;
