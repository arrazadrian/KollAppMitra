import firebase from "firebase/compat/app";
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
   } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import { app } from "../Firebase/config";
import {Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { DefaultFoto } from "../src/assets/Images/Index";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function registration(email, password, namalengkap, namatoko, phone) {
    const auth = getAuth();
    const db = getFirestore(app);
  try {
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const currentUser = userCredential.currentUser;
            addDoc(collection(db, "users"),{
                email: email,
                namalengkap: namalengkap,
                namatoko: namatoko,
                phone: phone,
                fototoko: DefaultFoto,
            })
          })
  } catch (err) {
    Alert.alert("Ada error membuat akun mitra!", err.message);
  }
}

export async function signIn(email, password, navigation) {
  const auth = getAuth();
  try { 
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigation.replace('AppUtama');
        })
  } catch (err) {
    Alert.alert("User tidak ditemukan!", "Salah menulis email/kata sandi.");
    }
}

export function adaOrang({navigation}) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        navigation.navigate("AppUtama")
      } else {
        navigation.navigate("SignInScreen")
      }
    });
}

export async function handleSignOut(navigation) {
    const auth = getAuth();
  try {
    await signOut(auth);
    navigation.replace('SignInScreen');
  } catch (err) {
    Alert.alert('Ada error untuk keluar!', 'Tidak bisa keluar.');
  }
}