/*global google*/
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'
import React, { Component, useEffect, useState } from 'react'

const Map = ({
  origina,
  destinationa,
  isMarkerOnly,
  markerLocation,
  userLocation
}) => {
  const [directions, setDirections] = useState(null)

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService()

    const origin = origina
    const destination = destinationa

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result)
        } else {
          console.error(`error fetching directions ${result}`)
        }
      }
    )
  }, [])

  const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap defaultCenter={userLocation} defaultZoom={13}>
      {isMarkerOnly ? (
        <Marker position={markerLocation} />
      ) : (
        <DirectionsRenderer directions={directions} />
      )}
    </GoogleMap>
  ))

  return (
    <div>
      <GoogleMapExample
        containerElement={<div style={{ height: `500px`, width: '500px' }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  )
}

export default Map
