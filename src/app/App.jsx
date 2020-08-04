import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Auth from '../pages/Auth'
// import TrashRequestConfirmation from '../pages/disposerTrash/TrashRequestConfirmation'
// import TrashRequestPending from '../pages/disposerTrash/TrashRequestPending'
import TrashRequest from '../pages/TrashRequest'
import PrivateRoute from '../common/components/PrivateComponent'
import Camera from '../common/components/Camera'

const App = () => {
  return (
    // if path is sign in or register do not show header and sidebar
    // <Header></Header>
    // <SideBar></SideBar>
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
  )
}

export default App
