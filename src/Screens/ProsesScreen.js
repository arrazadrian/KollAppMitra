import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Kuning } from '../Utils/Warna'
import ProsesCard from '../Components/ProsesCard'


const ProsesScreen = () => {
  return (
    <View style={styles.latar}>
      <ProsesCard />
    </View> 
  )
}

export default ProsesScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
  }
})