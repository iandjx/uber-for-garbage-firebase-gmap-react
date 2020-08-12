import { List } from '@material-ui/core'
import React from 'react'
import TrashRequestItem from './TrashRequestItem'
import haversine from 'haversine'
import { useFirestoreConnect } from 'react-redux-firebase'
import { usePosition } from 'use-position'
import { useSelector } from 'react-redux'

const watch = true

const TrashRequestList = props => {
  const { uid } = props.location.state
  // const { uid } = useSelector(state => state.firebase.auth)
  const { latitude, longitude } = usePosition(watch)

  useFirestoreConnect({
    collection: 'requests',
    where: ['status', '==', 'pending'],
    storeAs: 'availableRequests'
  })

  useFirestoreConnect({
    collection: 'requests',
    where: [
      ['status', '==', 'active'],
      ['collectorId', '==', uid]
    ],
    storeAs: 'activeRequests'
  })

  const { availableRequests, activeRequests } = useSelector(
    state => state.firestore.data
  )

  const addHaversine = (location, request) => {
    const requestLocation = {
      latitude: request.lat,
      longitude: request.lng
    }
    const distanceFromCollector = haversine(location, requestLocation)
    return { ...request, distanceFromCollector }
  }

  const sortByHaversine = (a, b) => {
    return a.distanceFromCollector - b.distanceFromCollector
  }

  return (
    <>
      <List>
        {availableRequests &&
          Object.values(availableRequests)
            .map(request => addHaversine({ latitude, longitude }, request))
            .sort((a, b) => sortByHaversine(a, b))
            .map(request => (
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
      <br />
      <List>
        {activeRequests &&
          Object.values(activeRequests)
            .map(request => addHaversine({ latitude, longitude }, request))
            .sort((a, b) => sortByHaversine(a, b))
            .map(request => (
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
