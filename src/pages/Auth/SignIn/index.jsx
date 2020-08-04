import React from 'react'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import { Typography, Grid, Box } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const SignIn = () => {
  const firebase = useFirebase()
  const auth = useSelector(state => state.firebase.auth)

  const loginWithGoogle = () => {
    return firebase.login({ provider: 'google', type: 'popup' })
  }

  const loginWithFacebook = () => {
    return firebase.login({ provider: 'facebook', type: 'popup' })
  }

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
              firebase.handleRedirectResult(authResult).then(() => {
                // history.push(redirectUrl); if you use react router to redirect
              })
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
          <pre>{JSON.stringify(auth, null, 2)}</pre>
        )}
      </div>
    </div>
    // <Grid
    //   container
    //   direction='column'
    //   justify='center'
    //   alignItems='center'
    //   xs='12'
    // >
    //   <Typography variant='h2'>Sign In</Typography>

    //   {!isLoaded(auth) ? (
    //     <span>Loading...</span>
    //   ) : isEmpty(auth) ? (
    //     <>
    //       <Box m={2}>
    //         <Button
    //           onClick={loginWithGoogle}
    //           variant='outlined'
    //           color='primary'
    //           size='large'
    //         >
    //           Login With Google
    //         </Button>
    //       </Box>
    //       <Box m={2}>
    //         <Button
    //           m={100}
    //           onClick={loginWithFacebook}
    //           variant='outlined'
    //           color='primary'
    //           size='large'
    //         >
    //           Login With Facebook
    //         </Button>
    //       </Box>
    //     </>
    //   ) : (
    //     <Redirect to='/' />
    //   )}
    // </Grid>
  )
}

export default SignIn
