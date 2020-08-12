import { Button, Grid } from '@material-ui/core'
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate
} from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import ActiveTrashRequest from '../pages/TrashRequest/ActiveTrashRequest'
import Auth from '../pages/Auth'
import Box from '@material-ui/core/Box'
import Camera from '../common/components/Camera'
import Header from '../common/components/Header'
import ImagePreview from '../common/components/Camera/ImagePreview'
import NewTrashRequest from '../pages/TrashRequest/NewTrashRequest'
import PrivateRoute from '../common/components/PrivateComponent'
import Register from '../pages/Auth/Register'
import SideBar from '../common/components/SideBar'
import SignIn from '../pages/Auth/SignIn'
import TrashRequest from '../pages/TrashRequest'
import TrashRequestConfirmation from '../pages/TrashRequest/TrashRequestConfirmation'
import TrashRequestList from '../pages/Collector/TrashRequestList'
import { isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

const App = () => {
  const navigate = useNavigate()
  const { auth, profile } = useSelector(state => state.firebase)

  const [drawer, setDrawer] = useState(false)

  useEffect(() => {
    if (isEmpty(auth)) {
      navigate('/signin')
    }

    if (profile.userType === 'collector') {
      navigate('/collector', { uid: auth.uid })
    }
  }, [auth, profile])

  function DashBoard () {
    return (
      <>
        <Grid container justify='center' alignItems='center'>
          <SideBar drawer={drawer} setDrawer={setDrawer} />
          <Grid item xs={12}>
            <Header setDrawer={setDrawer} drawer={drawer} />
          </Grid>
          <Grid item xs={12}>
            <Outlet />
          </Grid>
        </Grid>
      </>
    )
  }

  return (
    <Box display='flex'>
      <Button onClick={() => navigate('/collector')}>signin</Button>
      <Routes>
        <Route path='/disposer' element={<DashBoard />}>
          <PrivateRoute path='/new-request' element={<NewTrashRequest />} />
          <PrivateRoute
            path='request-confirmation'
            element={<TrashRequestConfirmation />}
          />
          <PrivateRoute
            path='/active-request'
            element={<ActiveTrashRequest />}
          />
          <PrivateRoute path='/camera' element={<Camera />} />
          <PrivateRoute path='/image-preview' element={<ImagePreview />} />
        </Route>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/collector' element={<TrashRequestList />} />
      </Routes>
    </Box>
  )
}

export default App
