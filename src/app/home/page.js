"use client"
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import Layout from '../../../components/Layout'
import Form from '../../../components/Form/page'

import { getDatabase, ref, onValue } from "firebase/database";

const home = () => {
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh5zZ0XfWN_gOIHLPosmOvWOFGoGJ0xW4",
  authDomain: "venue-booking-c0bba.firebaseapp.com",
  databaseURL: "https://venue-booking-c0bba-default-rtdb.firebaseio.com",
  projectId: "venue-booking-c0bba",
  storageBucket: "venue-booking-c0bba.appspot.com",
  messagingSenderId: "265922949872",
  appId: "1:265922949872:web:9353962bf85f4ca1ad4835",
  databaseURL: "https://venue-booking-c0bba-default-rtdb.firebaseio.com/"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


useEffect(() => {
  console.log("hello")
  // console.log(database)
  const rootRef = ref(database, "Venue");
  onValue(rootRef, (snapshot) => {
    const venue = snapshot.val();
    // console.log(venue)
    // const updatedWebsites = [];

    for (const userId in venue) {
      const userData = venue[userId];
      console.log(userData.id1)
    }

    // setWebsites(updatedWebsites);
  });

}, [database]);

  return (
    // <>
    <Layout>
    hbbhhjferggr
    <Form></Form>
    </Layout>
    // {/* </> */}
  )
}

export default home
