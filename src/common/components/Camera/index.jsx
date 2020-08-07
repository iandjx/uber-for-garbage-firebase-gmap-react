import 'react-html5-camera-photo/build/css/index.css'

import React, { useState } from 'react'

import { Box } from '@material-ui/core'
import Camera from 'react-html5-camera-photo'
import ImagePreview from './ImagePreview' // source code : ./src/demo/AppWithImagePreview/ImagePreview

function ReactCamera (props) {
  const [dataUri, setDataUri] = useState('')

  function handleTakePhotoAnimationDone (dataUri) {
    setDataUri(dataUri)
  }

  const isFullscreen = false
  return (
    <Box style={{ height: '70vh' }}>
      {dataUri ? console.log(dataUri.slice(23)) : null}
      {dataUri ? (
        <ImagePreview
          dataUri={dataUri}
          isFullscreen={isFullscreen}
          reTakePhoto={() => setDataUri(null)}
        />
      ) : (
        <Camera
          onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
          isFullscreen={isFullscreen}
        />
      )}
    </Box>
  )
}

export default ReactCamera
