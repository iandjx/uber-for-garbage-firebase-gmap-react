import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Modal,
  Typography
} from '@material-ui/core'
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'

import Alert from '@material-ui/lab/Alert'
import DirectionRenderer from '../../../../common/components/GoogleMap/DirectionRenderer'
import Map from '../../../../common/components/GoogleMap'
import { Marker } from 'react-google-maps'
import React from 'react'
import haversine from 'haversine'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePosition } from 'use-position'
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
  const navigate = useNavigate()
  const watch = true
  const { latitude, longitude } = usePosition(watch)
  const [latCoord, setLatCoord] = useState(null)
  const [lngCoord, setLngCoord] = useState(null)
  const [activateButton, setActivateButton] = useState(false)
  useEffect(() => {
    if (latitude !== undefined) {
      setLatCoord(latitude)
      setLngCoord(longitude)
      setActivateButton(true)
    } else {
      setActivateButton(false)
    }
  }, [latitude, longitude])

  const [open, setOpen] = useState(false)
  const firestore = useFirestore()
  const { uid } = useSelector(state => state.firebase.auth)
  const [mapOpen, setMapOpen] = useState(false)
  useFirestoreConnect({
    collection: 'users',
    doc: requesterId,
    storeAs: 'requester'
  })

  const { requester } = useSelector(state => state.firestore.data)

  const toggleMap = () => {
    setMapOpen(!mapOpen)
  }
  const acceptRequest = async () => {
    await firestore
      .collection('requests')
      .doc(requestId)
      .update({
        status: 'active',
        collectorId: uid
      })
  }

  const cancelRequest = async () => {
    await firestore
      .collection('requests')
      .doc(requestId)
      .update({
        status: 'pending',
        collectorId: ''
      })
  }

  const startTrip = async () => {
    await firestore
      .collection('requests')
      .doc(requestId)
      .update({
        status: 'onRoute'
      })
    navigate('/collector/on-route', {
      state: {
        requestId: requestId,
        lat: lat,
        lng: lng
      }
    })
  }

  return (
    <>
      <Card>
        {latCoord === undefined ||
          (latCoord === null && (
            <Alert severity='warning'>Cannot access GPS coordinates</Alert>
          ))}
        {mapOpen && status === 'pending' && latCoord && lngCoord && (
          <Map>
            <Marker position={{ lat: lat, lng: lng }} />
          </Map>
        )}

        {mapOpen && status === 'active' && latCoord && lngCoord && (
          <Map>
            <DirectionRenderer
              originLat={latCoord}
              originLng={lngCoord}
              destinationLat={lat}
              destinationLng={lng}
            />
          </Map>
        )}
        <CardActionArea onClick={toggleMap}>
          <CardContent>
            <Typography>{requester && requester.fullName}</Typography>
            <Typography>{location}</Typography>
            <Typography>{garbageType}</Typography>
            <Typography>{weight}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size='small'
            color='primary'
            disabled={photoUrl === ''}
            // onClick={handleOpen}
          >
            View Photo
          </Button>
          {status === 'pending' ? (
            <Button
              size='small'
              color='primary'
              onClick={acceptRequest}
              disabled={!activateButton}
            >
              Accept
            </Button>
          ) : (
            <>
              <Button size='small' color='primary' onClick={cancelRequest}>
                Cancel
              </Button>
              <Button size='small' color='primary' onClick={startTrip}>
                Start Trip
              </Button>
            </>
          )}
        </CardActions>
      </Card>
      <Modal
        open={open}
        // onClose={handleClose}
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
