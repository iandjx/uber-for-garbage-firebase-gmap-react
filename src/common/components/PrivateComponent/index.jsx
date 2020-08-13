import { Navigate, Route } from 'react-router-dom'
import { isEmpty, isLoaded } from 'react-redux-firebase'

import React from 'react'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children, ...remainingProps }) => {
  const auth = useSelector(state => state.firebase.auth)
  return (
    <Route
      {...remainingProps}
      render={({ location }) =>
        isLoaded(auth) && !isEmpty(auth) ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: '/auth/sign-in',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
