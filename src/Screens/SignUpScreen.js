import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ijo, IjoTua, Putih } from '../Utils/Warna';
import { useNavigation } from '@react-navigation/native';
import { registration } from '../../API/firebasemethod';

const { height, width } = Dimensions.get('window')

const SignUpScreen = () => {

  const navigation = useNavigation();

  const [namalengkap, setNamalengkap] = useState('');
  const [namatoko, setNamatoko] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const emptyState = () => {
    setNamalengkap('');
    setNamatoko('');
    setEmail('');
    setPhone('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const handleSignUp = async () =>{
    if (!namalengkap) {
      Alert.alert('Nama lengkap masih kosong','Isi nama lengkap dengan benar.');
    } else if (!namatoko) {
      Alert.alert('Nama toko masih kosong','Isi nama toko dengan benar.');
    } else if (!email) {
      Alert.alert('Email masih kosong','Isi email dengan benar.');
    } else if (!phone && 9 < phone.length < 14) {
      Alert.alert('Nomor handphone tidak benar','Isi nomor handphone dengan benar.');
    } else if (!password && password.length > 7) {
      Alert.alert('Kata sandi kurang kuat','Kata sandi minimal 8 karakter.');
    } else if (!passwordConfirmation) {
      setPassword('');
      Alert.alert('Pengulangan kata sandi masih kosong','Tulis ulang kata sandi.');
    } else if (password !== passwordConfirmation) {
      Alert.alert('Kata sandi tidak sama','Mohon cek ulang penulisan.');
    } else {
      registration(
        email,
        password,
        namalengkap,
        namatoko,
        phone,
      );
      emptyState();
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
                  value={namalengkap}
                  onChangeText={namalengkap => setNamalengkap(namalengkap)}
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
                  onChangeText={namatoko => setNamatoko(namatoko)}
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
                  onChangeText={email => setEmail(email)}
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
                  onChangeText={phone => setPhone(phone)}
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
                  onChangeText={password => setPassword(password)}
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
                onChangeText={passwordConfirmation => setPasswordConfirmation(passwordConfirmation)}
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
        <View style={{alignSelf:'center', marginBottom: 70}}>
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
    marginBottom: 20,
  }
})