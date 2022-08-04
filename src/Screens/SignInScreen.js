import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, StatusBar, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { KollLong } from '../assets/Images/Index'
import { Hitam, Ijo, Kuning, Putih } from '../Utils/Warna'
import { NavigationContainer } from '@react-navigation/native'
import { IconLock, IconMessage } from '../assets/Icons/Index'
import { Pasar, Awan } from '../assets/Images/Index'
import { useNavigation } from '@react-navigation/native'
import { signIn } from '../../API/firebasemethod';

const { height, width } = Dimensions.get('window')

const SignInScreen = () => {

  const navigation = useNavigation();

  <StatusBar translucent backgroundColor="transparent" />
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email) {
      Alert.alert('Kamu belum tulis email','Yuk isi email akun kamu.');
    } else if (!password) {
      Alert.alert('Kata sandi belum ditulis','Isi dulu yuk kata sandinya.');
    } else {
    signIn(email, password, navigation);
    setEmail('');
    setPassword('');
    }
  };
  
  return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.latar}>
            <Image source={KollLong} style={styles.pojoklogo} />
            <Image source={Awan} style={styles.awan}/>
            <Image source={Pasar} style={styles.pasar}/>
              <View>
                  <View style={styles.wraper}>
                      <View style={{marginBottom: 10}}>
                          <Text style={styles.judul}>Masuk Akun Mitra</Text>
                          <Text style={{fontSize: 16}}>Lengkapi email dan kata sandi</Text>
                      </View>
                      <View style={{ marginBottom: 10}}>
                          <TextInput 
                          style={styles.input} 
                          placeholder="Email akun anda" 
                          value={email}
                          onChangeText={text => setEmail(text)}
                          autoCapitalize="none"
                          />
                          <IconMessage style={{position:'absolute', top: 14, left: 8}} />
                      </View>
                      <View style={{ marginBottom: 10}}>
                          <TextInput 
                          style={styles.input} 
                          placeholder="Kata sandi akun anda"
                          value={password}
                          onChangeText={text => setPassword(text)}
                          secureTextEntry={true} 
                          />
                          <IconLock style={{position:'absolute', top: 14, left: 8}}/>
                      </View>

                      <TouchableOpacity 
                      style={styles.tombol}
                      onPress={handleSignIn}
                      >
                        <Text style={{color: Putih, fontWeight: 'bold', textAlign:'center', fontSize: 20 }}>Masuk</Text>
                      </TouchableOpacity>
                      <View style={{alignItems: 'center'}}>
                          <Text style={{color: Ijo, fontSize: 16}}>  
                              <Text>Belum punya akun? </Text>   
                              <Text style={{fontWeight:'bold'}}
                              onPress={() => navigation.navigate('SignUpScreen')}                      
                              >Klik ini!</Text>
                          </Text>
                      </View>
                  </View>
              </View>
          </View>
          </TouchableWithoutFeedback>
     
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  latar: {
    backgroundColor: Kuning,
    flex: 1,   
  },
 awan:{
    position:'absolute', 
    top: height*0.03, 
    right: width*0.02, 
    height: width*0.3, 
    width: width*0.5,
  }, 
  pojoklogo: {
    width:  width*0.25,
    height: height*0.1,
    top: height*0.03,
    left: width*0.03,
    position: `absolute`,
  },
  pasar:{
    position:'absolute', 
    bottom: -1, 
    height: height*0.32, 
    width: width,
  },
  tombol:{
    height: height*0.06,
    width:  width*0.8, 
    justifyContent: 'center', 
    marginVertical: 20, 
    backgroundColor: Ijo,
    borderRadius: 10,
    alignSelf: 'center'  
  },
  judul: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: Hitam,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: Ijo,
    height: 50,
    borderRadius: 10,
    paddingStart: 40,
    fontSize: 16,
  },
  wraper:{
    marginTop: height*0.2,
    marginHorizontal: 30,
  },
})