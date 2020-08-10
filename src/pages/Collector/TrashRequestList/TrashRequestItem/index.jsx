import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography
} from '@material-ui/core'
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'

import React from 'react'
import haversine from 'haversine'
import usePosition from 'use-position'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const TrashRequestItem = ({
  createdAt,
  garbageType,
  lat,
  lng,
  location,
  photoUrl,
  requesterId,
  status,
  weight,
  requestId
}) => {
  const [open, setOpen] = useState(false)
  const firestore = useFirestore()
  const { uid } = useSelector(state => state.firebase.auth)

  useFirestoreConnect({
    collection: 'users',
    doc: requesterId,
    storeAs: 'requester'
  })

  const { requester } = useSelector(state => state.firestore.data)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const acceptRequest = () => {
    firestore
      .collection('requests')
      .doc(requestId)
      .update({
        status: 'active',
        collectorId: uid
      })
  }

  const cancelRequest = () => {
    firestore
      .collection('requests')
      .doc(requestId)
      .update({
        status: 'pending',
        collectorId: ''
      })
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography>{requester && requester.fullName}</Typography>
          <Typography>{location}</Typography>
          <Typography>{garbageType}</Typography>
          <Typography>{weight}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            color='primary'
            disabled={photoUrl === ''}
            onClick={handleOpen}
          >
            View Photo
          </Button>
          {status === 'pending' ? (
            <Button size='small' color='primary' onClick={acceptRequest}>
              Accept
            </Button>
          ) : (
            <Button size='small' color='primary' onClick={cancelRequest}>
              Cancel
            </Button>
          )}
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Box>
          <img src={photoUrl} alt='new' />
        </Box>
      </Modal>
    </>
  )
}

export default TrashRequestItem
