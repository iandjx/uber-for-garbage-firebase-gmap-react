import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@material-ui/core'
import Map from '../../../common/components/GoogleMap'
import { useFirestore } from 'react-redux-firebase'
import { usePosition } from 'use-position'
import { withScriptjs } from 'react-google-maps'

const OnRoutePickup = props => {
  const { state } = useLocation()
  const { lat, lng, requestId } = state

  const watch = true
  const navigate = useNavigate()
  const firestore = useFirestore()

  const { latitude, longitude } = usePosition(watch)
  const [latCoord, setLatCoord] = useState(null)
  const [lngCoord, setLngCoord] = useState(null)
  const MapLoader = withScriptjs(Map)

  useEffect(() => {
    if (latitude !== undefined) {
      setLatCoord(latitude)
      setLngCoord(longitude)
    }
  }, [latitude, longitude])

  useEffect(() => {
    const updateLocation = setInterval(async () => {
      await firestore
        .collection('requests')
        .doc(requestId)
        .update({
          collectorLat: latCoord,
          collectorLng: lngCoord
        })
    }, 2000)
    // updateLocation()

    return () => clearInterval(updateLocation)
  }, [latCoord, lngCoord])

  const cancelRequest = async () => {
    await firestore
      .collection('requests')
      .doc(requestId)
      .update({
        status: 'pending',
        collectorId: ''
      })
    navigate(-1)
  }

  const requestComplete = async () => {
    await firestore
      .collection('requests')
      .doc(requestId)
      .update({
        status: 'complete'
      })
    navigate('/home')
  }

  return (
    <div>
      {console.log(state)}

      {latCoord && (
        <MapLoader
          googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCgByDvfp019eGSE-aUPBAbePU7e0MI0WU'
          loadingElement={<div style={{ height: '100%' }} />}
          origina={{ lat: latCoord, lng: lngCoord }}
          destinationa={{ lat: lat, lng: lng }}
          isMarkerOnly={false}
          defaultLocation={{ lat: latCoord, lng: lngCoord }}
          userLocation={{ lat: latCoord, lng: lngCoord }}
        />
      )}
      <Button onClick={cancelRequest}>Cancel Trash Request</Button>
      <Button onClick={requestComplete}>Trash Picked-Up</Button>
    </div>
  )
}

export default OnRoutePickup
