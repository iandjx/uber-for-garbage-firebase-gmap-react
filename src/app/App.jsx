import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { isEmpty, isLoaded } from 'react-redux-firebase';

import ActiveTrashRequest from '../pages/TrashRequest/ActiveTrashRequest';

import Box from '@material-ui/core/Box';
import Camera from '../common/components/Camera';
import Dashboard from '../pages/Dashboard';

import ImagePreview from '../common/components/Camera/ImagePreview';
import NewTrashRequest from '../pages/TrashRequest/NewTrashRequest';
import OnRoutePickup from '../pages/Collector/OnRoutePickup';
import PrivateRoute from '../common/components/PrivateComponent';

import SignIn from '../pages/Auth/SignIn';
import TrashRequestConfirmation from '../pages/TrashRequest/TrashRequestConfirmation';
import TrashRequestList from '../pages/Collector/TrashRequestList';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

//pages
import TemplatePage from '@Pages/Templates';
import Docs from '@Pages/Templates/docs';
import Disposer from '@Pages/Templates/disposer';
import SignUp from '@Pages/Templates/sign-up';
import Login from '@Pages/Templates/login';

const AppWrapper = styled.div`
  font-family: Montserrat;
  overflow: hidden;
`;

const App = (props) => {
  const navigate = useNavigate();
  const { auth, profile } = useSelector((state) => state.firebase);

  useEffect(() => {
    // if (isEmpty(auth) && isLoaded(auth)) {
    //   navigate('/signin');
    // }
    // if (profile.userType === 'collector' && isLoaded(profile)) {
    //   navigate('/collector/request-list', { state: { uid: auth.uid } });
    // }
    // if (profile.userType === 'household' && isLoaded(profile)) {
    //   navigate('/disposer/new-request');
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

          <Route path="/test" element={<TemplatePage />}>
            <Route path="/" element={<Docs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/disposer" element={<Disposer />} />
          </Route>

          {/* <PrivateRoute path='/collector' element={<TrashRequestList />} /> */}
        </Routes>
      </Box>
    </AppWrapper>
  );
};

export default App;
