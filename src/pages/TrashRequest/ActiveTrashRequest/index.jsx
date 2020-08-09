import React from 'react'
import { current } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const ActiveTrashRequest = props => {
  const { uid } = useSelector(state => state.firebase.auth)
  const [currentRequest, setCurrentRequest] = useState({})
  useFirestoreConnect({
    collection: `users/${uid}/requests`,
    where: ['status', 'in', ['pending', 'active']],
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
      {console.log(currentRequest.status)}
      {currentRequest.status === 'pending' ? <p>waiting</p> : <p>active</p>}
    </div>
  )
}

export default ActiveTrashRequest
