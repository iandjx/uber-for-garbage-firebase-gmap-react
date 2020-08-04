import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import counterReducer from './counterSlice'
export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  counter: counterReducer
})
