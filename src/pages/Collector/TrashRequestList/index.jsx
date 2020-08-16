import React, { useEffect } from 'react'

import { List } from '@material-ui/core'
import TrashRequestItem from './TrashRequestItem'
import haversine from 'haversine'
import { useFirestoreConnect } from 'react-redux-firebase'
import { useNavigate } from 'react-router-dom'
import { usePosition } from 'use-position'
import { useSelector } from 'react-redux'

const watch = true

const TrashRequestList = props => {
  // const { uid } = props.location.state
  const navigate = useNavigate()
  const { uid } = useSelector(state => state.firebase.auth)
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
      ['collectorId', '==', uid || null]
    ],
    storeAs: 'activeRequests'
  })

  useFirestoreConnect({
    collection: 'requests',
    where: [
      ['status', '==', 'onRoute'],
      ['collectorId', '==', uid || null]
    ],
    storeAs: 'onRouteRequests'
  })

  const { availableRequests, activeRequests, onRouteRequests } = useSelector(
    state => state.firestore.data
  )
  useEffect(() => {
    if (onRouteRequests) {
      navigate('/collector/on-route', {
        state: { ...Object.values(onRouteRequests)[0] }
      })
    }
  }, [onRouteRequests])

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
