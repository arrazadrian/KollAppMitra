import firebase from "firebase/compat/app";
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
   } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore/lite';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../Firebase/config";
import {Alert} from "react-native";

// API 1: registration
// MEMBUAT AKUN BARU DENGAN EMAIL DAN PASSWORD, 
// LALU MEMBUAT DOKUMEN BARU PADA COLLECTION MITRA

export async function registration(email, password, namalengkap, namatoko, phone) {
    const auth = getAuth();
    const db = getFirestore(app);
  try {
    await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            setDoc(doc(db, "mitra", auth.currentUser.uid),{
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

// API 2: signIn
// MELAKUKAN LOGIN DENGAN EMAIL DAN PASSWORD,
// AKAN ERROR KALO SALAH TULIS/AKUN TIDAK ADA

export async function signIn(email, password) {
  const auth = getAuth();
  try { 
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    Alert.alert("User tidak ditemukan!", "Salah menulis email/kata sandi.");
    }
}

// API 3: handleSignOut
// KELUAR DARI DALAM AKUN YG SEDANG LOGIN,
// MENGUBAH AUTHSTATECHANGE DAN KELUAR

export async function handleSignOut() {
    const auth = getAuth();
  try {
    await signOut(auth);
  } catch (err) {
    Alert.alert('Ada error untuk keluar!', 'Tidak bisa keluar.');
  }
}

// API 4: uploadProdukUtama
// BUAT PRODUK UTAMA BARU
// SEBELUMNYA UPLOAD IMAGE DULU

export async function uploadgambar(result) {
  const storage = getStorage(app);
  const uploadUri = result;
  let filename = uploadUri.substring(uploadUri.lastIndexOf('/')+1)
  const storageRef = ref(storage, `produk/${filename}`);
  try {
    await storageRef.putfile(uploadUri);
    const urlgambar = await storageRef.getDownloadURL();

    return urlgambar
  } catch (err) {
    Alert.alert('Ada error pada foto produk!', err.message);
  }
}


export const uploadProdukUtama = async (namaproduk, deskproduk, image, harga, kuantitas, satuan) => {
  const urlgambar = await uploadgambar(image);
  
  const auth = getAuth();
  const db = getFirestore(app);
  const docRef = doc(db, "mitra", id_mitra);
  const colRef = collection(docRef, "produk")
  addDoc(colRef, {
    jenis:'Produk utama',
    namaproduk: namaproduk,
    deskproduk: deskproduk,
    image: urlgambar,
    harga: harga,
    kuantitas: kuantitas,
    satuan: satuan,
    pemilik: auth.currentUser.uid,
  })
  .then(() => {
    Alert.alert(
      'Produk Berhasil Dibuat','Produk masuk daftar produk utama.'
    );
  })
  .catch((error) => {
    console.log('Something went wrong with added product to firestore.', error);
  });
}