/**
 * React Native Playground
 * https://github.com/agilecrowd/react-native-playground.git
 * @flow
 */

'use strict'

import React, {
  Component,
  StatusBar
} from 'react-native'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Playground from './Playground'

export default class Root extends Component {

  constructor () {
    super()
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false}))
    }
  }

  componentDidMount () {
    // Hide statusbar
    StatusBar.setHidden(true)
  }

  render () {
    const { isLoading, store } = this.state
    if (isLoading) return null
    return (
      <Provider store={store}>
        <Playground />
      </Provider>
    )
  }
}

// Config logger format
global.LOG = (...args) => {
  console.log('/------------------------------\\');
  console.log(...args);
  console.log('\\------------------------------/');
  return args[args.length - 1];
};
