import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Routernih from './src/Router/Index.js';
// import * as firebase from 'firebase';
// import apiKeys from './Firebase/config';

const App = () => {
  return (
    <NavigationContainer>
      <Routernih />
    </NavigationContainer>
  );
}

export default App

const styles = StyleSheet.create({})
