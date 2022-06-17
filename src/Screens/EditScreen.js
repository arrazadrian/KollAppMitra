import { StyleSheet, Text, TextInput, View, Image, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih } from '../Utils/Warna'

const EditScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.latar}>
            <View style={styles.atas}>
                <View style={styles.gambar}>
                  <Image/>
                </View>
                  <Text style={{color: Ijo, fontWeight: 'bold', fontSize: 20}}>Ganti Foto </Text>
            </View>
            <View style={{padding:10}}>
                <Text style={styles.judulisi}>Nama</Text>
                <TextInput style={styles.input} value="asiap"/>
                <Text style={styles.judulisi}>No.Handphone</Text>
                <TextInput style={styles.input} 
                  keyboardType='numeric'
                  value="08123456789"
                  />
                <Text style={styles.judulisi}>Email</Text>
                <TextInput style={styles.input} value="asiap"/>
            </View>
            <Pressable style={styles.tombol}>
              <Text style={styles.simpan}>Simpan</Text>
            </Pressable>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default EditScreen

const styles = StyleSheet.create({
  latar:{
    flex:1,
    backgroundColor: IjoTua,
    padding: 20,
  },
  gambar:{
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Putih,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderColor: IjoTua,
    borderWidth: 1,
  },
  atas:{
    alignItems: 'center',
  },
  input:{
    borderBottomWidth: 2,
    borderColor: Ijo,
    marginBottom: 10,
    fontSize: 20,
    color: Putih,
  },
  judulisi:{
    fontSize: 18,
    fontWeight: 'bold',
    color: Putih,
  },
  tombol:{
    backgroundColor: Ijo,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 120,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  simpan:{
    color: Putih, 
    fontWeight: 'bold',
    fontSize: 20,
  },
})