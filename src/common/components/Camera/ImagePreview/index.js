import './styles/imagePreview.css'

import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { savePhoto } from '../cameraSlice'
import { storage } from '../../../../config/firebaseConfig'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export const ImagePreview = ({ dataUri, isFullscreen, reTakePhoto }) => {
  const history = useHistory()
  const storageRef = storage.ref()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleSuccess = async () => {
    setLoading(true)
    const uploadedImage = await storageRef
      .child('/images/' + uuidv4())
      .putString(dataUri, 'data_url')
    const url = await uploadedImage.ref.getDownloadURL()
    setLoading(false)
    dispatch(savePhoto(url))
    history.goBack()
  }

  let classNameFullscreen = isFullscreen ? 'demo-image-preview-fullscreen' : ''

  if (loading === false) {
    return (
      <div className={'demo-image-preview ' + classNameFullscreen}>
        <img src={dataUri} alt='pic' />
        <button onClick={handleSuccess}>Use This Photo</button>
        <button onClick={reTakePhoto}>Retake Photo</button>
      </div>
    )
  }
  if (loading) {
    return <div>loading</div>
  }
}

ImagePreview.propTypes = {
  dataUri: PropTypes.string,
  isFullscreen: PropTypes.bool
}

export default ImagePreview
