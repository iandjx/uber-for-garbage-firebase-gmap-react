import React, { useEffect } from 'react'
import { isEmpty, isLoaded, useFirebase } from 'react-redux-firebase'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SignIn = () => {
  const navigate = useNavigate()
  const firebase = useFirebase()
  const { auth, profile } = useSelector(state => state.firebase)

  useEffect(() => {
    if (isEmpty(profile) === false && 'userType' in profile === false) {
      navigate('/auth/register', {
        auth: auth,
        profile: profile
      })
    }
    if (isEmpty(profile) === false && 'userType' in profile === true) {
      navigate('/')
    }
  }, [profile])

  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: 'popup',
          signInSuccessUrl: '/signedIn',
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
          ],
          callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
              firebase.handleRedirectResult(authResult).then(() => {})
              return false
            }
          }
        }}
        firebaseAuth={firebase.auth()}
      />
      <div>
        <h2>Auth</h2>
        {!isLoaded(auth) ? (
          <span>Loading...</span>
        ) : isEmpty(auth) ? (
          <span>Not Authed</span>
        ) : (
          <>
            <pre>{JSON.stringify(auth, null, 2)}</pre>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  )
}

export default SignIn
