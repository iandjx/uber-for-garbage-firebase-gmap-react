import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import App from './app/App'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import { firebaseConfig } from './config/firebaseConfig'
import store from './app/store'

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
