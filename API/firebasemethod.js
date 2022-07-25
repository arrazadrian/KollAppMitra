import firebase from "firebase/compat/app";
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
   } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore/lite';
import { getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";
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

// API 4: uploadgambarasync
// UPLOAD IMAGE YANG DIOPER KE
// FUNGSI FIRESTORE SELANJUTNYA

async function uploadgambarasync(uri) {
  try{
      const uploadUri = uri;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/')+1);
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
    });
    const fileRef = ref(getStorage(app), `produk/${filename}`);
    const result = await uploadBytes(fileRef, blob);
    
    // We're done with the blob, close and release it
    blob.close();
    
    return await getDownloadURL(fileRef);
  } catch (err) {
    Alert.alert('Ada error pada foto produk!', err.message);
  }
}

// API 5: uploadProdukUtama
// BUAT PRODUK UTAMA BARU
// SEBELUMNYA UPLOAD IMAGE DULU

export const uploadProdukUtama = async (namaproduk, deskproduk, image, harga, kuantitas, satuan, kategori) => {
  const urlgambar = await uploadgambarasync(image);
  
  const auth = getAuth();
  const db = getFirestore(app);
  const docRef = doc(db, "mitra", auth.currentUser.uid);
  const colRef = collection(docRef, "produk")
  addDoc(colRef, {
    jenis:'Produk utama',
    namaproduk: namaproduk,
    deskproduk: deskproduk,
    image: urlgambar,
    harga: harga,
    kuantitas: kuantitas,
    satuan: satuan,
    kategori: kategori,
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

// API 6: uploadProdukPre
// BUAT PRODUK UTAMA BARU
// SEBELUMNYA UPLOAD IMAGE DULU

export const uploadProdukPre = async (namaproduk, deskproduk, image, harga, kuantitas, satuan, kategori) => {
  const urlgambar = await uploadgambarasync(image);
  
  const auth = getAuth();
  const db = getFirestore(app);
  const docRef = doc(db, "mitra", auth.currentUser.uid);
  const colRef = collection(docRef, "produk")
  addDoc(colRef, {
    jenis:'Produk pre-order',
    namaproduk: namaproduk,
    deskproduk: deskproduk,
    image: urlgambar,
    harga: harga,
    kuantitas: kuantitas,
    satuan: satuan,
    kategori: kategori,
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

