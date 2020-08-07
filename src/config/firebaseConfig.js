import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import { createFirestoreInstance } from 'redux-firestore'
import firebase from 'firebase/app'
import store from '../app/store'

const firebaseConfig = {
  apiKey: 'AIzaSyCfUpvSorVy6ldf1JIvo5WYsmwWCHRwbNQ',
  authDomain: 'wayste-app-d0766.firebaseapp.com',
  databaseURL: 'https://wayste-app-d0766.firebaseio.com',
  projectId: 'wayste-app-d0766',
  storageBucket: 'wayste-app-d0766.appspot.com',
  messagingSenderId: '385492571791',
  appId: '1:385492571791:web:6f5d52d806a50bc5fc42fa',
  measurementId: 'G-5R71QMY2ES'
}

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

export const storage = firebase.storage()
