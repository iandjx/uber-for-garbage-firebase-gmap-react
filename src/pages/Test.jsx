import Map from '../common/components/GoogleMap'
import React from 'react'
import { withScriptjs } from 'react-google-maps'
const Test = () => {
  const MapLoader = withScriptjs(Map)

  return (
    <div>
      <MapLoader
        googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCgByDvfp019eGSE-aUPBAbePU7e0MI0WU'
        loadingElement={<div style={{ height: `100%` }} />}
        origina={{ lat: 40.756795, lng: -73.954298 }}
        destinationa={{ lat: 41.756795, lng: -78.954298 }}
        isMarkerOnly={false}
        defaultLocation={{ lat: 40.756795, lng: -73.954298 }}
        userLocation={{ lat: 40.756795, lng: -73.954298 }}
      />
    </div>
  )
}

export default Test
