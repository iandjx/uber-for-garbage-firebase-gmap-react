import { Box, Button, Modal, Typography } from '@material-ui/core'

import DirectionsRenderer from '../../../common/components/GoogleMap/DirectionRenderer'
import Map from '../../../common/components/GoogleMap'
import React from 'react'
import { useEffect } from 'react'
import { useFirestoreConnect } from 'react-redux-firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const ActiveTrashRequest = props => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const toggleComplete = () => {
    setOpen(!open)
  }

  const { uid } = useSelector(state => state.firebase.auth)
  const [currentRequest, setCurrentRequest] = useState({})
  useFirestoreConnect({
    collection: 'requests',
    where: [
      ['status', 'in', ['pending', 'active', 'onRoute', 'complete']],
      ['requesterId', '==', uid || '']
    ],
    storeAs: 'requests'
  })
  const { requests } = useSelector(state => state.firestore.data)

  useEffect(() => {
    if (requests) {
      setCurrentRequest(Object.values(requests)[0])
    }
    // console.log(currentRequest)
  }, [requests])

  return (
    <div>
      {console.log(currentRequest)}
      {currentRequest.status === 'pending' ? <p>waiting</p> : null}
      {currentRequest.status === 'active' ? <p>waiting</p> : null}
      {currentRequest.status === 'onRoute' && (
        <Map>
          <DirectionsRenderer
            originLat={currentRequest.collectorLat}
            originLng={currentRequest.collectorLng}
            destinationLat={currentRequest.lat}
            destinationLng={currentRequest.lng}
          />
        </Map>
      )}
      {currentRequest.status === 'complete' && (
        <Modal
          open
          // onClose={handleClose}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          <Box>
            <Typography variant='h2'>Garbage Delivered</Typography>
            <Button onClick={() => navigate('/disposer/new-request')}>
              Ok
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  )
}

export default ActiveTrashRequest
