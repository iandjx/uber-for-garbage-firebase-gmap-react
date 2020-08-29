import { Button, Grid } from '@material-ui/core';
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { isEmpty, isLoaded } from 'react-redux-firebase';

import ActiveTrashRequest from '../pages/TrashRequest/ActiveTrashRequest';
import Auth from '../pages/Auth';
import Box from '@material-ui/core/Box';
import Camera from '../common/components/Camera';
import Dashboard from '../pages/Dashboard';
import Header from '../common/components/Header';
import ImagePreview from '../common/components/Camera/ImagePreview';
import NewTrashRequest from '../pages/TrashRequest/NewTrashRequest';
import OnRoutePickup from '../pages/Collector/OnRoutePickup';
import PrivateRoute from '../common/components/PrivateComponent';
import Register from '../pages/Auth/Register';
import SideBar from '../common/components/SideBar';
import SignIn from '../pages/Auth/SignIn';
import Test from '../pages/Test';
import TrashRequest from '../pages/TrashRequest';
import TrashRequestConfirmation from '../pages/TrashRequest/TrashRequestConfirmation';
import TrashRequestList from '../pages/Collector/TrashRequestList';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const AppWrapper = styled.div`
  font-family: Montserrat;
  overflow: hidden;
`;

const App = (props) => {
  const navigate = useNavigate();
  const { auth, profile } = useSelector((state) => state.firebase);

  useEffect(() => {
    if (isEmpty(auth) && isLoaded(auth)) {
      navigate('/signin');
    }
    if (profile.userType === 'collector' && isLoaded(profile)) {
      navigate('/collector/request-list', { state: { uid: auth.uid } });
    }
    if (profile.userType === 'household' && isLoaded(profile)) {
      navigate('/disposer/new-request');
    }
  }, [auth, profile]);

  return (
    <AppWrapper>
      <Box display="flex">
        <Routes>
          <Route path="/disposer" element={<Dashboard />}>
            <PrivateRoute path="/new-request" element={<NewTrashRequest />} />
            <PrivateRoute
              path="request-confirmation"
              element={<TrashRequestConfirmation />}
            />
            <PrivateRoute
              path="/active-request"
              element={<ActiveTrashRequest />}
            />
            <PrivateRoute path="/camera" element={<Camera />} />
            <PrivateRoute path="/image-preview" element={<ImagePreview />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/collector" element={<Dashboard />}>
            <PrivateRoute path="/request-list" element={<TrashRequestList />} />
            <PrivateRoute path="/on-route" element={<OnRoutePickup />} />
          </Route>
          {/* <PrivateRoute path='/collector' element={<TrashRequestList />} /> */}
        </Routes>
      </Box>
    </AppWrapper>
  );
};

export default App;
