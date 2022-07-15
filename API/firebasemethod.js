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
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function registration(email, password, namalengkap, namatoko, phone) {
    const auth = getAuth();
    const db = getFirestore(app);
  try {
    await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            addDoc(collection(db, "mitra"),{
                id_mitra: auth.currentUser.uid,
                email: email,
                namalengkap: namalengkap,
                namatoko: namatoko,
                phone: phone,
            })
        })
  } catch (err) {
    Alert.alert("Ada error membuat akun mitra!", err.message);
  }
}

export async function signIn(email, password) {
  const auth = getAuth();
  try { 
        await signInWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //     // Signed in 
        //     const user = userCredential.user;
        // })
  } catch (err) {
    Alert.alert("User tidak ditemukan!", "Salah menulis email/kata sandi.");
    }
}

export async function handleSignOut() {
    const auth = getAuth();
  try {
    await signOut(auth);
  } catch (err) {
    Alert.alert('Ada error untuk keluar!', 'Tidak bisa keluar.');
  }
}