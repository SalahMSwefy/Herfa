// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyBA7gyhzjs9pG2-yIMWaO1hUYrHlWZn5Xk',
    authDomain: 'linear-scooter.firebaseapp.com',
    projectId: 'linear-scooter',
    storageBucket: 'linear-scooter.firebasestorage.app',
    messagingSenderId: '628492605890',
    appId: '1:628492605890:web:194aa2b1b353f960479e5b',
    measurementId: 'G-GQ44WGR75R',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth, RecaptchaVerifier, signInWithPhoneNumber }
