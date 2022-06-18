import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { KollLong } from '../assets/Images/Index'

const AkunScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.latar}>
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Image source={KollLong} style={styles.logo}/>
      </View>
      <View style={styles.bungkus}>
            <View style={{borderBottomColor: Ijo, borderBottomWidth: 1, marginBottom: 10 }}>
              <Text style={{color: Putih, fontSize: 30, fontWeight: 'bold'}}>Profil</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginBottom: 10}}>
                <View style={styles.foto}>
                  <Text>Putuu</Text>
                </View>
                <View>
                    <Text style={{fontSize: 30, fontWeight:'bold', color: Putih,}}>Arraz Adrian</Text>
                    <Text style={{fontSize: 18,color: Putih,}}>Mitra Pedagang</Text>
                    <Pressable  onPress={() => navigation.push('EditScreen')} >
                        <View style={styles.edit}>
                          <Text style={{color: Putih, fontSize: 18, fontWeight:'bold'}}>Atur Profil</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
            <View style={{borderBottomColor: Ijo, borderBottomWidth: 1}}>
              <Text style={{color: Putih, fontSize: 30, fontWeight: 'bold'}}>Info</Text>
            </View>
            <View style={{padding: 15}}>
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
      </View>
    </SafeAreaView>
  )
}

export default AkunScreen

const styles = StyleSheet.create({
  latar:{
    flex:1,
    backgroundColor: Kuning,
  },
  logo:{
    width: 150,
    height: 75,
    alignSelf: 'center',
  },
  foto:{
    width: 100,
    height: 100,
    backgroundColor: Putih,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
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
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logout:{
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 20, 
  },
  bungkus:{
    backgroundColor: IjoTua,
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flex: 3,
  },
})