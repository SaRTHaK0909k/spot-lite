<template>
  <div style="background-color: lightblue; font-family: monospace;">
    <div id="screenshot-container" style="display: flex; justify-content: center; padding-top: 38vh;">
      <button @click="captureScreenshot">Capture Screenshot</button>
    </div>
    <div style="display: flex; justify-content: center; height: 20vh;">
      <h1>Open the console (dev tools), to check the upload status</h1>
    </div>
    <div style="display: flex; flex-direction: row; justify-content: center;">
      <div><img width="200px" src="1.jpg"></div>
      <div><img width="200px" src="2.jpg"></div>
      <div><img width="160px" src="3.jpg"></div>
    </div>
  </div>
</template>

<script setup>
import html2canvas from 'html2canvas';
import axios from 'axios';
import { ref } from 'vue'; // Import ref only once

import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore'; // You don't need to import onSnapshot, query, or orderBy here
import db from './db';

const screenshotContainer = ref(null);
const screenshotSrc = ref('');

// Define the dataURLtoBlob function
function dataURLtoBlob(dataURL) {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}

const captureScreenshot = async () => {
  try {
    // Capture the entire document (webpage)
    const canvas = await html2canvas(document.documentElement);
    const imageDataURL = canvas.toDataURL('image/png');

    const blob = dataURLtoBlob(imageDataURL);
    const storage = getStorage(); 
    const fileName = `Screenshots/${Date.now()}.png`
    const storageReference = storageRef(storage, fileName);

    await uploadBytes(storageReference, blob);
    console.log('Screenshot uploaded successfully');
    
    // SAMARTH'S ADDITION START
    
    const response = await axios.post('http://localhost:8000/process_data', { data: fileName });

    // Log the response from the FastAPI backend
    console.log('Response from FastAPI:', response.data);

    const celebIdsArray = response.data.celebIds; // Access the array using the key "celebIds"

    celebIdsArray.forEach((id) => {
      console.log(id);
    });

    // SAMARTH'S ADDITION END

    // Set the src for the captured image
    screenshotSrc.value = imageDataURL;
    
    // Append the screenshot URL to Firebase Firestore
    const screenshotsCollection = collection(db, 'screenshots');
    await addDoc(screenshotsCollection, {
      url: storageReference.fullPath, // Store the Firebase Storage URL
      createdAt: new Date(),
    });
    console.log('Screenshot URL added to Firestore');
    
  } 
  catch (error) {
    console.error('Failed to capture, upload, and append screenshot:', error);
  }
};


</script>

<style scoped>
#screenshot-container {
  position: relative;
  border: 1px solid #ccc;
}

#screenshot-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
