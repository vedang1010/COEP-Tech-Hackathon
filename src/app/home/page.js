"use client"
import React, { useState, useEffect } from 'react';

import { initializeApp } from "firebase/app";
import Layout from '../../../components/Layout'
import Form from '../../../components/Form/page'
import ActForm from '../testform/page';
import { getDatabase, ref, onValue } from "firebase/database";
// import Remarks from '../remark/remark';
import CalendarGfg from '../calender/page';
import Navbar from '../../../components/Navbar';
const home = () => {
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// console.log(displayRequest)
// Your web app's Firebase configuration

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);


// useEffect(() => {
//   console.log("hello")
//   // console.log(database)
//   const rootRef = ref(database, "Venue");
//   onValue(rootRef, (snapshot) => {
//     const venue = snapshot.val();
//     // console.log(venue)
//     // const updatedWebsites = [];

//     for (const userId in venue) {
//       const userData = venue[userId];
//       console.log(userData.id1)
//     }

//     // setWebsites(updatedWebsites);
//   });

// }, [database]);

  return (
    // <>
    <Layout>
    <CalendarGfg/>
    {/* {displayRequest?<CalendarGfg/>: <ActForm/>} */}
    {/* <Remarks /> */}
    </Layout>
    
    // {/* </> */}
  )
}

export default home
