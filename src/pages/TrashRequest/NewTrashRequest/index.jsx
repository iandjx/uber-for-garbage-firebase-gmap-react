import * as Yup from 'yup'

import { Button, LinearProgress, MenuItem } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'

import { Client } from '@googlemaps/google-maps-services-js'
import React from 'react'
import { TextField } from 'formik-material-ui'
import { useEffect } from 'react'
import { useFirestoreConnect } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const mapClient = new Client({})

const NewTrashRequest = () => {
  const history = useHistory()
  const { auth } = useSelector(state => state.firebase)
  const { photoUrl } = useSelector(state => state.camera)
  const { uid } = useSelector(state => state.firebase.auth)

  useFirestoreConnect({
    collection: `users/${uid}/requests`,
    where: ['status', 'in', ['pending', 'active']],
    storeAs: 'requests'
  })

  const { requests } = useSelector(state => state.firestore.data)

  const handleSubmit = async event => {
    const { garbageType, weight, location } = event
    const locationRes = await mapClient.geocode({
      params: {
        address: location,
        key: 'AIzaSyD7oshv5NM8XjK0atV7BCRtqzZ3on6Wslo'
      }
    })
    const lat = locationRes.data.results[0].geometry.location.lat
    const lng = locationRes.data.results[0].geometry.location.lng

    const newTrashRequest = {
      garbageType: garbageType,
      weight: weight,
      location: location,
      lat: lat,
      lng: lng,
      requesterId: auth.uid,
      createdAt: `${Date.now()}`,
      photoUrl: photoUrl,
      status: 'pending'
    }
    console.log(newTrashRequest)
    history.push('/disposer/request-confirmation', { ...newTrashRequest })
  }

  useEffect(() => {
    if (requests) {
      if (Object.keys(requests).length > 0) {
        history.push('/disposer/active-request', requests)
      }
    }
  }, [requests])

  return (
    <>
      <Button disabled={photoUrl} onClick={() => history.push('/camera')}>
        Photo
      </Button>
      <Formik
        initialValues={{
          fullName: auth.displayName,
          email: auth.email,
          userType: '',
          phoneNumber: auth.phoneNumber || '',
          address: ''
        }}
        validationSchema={Yup.object({
          weight: Yup.string().required('Weight is required'),
          location: Yup.string().required('Location is required'),
          garbageType: Yup.string()
            .oneOf(
              ['combustible', 'biodegradable', 'recyclable', 'biohazard'],
              'Invalid garbage type'
            )
            .required('Select a garbage type')
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values)
          setSubmitting(false)
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              name='weight'
              type='text'
              label='Weight'
            />
            <br />
            <Field
              component={TextField}
              name='location'
              type='text'
              label='Location'
            />
            <br />

            <Field
              component={TextField}
              type='text'
              name='garbageType'
              label='Garbage Type'
              select
              variant='standard'
              helperText='Please select garbage type'
              margin='normal'
              InputLabelProps={{
                shrink: true
              }}
            >
              <MenuItem key={1} value='biodegradable'>
                Biodegradable
              </MenuItem>
              <MenuItem key={2} value='combustible'>
                Combustible
              </MenuItem>
              <MenuItem key={2} value='recyclable'>
                Recyclable
              </MenuItem>
              <MenuItem key={2} value='biohazard'>
                Biohazard
              </MenuItem>
            </Field>
            {isSubmitting && <LinearProgress />}
            <br />
            <Button
              variant='outlined'
              color='primary'
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Find Eco-Aide
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default NewTrashRequest
