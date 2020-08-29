import { Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { isEmpty, isLoaded, useFirebase } from 'react-redux-firebase';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignIn = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const { auth, profile } = useSelector((state) => state.firebase);

  useEffect(() => {
    if (isEmpty(profile) === false && 'userType' in profile === false) {
      navigate('/auth/register', {
        state: {
          auth: auth,
          profile: profile,
        },
      });
    }
    if (isEmpty(profile) === false && 'userType' in profile === true) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <>
      <Grid container style={{ marginTop: '156px' }}>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {/* <img src={logo} style={{ width: '50%' }} /> */}
        </Grid>

        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '16.3px' }}>
          <Typography variant="subtitle" style={{ textAlign: 'center' }}>
            A reliable and eco-friendly end-to-end waste management platform
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <StyledFirebaseAuth
            uiConfig={{
              signInFlow: 'popup',
              signInSuccessUrl: '/signedIn',
              signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.PhoneAuthProvider.PROVIDER_ID,
              ],
              callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                  firebase.handleRedirectResult(authResult).then(() => {});
                  return false;
                },
              },
            }}
            firebaseAuth={firebase.auth()}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
