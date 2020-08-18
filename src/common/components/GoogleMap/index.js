/*global google*/
import React from 'react'
const { compose, withProps, lifecycle } = require('recompose')
const { withScriptjs, withGoogleMap, GoogleMap } = require('react-google-maps')

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCgByDvfp019eGSE-aUPBAbePU7e0MI0WU&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({})
)(({ children }) => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(14.412787, 121.042816)}
  >
    {children}
  </GoogleMap>
))

export default MapWithADirectionsRenderer
