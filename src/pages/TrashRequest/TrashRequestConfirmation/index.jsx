import { Box, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'

import Map from '../../../common/components/Map'
import { useNavigate } from 'react-router-dom'

const TrashRequestConfirmation = props => {
  const [show, setShow] = useState(false)
  const firestore = useFirestore()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const navigate = useNavigate()

  const {
    lat,
    lng,
    location,
    garbageType,
    weight,
    requesterId,
    createdAt,
    photoUrl,
    status
  } = props.location.state

  const handleCOnfirm = async () => {
    const newTrashRequest = {
      garbageType: garbageType,
      weight: weight,
      location: location,
      lat: lat,
      lng: lng,
      requesterId: requesterId,
      createdAt: createdAt,
      photoUrl: photoUrl,
      status: status
    }
    const response = await firestore.collection('requests').add(newTrashRequest)

    await response.update({
      requestId: response.id
    })
    handleShow()
  }
  return (
    <Box style={{ display: 'grid' }}>
      <Box style={{ gridArea: '1/1', height: '90%' }}>
        {lat ? (
          <Map
            location={{
              address: location,
              lat: lat,
              lng: lng
            }}
            zoomLevel={17}
          />
        ) : (
          <p>no coordinates</p>
        )}
      </Box>
      <Box
        style={{
          gridArea: '1/1',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Button variant='outlined' onClick={handleCOnfirm}>
          Confirm
        </Button>
        <Button variant='outlined' onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </Box>
    </Box>
  )
}

export default TrashRequestConfirmation
