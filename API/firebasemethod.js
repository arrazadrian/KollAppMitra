import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
   } from "firebase/auth";
import { 
  getFirestore, collection, 
  addDoc, setDoc, doc, 
  serverTimestamp, onSnapshot,
  deleteDoc, getDoc, updateDoc,
  } from 'firebase/firestore/lite';
import { 
  getStorage, ref, 
  getDownloadURL, uploadBytes, 
  deleteObject,
  } from "firebase/storage";
import { app } from "../Firebase/config";
import {Alert} from "react-native";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


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
                status_sekarang: "Tidak Aktif",
            })
        })
  } catch (err) {
    Alert.alert("Ada error membuat akun mitra!", err.message);
  }
};

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
};

// API 3: handleSignOut
// KELUAR DARI DALAM AKUN YG SEDANG LOGIN,
// MENGUBAH AUTHSTATECHANGE DAN KELUAR

export async function handleSignOut() {
  const auth = getAuth();
  const db = getFirestore(app);
  const docrefproduk = doc(db, "mitra", auth.currentUser.uid);
  getDoc(docrefproduk).then(docSnap => {
    if (docSnap.exists()) {
      try {
        if(docSnap.data().status_sekarang == "Aktif" && docSnap.data().mangkal == true ){
          updateDoc(docrefproduk, { status_sekarang: "Tidak Aktif", mangkal: false });
          signOut(auth);
        } else if (docSnap.data().status_sekarang == "Aktif"){
          updateDoc(docrefproduk, { status_sekarang: "Tidak Aktif" });
          signOut(auth);
        } else {
          signOut(auth);
        }
      } catch (err) {
        Alert.alert('Ada error untuk keluar!', 'Tidak bisa keluar.');
      }
    }

  })
};

// API 4: uploadgambarproduk
// UPLOAD GAMBAR PRODUK YANG DIOPER KE
// FUNGSI FIRESTORE SELANJUTNYA

async function uploadgambarproduk(uri) {
  try{
    const uploadUri = uri;
    let extension = uploadUri.substring(uploadUri.lastIndexOf('.') + 1);

    // Add uuid to File Name
    filename = uuidv4() + '.' + extension;

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
};

// API 5: uploadProdukUtama
// BUAT PRODUK UTAMA BARU
// SEBELUMNYA UPLOAD IMAGE DULU

export const uploadProdukUtama = async (namaproduk, deskproduk, image, harga, kuantitas, satuan, kategori) => {
  const urlgambar = await uploadgambarproduk(image);
  
  const auth = getAuth();
  const db = getFirestore(app);
  const docRef = doc(db, "mitra", auth.currentUser.uid);
  const colRef = collection(docRef, "produk")
  addDoc(colRef, {
    waktudibuat: serverTimestamp(),
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
};

// API 6: uploadProdukPre
// BUAT PRODUK UTAMA BARU
// SEBELUMNYA UPLOAD IMAGE DULU

export const uploadProdukPre = async (namaproduk, deskproduk, image, harga, kuantitas, satuan, kategori) => {
  const urlgambar = await uploadgambarproduk(image);
  
  const auth = getAuth();
  const db = getFirestore(app);
  const docRef = doc(db, "mitra", auth.currentUser.uid);
  const colRef = collection(docRef, "produk")
  addDoc(colRef, {
    waktudibuat: serverTimestamp(),
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
      'Produk Berhasil Dibuat','Produk masuk daftar produk pre-order.'
    );
  })
  .catch((error) => {
    console.log('Ada yg salah saat menambahkan produk di firestore.', error);
  });
};

// API 7: hapusproduk
// HAPUS PRODUK JENIS APAPUN 
// DI FIRESTORE BESERTA FOTO DI STORAGE

export async function hapusproduk (produkid){

  const auth = getAuth();
  const db = getFirestore(app);
  const docRef = doc(db, "mitra", auth.currentUser.uid);
  const colRef = collection(docRef, "produk")
  const storage = getStorage();
  
  const docrefproduk = doc(colRef, produkid);
  getDoc(docrefproduk).then(docSnap => {
    if (docSnap.exists()) {
      const imgURL =  docSnap.data().image;
      const storageRef = ref(storage, imgURL);
      try{
        deleteObject(storageRef);
        deleteDoc(docrefproduk);
        Alert.alert(
          'Produk Berhasil Dihapus','Produk sudah tidak masuk daftar produk.'
        );
      } catch (err) {
        Alert.alert('Ada error untuk menghapus produk!', err.message);
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("Tidak ada dokumen tersebut!");
    }
  })
};

// API 8: updateprodukTanpafoto
// PERBARUI DATA PRODUK
// DI FIRESTORE TANPA FOTO DI STORAGE

export async function updateprodukTanpafoto (produkid, namaprodukbaru, deskprodukbaru, hargabaru, kuantitasbaru, satuanbaru, kategoribaru){

  const auth = getAuth();
  const db = getFirestore(app);
  const docRef = doc(db, "mitra", auth.currentUser.uid);
  const colRef = collection(docRef, "produk")
  
  const docrefproduk = doc(colRef, produkid);
  getDoc(docrefproduk).then(docSnap => {
    if (docSnap.exists()) {
      try{
        updateDoc(docrefproduk, {
          waktudibuat: serverTimestamp(),
          namaproduk: namaprodukbaru,
          deskproduk: deskprodukbaru,
          harga: hargabaru,
          kuantitas: kuantitasbaru,
          satuan: satuanbaru,
          kategori: kategoribaru,
          pemilik: auth.currentUser.uid,
        });
        Alert.alert(
          'Data Produk Berhasil Diperbarui','Produk sudah memiliki data baru.'
        );
      } catch (err) {
        Alert.alert('Ada error untuk memperbarui produk!', err.message);
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("Tidak ada dokumen tersebut!");
    }
  })
};

// API 9: updateprodukDenganfoto
// PERBARUI DATA PRODUK
// DI FIRESTORE BESERTA FOTO DI STORAGE

export async function updateprodukDenganfoto (produkid, namaprodukbaru, deskprodukbaru, imagebaru, hargabaru, kuantitasbaru, satuanbaru, kategoribaru){
  const urlgambarbaru = await uploadgambarproduk(imagebaru);

  const auth = getAuth();
  const db = getFirestore(app);
  const docRef = doc(db, "mitra", auth.currentUser.uid);
  const colRef = collection(docRef, "produk")
  const storage = getStorage();
  
  const docrefproduk = doc(colRef, produkid);
  getDoc(docrefproduk).then(docSnap => {
    if (docSnap.exists()) {
      const imgURL =  docSnap.data().image;
      const storageRef = ref(storage, imgURL);
      try{
        deleteObject(storageRef);
        updateDoc(docrefproduk, {
          waktudibuat: serverTimestamp(),
          namaproduk: namaprodukbaru,
          deskproduk: deskprodukbaru,
          image: urlgambarbaru,
          harga: hargabaru,
          kuantitas: kuantitasbaru,
          satuan: satuanbaru,
          kategori: kategoribaru,
          pemilik: auth.currentUser.uid,
        });
        Alert.alert(
          'Data Produk Berhasil Diperbarui','Produk sudah memiliki data baru.'
        );
      } catch (err) {
        Alert.alert('Ada error untuk memperbarui produk!', err.message);
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("Tidak ada dokumen tersebut!");
    }
  })
};

// API 10: updateakunTanpafoto
// PERBARUI DATA AKUN
// DI FIRESTORE TANPA FOTO DI STORAGE

export async function updateakunTanpafoto(namaakun, tokoakun, phoneakun){

  const auth = getAuth();
  const db = getFirestore(app);
  // const docRef = doc(db, "mitra", auth.currentUser.uid);
  // const colRef = collection(docRef, "produk")
  // const storage = getStorage();
  
  const docrefproduk = doc(db, "mitra", auth.currentUser.uid);
  getDoc(docrefproduk).then(docSnap => {
    if (docSnap.exists()) {
      try{
        updateDoc(docrefproduk, {
          namalengkap: namaakun,
          namatoko: tokoakun,
          phone: phoneakun,
        });
        Alert.alert(
          'Data akun berhasil diperbarui','Data akunmu sudah terbarui.'
        );
      } catch (err) {
        Alert.alert('Ada error untuk memperbarui data akunmu!', err.message);
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("Tidak ada dokumen tersebut!");
    }
  })
}; 

// API 11: updateakunDenganfoto
// PERBARUI DATA AKUN
// DI FIRESTORE DENGAN FOTO DI STORAGE

export async function updateakunDenganfoto(fotoakun, namaakun, tokoakun, phoneakun){
  const urlgambarbaru = await uploadgambarakun(fotoakun);

  const auth = getAuth();
  const db = getFirestore(app);

  const storage = getStorage();
  
  const docrefproduk = doc(db, "mitra", auth.currentUser.uid);
  getDoc(docrefproduk).then(docSnap => {
    if (docSnap.exists()) {
      if(docSnap.data().foto_akun) {
        const imgURL =  docSnap.data().foto_akun;
        const storageRef = ref(storage, imgURL);
        try{
          deleteObject(storageRef);
          updateDoc(docrefproduk, {
            foto_akun: urlgambarbaru,
            namalengkap: namaakun,
            namatoko: tokoakun,
            phone: phoneakun,
          });
          Alert.alert(
            'Data Akun Berhasil Diperbarui','Foto lama kamu juga sudah yang terbaru.'
          );
        } catch (err) {
          Alert.alert('Ada error untuk memperbarui data akun!', err.message);
        };
      } else{
        try{
          updateDoc(docrefproduk, {
            foto_akun: urlgambarbaru,
            namalengkap: namaakun,
            namatoko: tokoakun,
            phone: phoneakun,
          });
          Alert.alert(
            'Data Akun Berhasil Diperbarui','Data akunmu sudah terbarui.'
          );
        } catch (err) {
          Alert.alert('Ada error untuk memperbarui data akun!', err.message);
        };
      }
      
    } else {
      // doc.data() will be undefined in this case
      console.log("Tidak ada dokumen tersebut!");
    }
  })
};

// API 12: uploadgambarakun
// UPLOAD FOTO AKUN YANG DIOPER KE
// FUNGSI FIRESTORE SELANJUTNYA

async function uploadgambarakun(uri) {
  try{
    const uploadUri = uri;
    let extension = uploadUri.substring(uploadUri.lastIndexOf('.') + 1);

    // Add uuid to File Name
    filename = uuidv4() + '.' + extension;

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
    const fileRef = ref(getStorage(app), `mitra/${filename}`);
    const result = await uploadBytes(fileRef, blob);
    
    // We're done with the blob, close and release it
    blob.close();
    
    return await getDownloadURL(fileRef);
  } catch (err) {
    Alert.alert('Ada error pada foto akun!', err.message);
  }
};

// API 13: updatestatus
// UPDATE STATUS PEDAGANG
// MENJADI AKTIF/TIDAK AKTIF

export async function updatestatus(status_sekarang){

  const auth = getAuth();
  const db = getFirestore(app);

  const docrefproduk = doc(db, "mitra", auth.currentUser.uid);
  getDoc(docrefproduk).then(docSnap => {
    if (docSnap.exists()) {
      try{
        if(status_sekarang == true ){
           updateDoc(docrefproduk, {
            status_sekarang:"Aktif",     
          });
          Alert.alert(
            'Status berhasil diperbarui','Anda sekarang aktif terlacak calon pelanggan.'          
          );
        } else {
          updateDoc(docrefproduk, {
            status_sekarang:"Tidak Aktif",     
          });
          Alert.alert(
            'Status berhasil diperbarui','Anda sekarang tidak terlacak calon pelanggan.'          
          );
        }   
      } catch (err) {
        Alert.alert('Ada error untuk memperbarui status!', err.message);
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("Tidak ada dokumen tersebut!");
    }
  })
}; 

// API 14: updatemangkal
// UPDATE STATUS MANGKAL PEDAGANG
// MENJADI YA/TIDAK 

export async function updatemangkal(mangkal){

  const auth = getAuth();
  const db = getFirestore(app);

  const docrefproduk = doc(db, "mitra", auth.currentUser.uid);
  getDoc(docrefproduk).then(docSnap => {
    if (docSnap.exists()) {
      try{
        if(mangkal == true ){
          updateDoc(docrefproduk, {
          mangkal: true,     
          });
          Alert.alert(
            'Status mangkal sudah aktif','Anda sekarang tidak bisa dipanggil oleh pelanggan via aplikasi dan pastikan anda berada di posisi mangkal.'          
          );
        } else {
          updateDoc(docrefproduk, {
          mangkal: false,     
          });
        }   
      } catch (err) {
        Alert.alert('Ada error untuk memperbarui status!', err.message);
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("Tidak ada dokumen tersebut!");
    }
  })
}; 


// API 15: buatTransaksi
// MEMBUAT TRANSAKSI UNTUK TEMU LANGSUNG. 

export const buatTransaksiTL = async ( namamitra, namatoko, namapelanggan, kodeUID, kelompokProduk, subtotalhargaKeranjang, hargalayanan, hargatotalsemua, jumlah_kuantitas) => {  
  const auth = getAuth();
  const db = getFirestore(app);
  try{
    addDoc(collection(db, "transaksi"), {
      id_mitra: auth.currentUser.uid, 
      namamitra: namamitra,
      namatoko: namatoko,
      namapelanggan: namapelanggan,
      id_pelanggan: kodeUID,
      waktu: serverTimestamp(),
      jenislayanan: 'Temu Langsung',
      produk: kelompokProduk,
      hargasubtotal: subtotalhargaKeranjang,
      hargalayanan: hargalayanan,
      hargatotalsemua: hargatotalsemua,
      jumlah_kuantitas: jumlah_kuantitas,
    })
  } catch(err){
    console.log('Ada Error Membuat Tranksaksi.', error);
  };
};