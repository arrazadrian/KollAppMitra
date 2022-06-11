import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Putih} from '../Utils/Warna';

const AkunScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.latar}>
            <View style={{borderBottomColor: Ijo, borderBottomWidth: 1, marginBottom: 10}}>
              <Text style={{color: Putih, fontSize: 30, fontWeight: 'bold'}}>Profil</Text>
            </View>
            <View style={styles.foto}>
              <Text>Putuu</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',  justifyContent:'space-between',marginBottom: 10}}>
              <View>
                    <Text style={{fontSize: 24, fontWeight:'bold', color: Putih,}}>Sayur Aa Anri</Text>
                    <Text style={{fontSize: 16,color: Putih,}}>Mitra</Text>
              </View>
              <Pressable  onPress={() => navigation.push('EditScreen')} >
                  <View style={styles.edit}>
                    <Text style={{color: Putih, fontSize: 18, fontWeight:'bold'}}>Atur Profil</Text>
                  </View>
              </Pressable>
            </View>
            <View style={{borderBottomColor: Ijo, borderBottomWidth: 1}}>
              <Text style={{color: Putih, fontSize: 30, fontWeight: 'bold'}}>Info</Text>
            </View>
            <View style={{padding: 10}}>
                <View style={{justifyContent:"space-between", marginBottom: 10}}>     
                      <Text style={{color: Putih, fontSize: 15, fontWeight:'bold'}}>No.Handphone</Text> 
                      <Text style={{color: Putih, fontSize: 20}}>0909090909090</Text>   
                </View>
                <View style={{justifyContent:"space-between", marginBottom: 10}}>     
                      <Text style={{color: Putih, fontSize: 15, fontWeight:'bold'}}>Email</Text> 
                      <Text style={{color: Putih, fontSize: 20}}>contoh@gmail.com</Text>   
                </View>
            </View>
            <View style={styles.logout}>
              <Text style={{fontSize: 20, color: Ijo, fontWeight: 'bold'}}>Keluar Akun</Text>
            </View>
    </SafeAreaView>
  )
}

export default AkunScreen

const styles = StyleSheet.create({
  latar:{
    flex:1,
    backgroundColor: IjoTua,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  foto:{
    width: '100%',
    height: 180,
    backgroundColor: Putih,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  container:{
    backgroundColor: IjoTua,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    top: 140, 
    padding: 20,
  },
  tulisan:{
    fontSize: 18,
    color: Putih,
  },
  edit:{
    borderColor: Ijo,
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logout:{
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 20,
  }
})