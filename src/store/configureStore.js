/**
 * React Native Playground
 * https://github.com/agilecrowd/react-native-playground.git
 * @flow
 */

'use strict'

import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from '../reducers'

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const createStoreWithMW = applyMiddleware(logger, thunk)(createStore)

export default function configureStore(onComplete: ?() => void) {
  const store = autoRehydrate()(createStoreWithMW)(reducers)
  persistStore(store, {storage: AsyncStorage}, onComplete)
  if (isDebuggingInChrome) {
    window.store = store
  }
  return store
}
