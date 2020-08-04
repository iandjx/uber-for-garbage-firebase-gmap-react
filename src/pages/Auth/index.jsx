import React from 'react'
import SignIn from './SignIn'
import Register from './Register'
import { Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
const Auth = () => {
  return (
    <Container>
      <Switch>
        <Route exact path='/sign-in' component={SignIn} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </Container>
  )
}

export default Auth
