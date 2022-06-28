import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, StatusBar, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Ijo, IjoTua, Putih } from '../Utils/Warna';
//import { useAuth } from '../../providers/AuthProvider';

const { height, width } = Dimensions.get('window')

const SignUpScreen = ({navigation}) => {

 // <StatusBar translucent backgroundColor="transparent" />

  const [username, setUsername] = useState('');
  const [namatoko, setNamatoko] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const onPressSignUp = async () => {
    console.log("Trying Sign Up with user: " + email);
    try {
      await signUp(username, email, phone, password, passwordConfirmation);
      signIn(email, password);
    } catch (error) {
      const errorMessage = `Failed to sign up: ${error.message}`;
      console.error(errorMessage);
      Alert.alert(errorMessage);
    }
  };


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
                  onChangeText={setUsername}
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
                  onChangeText={setNamatoko}
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
                  onChangeText={setEmail}
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
                  onChangeText={setPhone}
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
                  onChangeText={setPassword}
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
                onChangeText={setPasswordConfirmation}
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
          <View style={styles.tombol}>
              <Text style={{fontWeight:'bold', fontSize: 20, color: Putih}}>Daftar</Text>
          </View>
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