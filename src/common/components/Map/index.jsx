import './map.css'

import GoogleMapReact from 'google-map-react'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import React from 'react'

const LocationPin = ({ lat, lng, text }) => (
  <div className='pin'>
    <LocationOnIcon />
    <p className='pin-text'>{text}</p>
  </div>
)

const key = 'AIzaSyCgByDvfp019eGSE-aUPBAbePU7e0MI0WU'
const fakeKey = 'AIzaSyCgByDvfp019eGSE-aUPBAbePU7e0MI0WUss'
const Map = ({ location, zoomLevel }) => (
  <div className='map'>
    <div className='google-map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: fakeKey }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
        // distanceToMouse={() => {}}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  </div>
)

export default Map
