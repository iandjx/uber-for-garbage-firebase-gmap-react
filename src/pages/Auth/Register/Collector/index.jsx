import * as Yup from 'yup'

import { Button, LinearProgress, MenuItem } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { TextField, fieldToTextField } from 'formik-material-ui'

import MuiTextField from '@material-ui/core/TextField'
import React from 'react'
import { useFirebase } from 'react-redux-firebase'

const phoneRegExp = /^\+[1-9]{1}[0-9]{3,14}$/

function UpperCasingTextField (props) {
  const {
    form: { setFieldValue },
    field: { name }
  } = props
  const onChange = React.useCallback(
    event => {
      const { value } = event.target
      setFieldValue(name, value ? value.toUpperCase() : '')
    },
    [setFieldValue, name]
  )
  return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />
}

const Collector = ({ displayName, phoneNumber, email, providerId }) => {
  const firebase = useFirebase()

  const updateCollectorProfile = async ({
    fullName,
    email,
    phoneNumber,
    address,
    employerName,
    companyAddress,
    companyPhoneNumber,
    emergencyNumber
  }) => {
    console.log('123kj')
    return await firebase.updateProfile({
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      userType: 'collector',
      employerName: employerName,
      companyAddress: companyAddress,
      companyPhoneNumber: companyPhoneNumber,
      emergencyNumber: emergencyNumber
    })
  }

  const collectorSchema = Yup.object({
    fullName: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    employerName: Yup.string().required('Required'),
    companyAddress: Yup.string(),
    companyPhoneNumber: Yup.string(),
    emergencyNumber: Yup.string(),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    userType: Yup.string()
      .oneOf(['eco-aide', 'truckDriver'], 'Invalid Job Type')
      .required('Select a user category')
  })

  const collectorSchema2 = Yup.object({
    fullName: Yup.string().required(),
    address: Yup.string(),
    employerName: Yup.string().required(),
    companyAddress: Yup.string(),
    companyPhoneNumber: Yup.string(),
    emergencyNumber: Yup.string(),
    email: Yup.string().required(),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required(),
    userType: Yup.string()
      .oneOf(['eco-aide', 'truckDriver'], 'Invalid Job Type')
      .required()
  })

  return (
    <>
      <Formik
        initialValues={{
          fullName: displayName,
          email: email,
          userType: '',
          phoneNumber: phoneNumber,
          address: '',
          employerName: '',
          companyAddress: '',
          companyPhoneNumber: '',
          emergencyNumber: ''
        }}
        validationSchema={collectorSchema2}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false)
          updateCollectorProfile(values)
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Field
              component={UpperCasingTextField}
              name='fullName'
              type='text'
              label='Full Name'
              disabled={providerId !== 'phone'}
            />
            <br />
            <Field
              component={UpperCasingTextField}
              name='address'
              type='text'
              label='Address'
            />
            <br />
            <Field
              component={UpperCasingTextField}
              name='email'
              type='email'
              label='Email'
              disabled={providerId !== 'phone'}
            />
            <br />
            <Field
              component={TextField}
              name='phoneNumber'
              type='text'
              label='Phone Number'
              disabled={providerId === 'phone'}
            />
            <br />
            <Field
              component={TextField}
              type='text'
              name='userType'
              label='With Select'
              select
              variant='standard'
              helperText='Please select user category'
              margin='normal'
              InputLabelProps={{
                shrink: true
              }}
            >
              <MenuItem key={1} value='eco-aide'>
                Eco-aide
              </MenuItem>
              <MenuItem key={2} value='truckDriver'>
                Truck Driver
              </MenuItem>
            </Field>
            <br />
            <Field
              component={UpperCasingTextField}
              name='employerName'
              type='text'
              label='Employer Name'
            />
            <br />
            <Field
              component={UpperCasingTextField}
              name='companyAddress'
              type='text'
              label='Company Address'
            />
            <br />
            <Field
              component={UpperCasingTextField}
              name='companyPhoneNumber'
              type='text'
              label='Company Phone Number'
            />
            <br />
            <Field
              component={UpperCasingTextField}
              name='emergencyNumber'
              type='text'
              label='Emergency Contact No.'
            />
            <br />
            {isSubmitting && <LinearProgress />}
            <br />
            <Button
              variant='outlined'
              color='primary'
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Collector
