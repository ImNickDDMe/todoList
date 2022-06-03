import { initializeApp } from 'firebase/app'
import { 
    getFirestore, 
    collection 
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export const app = initializeApp({
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId: "APP_ID",
    measurementId: "MEASUREMENT_ID"
})

export const db = getFirestore(app)

export const auth = getAuth(app)

export const ongoingTodosRef = collection(db, 'ongoingTodos')

export const completedTodosRef = collection(db, 'completedTodos')