import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Kuning } from '../Utils/Warna'
import RiwayatCard from '../Components/RiwayatCard'

const RiwayatScreen = () => {
  return (
    <View style={styles.latar}>
      <RiwayatCard/>
      <RiwayatCard/>
      <RiwayatCard/>
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