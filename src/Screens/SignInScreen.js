import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native'
import React, {useEffect, useState} from 'react'
import { KollLong, LatarSignIn } from '../assets/Images/Index'
import { Hitam, Ijo, Kuning, Putih } from '../Utils/Warna'
import { NavigationContainer } from '@react-navigation/native'
import { IconLock, IconMessage } from '../assets/Icons/Index'


const { height, width } = Dimensions.get('window')

const SignInScreen = ({navigation}) => {

  <StatusBar translucent backgroundColor="transparent" />
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressSignIn = async () => {
    console.log("Trying sign in with user: " + email);
    try {
      await signIn(email, password);
    } catch (error) {
      const errorMessage = `Failed to sign in: ${error.message}`;
      console.error(errorMessage);
      Alert.alert(errorMessage);
    }
  };


  
  return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.latar}>
            <ImageBackground source={LatarSignIn}  resizeMode="stretch"  style={styles.rumah}/>
              <View>
                <Image source={KollLong} style={styles.pojoklogo} />
              </View>
              <View>
                  <View style={styles.wraper}>
                      <View style={{marginBottom: 10}}>
                          <Text style={styles.judul}>Masuk Akun Mitra</Text>
                          <Text style={{fontSize: 16}}>Lengkapi email dan kata sandi</Text>
                      </View>
                      <View style={{ marginBottom: 10}}>
                          <TextInput style={styles.input} placeholder="Email akun anda" />
                          <IconMessage style={{position:'absolute', top: 14, left: 8}} />
                      </View>
                      <View style={{ marginBottom: 10}}>
                          <TextInput secureTextEntry={true} style={styles.input} placeholder="Kata sandi akun anda"/>
                      <IconLock style={{position:'absolute', top: 14, left: 8}}/>
                      </View>

                      <View style={styles.tombol}>
                        <Text style={{color: Putih, fontWeight: 'bold', textAlign:'center', fontSize: 20 }}>Masuk</Text>
                      </View>
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
 rumah:{
    flex:1,
    position:`absolute`,
    height: height,
    width: width,
  }, 
  pojoklogo: {
    width:  100,
    height: 50,
    top: 15,
    marginLeft: 10,
    marginTop: 10,
    position: `absolute`,
  
  },
  tombol:{
    height: 50,
    width: 300, 
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
    marginTop: 130,
    marginHorizontal: 30,
  }
})