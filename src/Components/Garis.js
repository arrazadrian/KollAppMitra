import { StyleSheet, View } from 'react-native'
import React from 'react'

export default function Garis() {
  return (
    <View style={styles.garis}/>
  )
}

const styles = StyleSheet.create({
    garis:{
        borderColor: 'rgba(0,0,0,0.05)',
        borderWidth: 1,
        marginVertical: 5,
      },
})