import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Kuning } from '../Utils/Warna'

const TambahScreen = () => {
  return (
    <View style={styles.latar}>
      <Text>TambahScreen</Text>
    </View>
  )
}

export default TambahScreen

const styles = StyleSheet.create({
    latar:{
        backgroundColor: Kuning,
        flex: 1,
    }
})