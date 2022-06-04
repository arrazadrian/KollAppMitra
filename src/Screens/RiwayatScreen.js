import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Kuning } from '../Utils/Warna'

const RiwayatScreen = () => {
  return (
    <View style={styles.latar}>
      <Text>RiwayatScreen</Text>
    </View>
  )
}

export default RiwayatScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
  },
})