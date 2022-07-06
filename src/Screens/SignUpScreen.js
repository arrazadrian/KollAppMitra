import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, StatusBar, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ijo, IjoTua, Putih } from '../Utils/Warna';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../Firebase/firebase'
import { useNavigation } from '@react-navigation/native'

const { height, width } = Dimensions.get('window')

const SignUpScreen = () => {

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [namatoko, setNamatoko] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials =>{
      const user = userCredentials; 
      console.log(user.email);
    })
    .catch(error => alert(error.message))
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView style={styles.latar}>
         <View style={{alignItems:'center', marginBottom: 10, paddingTop: 20}}>
           <Text style={{color: Putih, fontSize: 30, fontWeight:'bold'}}>Daftar Akun Mitra</Text>
           <Text style={{color: Putih, fontSize: 17}}>Yuk lengkapi data pribadimu!</Text>
         </View>
          <View style={styles.kotak}>
              <View style={{left: 5, marginBottom: 5}}>
                  <Text style={styles.subjudul}>Nama Lengkap</Text>
              </View>
              <View style={{marginBottom: 10}}>
                  <TextInput style={styles.input} placeholder="Cth. Asep Suryana"
                  value={username}
                  onChangeText={text => setUsername(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  />
              </View>
              <View style={{left: 5, marginBottom: 5}}>
                  <Text style={styles.subjudul}>Nama Toko</Text>
              </View>
              <View style={{marginBottom: 10}}>
                  <TextInput style={styles.input} placeholder="Cth. Sayur Segar Ijo"
                  value={namatoko}
                  onChangeText={text => setNamatoko(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  />
              </View>
              <View style={{left: 5, marginBottom: 5}}>
                  <Text style={styles.subjudul}>Email</Text>
              </View>
              <View style={{marginBottom: 10}}>
                  <TextInput style={styles.input} placeholder="Cth. emailanda@mail.com"
                  value={email}
                  onChangeText={text => setEmail(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  />
              </View>
              <View style={{left: 5, marginBottom: 5}}>
                  <Text style={styles.subjudul}>No. Handphone</Text>
              </View>
              <View style={{marginBottom: 10}}>
                  <TextInput style={styles.input} placeholder="08XXXXX"
                  value={phone}
                  onChangeText={text => setPhone(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType='numeric'
                  />
              </View>
              <View style={{left: 5, marginBottom: 5}}>
                  <Text style={styles.subjudul}>Password</Text>
              </View>
              <View style={{marginBottom: 10}}>
                  <TextInput secureTextEntry={true} style={styles.input} placeholder="Kata Sandi"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  />
              </View>
              <View style={{left: 5, marginBottom: 5}}>
                  <Text style={styles.subjudul}>Tulis Ulang Password</Text>
              </View>
              <View style={{marginBottom: 16}}>
                <TextInput secureTextEntry={true} style={styles.input} placeholder="Tulis Ulang Kata Sandi"
                value={passwordConfirmation}
                onChangeText={text => setPasswordConfirmation(text)}
                autoCapitalize="none"
                autoCorrect={false}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                  <Text style={{color: Putih, textAlign: 'center', fontSize: 15}}>
                    <Text>Dengan mendaftar akun anda menyetujui </Text>
                    <Text style={{fontWeight:'bold'}}>kebijakan privasi </Text> 
                    <Text>dalam aplikasi ini</Text>
                  </Text>
              </View>
          </View>
          <TouchableOpacity 
          style={styles.tombol}
          onPress={handleSignUp}
          >
              <Text style={{fontWeight:'bold', fontSize: 20, color: Putih}}>Daftar</Text>
          </TouchableOpacity>
        <View style={{alignSelf:'center', marginBottom: 50}}>
            <Text style={{color: Putih}}>
                <Text>Sudah punya akun?</Text>   
                <Text style={{fontWeight:'bold'}}
                onPress={() => navigation.navigate('SignInScreen')}
                > Klik ini!</Text>
            </Text>
        </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  latar:{
    flex: 1,
    backgroundColor: IjoTua,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  kotak:{
    backgroundColor: Ijo,
    borderRadius: 10,
    // width: width*0.85,
    // height: height*0.72,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom:20,
  },
  subjudul:{
    color: Putih,
    fontSize: 16,
  },
  input: {
    backgroundColor: Putih,
    height: 40,
    borderRadius: 10,
    paddingStart: 10
  },
  tombol:{
    width: width*0.84,
    height: height*0.06,
    backgroundColor: Ijo,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  }
})