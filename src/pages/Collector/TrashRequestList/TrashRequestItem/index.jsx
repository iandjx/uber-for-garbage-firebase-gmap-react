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
import Map from '../../../../common/components/GoogleMap'
import React from 'react'
import haversine from 'haversine'
import { useEffect } from 'react'
import { usePosition } from 'use-position'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { withScriptjs } from 'react-google-maps'

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
  const watch = true
  const { latitude, longitude } = usePosition(true)
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
  const MapLoader = withScriptjs(Map)
  useFirestoreConnect({
    collection: 'users',
    doc: requesterId,
    storeAs: 'requester'
  })

  const { requester } = useSelector(state => state.firestore.data)

  const toggleMap = () => {
    setMapOpen(!mapOpen)
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
        {latCoord === undefined ||
          (latCoord === null && (
            <Alert severity='warning'>Cannot access GPS coordinates</Alert>
          ))}
        {mapOpen && status === 'pending' && latCoord && lngCoord && (
          <MapLoader
            googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCgByDvfp019eGSE-aUPBAbePU7e0MI0WU'
            loadingElement={<div style={{ height: `100%` }} />}
            // origina={{ lat: 40.756795, lng: -73.954298 }}
            // destinationa={{ lat: 41.756795, lng: -78.954298 }}
            isMarkerOnly={true}
            defaultLocation={{ lat: latCoord, lng: lngCoord }}
            userLocation={{ lat: latCoord, lng: lngCoord }}
            markerLocation={{ lat: lat, lng: lng }}
          />
        )}

        {mapOpen && status === 'active' && latCoord && lngCoord && (
          <MapLoader
            googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCgByDvfp019eGSE-aUPBAbePU7e0MI0WU'
            loadingElement={<div style={{ height: `100%` }} />}
            origina={{ lat: latCoord, lng: lngCoord }}
            destinationa={{ lat: lat, lng: lng }}
            isMarkerOnly={false}
            defaultLocation={{ lat: latCoord, lng: lngCoord }}
            userLocation={{ lat: latCoord, lng: lngCoord }}
            // markerLocation={{ lat: lat, lng: lng }}
          />
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
            <Button size='small' color='primary' onClick={cancelRequest}>
              Cancel
            </Button>
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
