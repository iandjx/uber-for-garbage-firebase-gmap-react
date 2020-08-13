import * as yup from 'yup'

import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import Collector from './Collector'
import Disposer from './Disposer'
import { isEmpty } from 'react-redux-firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Register = props => {
  const navigate = useNavigate()
  const { profile } = useSelector(state => state.firebase)
  const { displayName = '', phoneNumber = '+63' } = props.location.state.auth
  const { email = '' } = props.location.state.profile
  const { providerId } = props.location.state.auth.providerData[0]

  const [userCategory, setCategory] = useState('')

  useEffect(() => {
    if (isEmpty(profile) === false && 'userType' in profile === true) {
      navigate('/')
    }
  }, [profile])

  return (
    <>
      <FormControl required>
        <InputLabel htmlFor='user-category-required'>User Category</InputLabel>
        <Select
          id='userRegistryType'
          value={userCategory}
          onChange={event => setCategory(event.target.value)}
          name='userCategory'
          inputProps={{
            id: 'user-category-required'
          }}
        >
          <MenuItem value='disposer'>Disposer</MenuItem>
          <MenuItem value='collector'>Collector</MenuItem>
        </Select>
      </FormControl>
      {userCategory === 'disposer' ? (
        <Disposer
          displayName={displayName}
          phoneNumber={phoneNumber}
          email={email}
          providerId={providerId}
        />
      ) : userCategory === 'collector' ? (
        <Collector
          displayName={displayName}
          phoneNumber={phoneNumber}
          email={email}
          providerId={providerId}
        />
      ) : null}
    </>
  )
}
export default Register
