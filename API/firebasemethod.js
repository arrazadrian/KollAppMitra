import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";

export async function registration(email, password, namalengkap, namatoko, phone) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        namalengkap: namalengkap,
        namatoko: namatoko,
        phone: phone,
      });
  } catch (err) {
    Alert.alert("Ada error membuat akun mitra!", err.message);
  }
}

export async function signIn(email, password) {
  try {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("Ada error untuk masuk!", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('Ada error untuk keluar!', err.message);
  }
}