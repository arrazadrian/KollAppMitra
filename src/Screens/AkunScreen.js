import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Kuning } from '../Utils/Warna'

const AkunScreen = () => {
  return (
    <View style={styles.latar}>
      <Text>AkunScreen Halo</Text>
    </View>
  )
}

export default AkunScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
  }
})