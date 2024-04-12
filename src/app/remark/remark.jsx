'use-client'
import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyDh-XMeKlU0VNZwauz5rfnymjmU6OlWLgE",
    authDomain: "decentralized-web.firebaseapp.com",
    projectId: "decentralized-web",
    storageBucket: "decentralized-web.appspot.com",
    messagingSenderId: "141940405499",
    appId: "1:141940405499:web:d2d6e9e0e3c85cb9342c5e",
    databaseURL: "https://decentralized-web-default-rtdb.firebaseio.com/",
  };
  
  initializeApp(firebaseConfig);
//   firebase.analytics();

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  const Remarks = ({ currentUser, club }) => {
    const [remarks, setRemarks] = useState([]);
    const [newRemark, setNewRemark] = useState('');

    useEffect(() => {
        // Function to fetch remarks from Firebase
        const fetchRemarks = async () => {
            try {
                // Reference to the "Remark" node in Firebase
                const remarkRef = firebase.database().ref('Remark');

                // Fetch remarks from Firebase
                const snapshot = await remarkRef.once('value');
                const remarksData = snapshot.val();

                // Convert remarksData to an array of remarks
                if (remarksData) {
                    const remarksArray = Object.keys(remarksData).map(key => ({
                        id: key,
                        ...remarksData[key]
                    }));
                    setRemarks(remarksArray);
                }
            } catch (error) {
                console.error('Error fetching remarks:', error);
            }
        };

        // Call the fetchRemarks function
        fetchRemarks();

        // Clean up function to remove Firebase listener
        return () => {
            // Optionally, you can remove the listener here if needed
        };
    }, []);

    const handleNewRemarkChange = (event) => {
        setNewRemark(event.target.value);
    };

    const handleCreateRemark = async () => {
        try {
            if (newRemark.trim() === '') {
                return; // Don't create empty remarks
            }

            // Reference to the "Remark" node in Firebase
            const remarkRef = firebase.database().ref('Remark');

            // Push a new remark to the Firebase database
            await remarkRef.push({
                message: newRemark,
                senderId: currentUser.uid,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });

            // Clear the input field after creating the remark
            setNewRemark('');
        } catch (error) {
            console.error('Error creating remark:', error);
        }
    };

    return (
        <div>
            <h2>Remarks</h2>
            <ul>
                {remarks.map(remark => (
                    <li key={remark.id}>
                        <strong>{remark.senderId}: </strong>
                        {remark.message}
                    </li>
                ))}
            </ul>
            <div>
                <textarea value={newRemark} onChange={handleNewRemarkChange} />
                <button onClick={handleCreateRemark}>Send Remark</button>
            </div>
        </div>
    );
};

export default Remarks;



// remarks.jsx
// 'use-client'
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// import firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/storage';
// import 'firebase/database';
// import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//   apiKey: "AIzaSyDh-XMeKlU0VNZwauz5rfnymjmU6OlWLgE",
//   authDomain: "decentralized-web.firebaseapp.com",
//   projectId: "decentralized-web",
//   storageBucket: "decentralized-web.appspot.com",
//   messagingSenderId: "141940405499",
//   appId: "1:141940405499:web:d2d6e9e0e3c85cb9342c5e",
//   databaseURL: "https://decentralized-web-default-rtdb.firebaseio.com/",
// };

// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const Remarks = () => {
//   const [newRemark, setNewRemark] = useState('');
//   const router = useRouter();

//   // Check if the route is '/remark'
//   const isRemarkRoute = router.pathname === '/remark';

//   // Handle change in the textarea
//   const handleNewRemarkChange = (event) => {
//     setNewRemark(event.target.value);
//   };


//   // Render the textarea only if the route is '/remark'
//   return (
//     <div>
//       {isRemarkRoute && (
//         <div>
//           <h2>Add Remark</h2>
//           <textarea value={newRemark} onChange={handleNewRemarkChange} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Remarks;
