// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBf_FvouHOZzW2j1l1NveMv1LIslt-gtyk',
	authDomain: 'house-marketplace-ff6e8.firebaseapp.com',
	projectId: 'house-marketplace-ff6e8',
	storageBucket: 'house-marketplace-ff6e8.firebasestorage.app',
	messagingSenderId: '980599843411',
	appId: '1:980599843411:web:9ec93796ee4a170a51f4a6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
