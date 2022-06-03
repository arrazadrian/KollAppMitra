import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Routernih from './src/Router';

const App = () => {
  return (
    <NavigationContainer>
      <Routernih />
    </NavigationContainer>
  );
}

export default App

const styles = StyleSheet.create({})
