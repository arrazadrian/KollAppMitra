import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih,  } from '../Utils/Warna'


const PreOrderScreen = () => {
  return (
    <View>
        <Pressable style={styles.tambah}
            onPress={() => navigation.navigate('TambahScreen')}
            >
            <Text style={{fontSize:30, fontWeight:'bold', color: Putih}}>
            +</Text>
        </Pressable>
    </View>
  )
}

export default PreOrderScreen

const styles = StyleSheet.create({
    tambah:{
        position: 'absolute',
        bottom: 20,
        right: 20,
        height: 70,
        width: 70,
        backgroundColor: Ijo,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
})