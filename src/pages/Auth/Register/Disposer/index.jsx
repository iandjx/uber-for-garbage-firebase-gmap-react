import * as Yup from 'yup'

import { Box, Button, LinearProgress, MenuItem } from '@material-ui/core'
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

const Disposer = ({ displayName, phoneNumber, email, providerId }) => {
  const firebase = useFirebase()

  const updateUserprofile = async ({
    fullName,
    email,
    phoneNumber,
    userType,
    address
  }) => {
    return await firebase.updateProfile({
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      userType: userType,
      address: address
    })
  }

  const disposerSchema = Yup.object({
    fullName: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    userType: Yup.string()
      .oneOf(['household', 'business'], 'Invalid Job Type')
      .required('Select a user category')
  })

  return (
    <>
      <Formik
        initialValues={{
          fullName: displayName,
          email: email,
          phoneNumber: phoneNumber,
          address: '',
          userType: ''
        }}
        validationSchema={disposerSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false)
          updateUserprofile(values)
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
            <Box margin={1}>
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
                <MenuItem key={1} value='household'>
                  Household
                </MenuItem>
                <MenuItem key={2} value='business'>
                  Business
                </MenuItem>
              </Field>
            </Box>
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

export default Disposer
