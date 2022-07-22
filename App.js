import { LogBox } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './src/AuthNavigation.js';
LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const App = () => {
  return <AuthNavigation/>
}

export default App


