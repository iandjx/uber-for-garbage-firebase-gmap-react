import { List } from '@material-ui/core'
import React from 'react'
import TrashRequestItem from './TrashRequestItem'
import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
const TrashRequestList = () => {
  const { uid } = useSelector(state => state.firebase.auth)

  useFirestoreConnect({
    collection: 'requests',
    where: ['status', '==', 'pending'],
    storeAs: 'availableRequests'
  })

  useFirestoreConnect({
    collection: 'requests',
    where: [
      ['status', '==', 'active'],
      ['collectorId', '==', uid || null]
    ],
    storeAs: 'activeRequests'
  })

  const { availableRequests, activeRequests } = useSelector(
    state => state.firestore.data
  )

  return (
    <>
      <List>
        {availableRequests &&
          Object.values(availableRequests).map(request => (
            <TrashRequestItem
              key={request.requestId}
              createdAt={request.createdAt}
              garbageType={request.garbageType}
              lat={request.lat}
              lng={request.lng}
              location={request.location}
              photoUrl={request.photoUrl}
              status={request.status}
              weight={request.weight}
              requesterId={request.requesterId}
              requestId={request.requestId}
            />
          ))}
      </List>
    </>
  )
}

export default TrashRequestList
