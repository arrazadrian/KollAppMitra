import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Hitam, Ijo, Kuning, Putih } from '../Utils/Warna'

const LangsungScreen = () => {
  return (
    <View style={styles.latar}>
      <Text>LangsungScreen</Text>
    </View>
  )
}

export default LangsungScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
    padding: 10,
  },  
})