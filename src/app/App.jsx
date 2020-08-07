import React, { useEffect, useState } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory
} from 'react-router-dom'

import Auth from '../pages/Auth'
import Box from '@material-ui/core/Box'
import Camera from '../common/components/Camera'
import Header from '../common/components/Header'
import NewTrashRequest from '../pages/TrashRequest/NewTrashRequest'
import PrivateRoute from '../common/components/PrivateComponent'
import Register from '../pages/Auth/Register'
import SideBar from '../common/components/SideBar'
import SignIn from '../pages/Auth/SignIn'
import TrashRequest from '../pages/TrashRequest'
import TrashRequestConfirmation from '../pages/TrashRequest/TrashRequestConfirmation'
import { isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

const App = () => {
  const history = useHistory()
  const { auth } = useSelector(state => state.firebase)

  const [drawer, setDrawer] = useState(false)

  useEffect(() => {
    if (auth.uid === null) {
      history.push('/sign-in')
    }
  }, [auth])

  return (
    <Box display='flex'>
      <Router>
        <Switch>
          <Route
            path=''
            render={({ match: { url } }) => (
              <>
                <Header setDrawer={setDrawer} drawer={drawer} />
                <SideBar drawer={drawer} setDrawer={setDrawer} />
                <PrivateRoute
                  path={`${url}new-request`}
                  component={NewTrashRequest}
                />
                <PrivateRoute
                  path={`${url}request-confirmation`}
                  component={TrashRequestConfirmation}
                />
              </>
            )}
          />

          <Route
            path='/auth'
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/sign-in`} component={SignIn} />
                <Route path={`${url}/register`} component={Register} />
              </>
            )}
          />
        </Switch>
      </Router>
    </Box>
  )
}

export default App
