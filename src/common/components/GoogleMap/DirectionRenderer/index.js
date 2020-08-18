/*global google*/

import React, { useEffect, useRef, useState } from 'react'
const { DirectionsRenderer } = require('react-google-maps')

const DirRenderer = ({
  originLat,
  originLng,
  destinationLat,
  destinationLng
}) => {
  let directionsRef

  const [directions, setDirections] = useState(null)
  const DirectionsService = new google.maps.DirectionsService()
  useEffect(() => {
    DirectionsService.route(
      {
        origin: new google.maps.LatLng(originLat, originLng),
        destination: new google.maps.LatLng(destinationLat, destinationLng),
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
  }, [originLat, originLng])

  return (
    <>
      {directionsRef && console.log(directionsRef)}
      {directions && (
        <DirectionsRenderer
          ref={r => (directionsRef = r)}
          directions={directions}
          onDirectionsChanged={() => directionsRef.getDirections()}
        />
      )}
    </>
  )
}

export default DirRenderer
