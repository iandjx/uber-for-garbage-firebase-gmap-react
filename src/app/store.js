import { rootReducer } from './rootReducer'
import { getFirebase } from 'react-redux-firebase'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

const extraArgument = {
  getFirebase
}

const middleware = [
  ...getDefaultMiddleware({
    thunk: {
      extraArgument
    }
  })
]

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true
})

export default store
