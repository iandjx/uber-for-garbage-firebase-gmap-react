import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Auth from '../pages/Auth'
// import TrashRequestConfirmation from '../pages/disposerTrash/TrashRequestConfirmation'
// import TrashRequestPending from '../pages/disposerTrash/TrashRequestPending'
import TrashRequest from '../pages/TrashRequest'
import PrivateRoute from '../common/components/PrivateComponent'
import Camera from '../common/components/Camera'
import Register from '../pages/Auth/Register'
import Box from '@material-ui/core/Box'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemIcon,
  Container,
  Typography
} from '@material-ui/core'
import Header from '../common/components/Header'
import { makeStyles } from '@material-ui/core/styles'

import SideBar from '../common/components/SideBar'
const useStyles = makeStyles(theme => ({
  drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))

const App = () => {
  const classes = useStyles()
  const [drawer, setDrawer] = useState(false)
  return (
    // if path is sign in or register do not show header and sidebar
    // <Header></Header>
    // <SideBar></SideBar>
    <Box display='flex'>
      <Header setDrawer={setDrawer} drawer={drawer} />
      <SideBar drawer={drawer} setDrawer={setDrawer} />
      {/* <Drawer
        style={{ width: '220px' }}
        anchor='left'
        open={drawer}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ onBackdropClick: () => setDrawer(false) }}
      >
        <List>
          <ListItem button>
            <ListItemText primary='Home' />
          </ListItem>

          <ListItem button>
            <ListItemText primary='About' />
          </ListItem>
        </List>
      </Drawer>
      */}

      <Router>
        <Switch>
          {/* <PrivateRoute exact path='/' component={TrashRequest} /> */}
          {/* <PrivateRoute exact path='/request' component={DashboardComponent} /> */}
          <Route exact path='/sign-in' component={Auth} />
          <Route exact path='/register' component={Auth} />
          {/* <PrivateRoute exact path='/camera' component={ReactCamera} /> */}
          {/* <PrivateRoute
          exact
         path='/confirm-request'
          component={TrashRequestConfirmation}
        />
        <Route exact path='/pending-request' component={TrashRequestPending} /> */}
        </Switch>
      </Router>
    </Box>
  )
}

export default App
