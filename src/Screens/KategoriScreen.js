import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Kuning } from '../Utils/Warna'

const KategoriScreen = () => {
  return (
   <View style={styles.latar}>
    <Text> Halo </Text>
   </View>
  )
}

export default KategoriScreen

const styles = StyleSheet.create({
   latar:{
      backgroundColor: Kuning,
      flex: 1,
   },

})