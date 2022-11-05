import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
   } from "firebase/auth";
import { 
  getFirestore, collection, 
  addDoc, setDoc, doc, 
  serverTimestamp, 
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

export async function registration(email, password, namalengkap, namatoko, buka, tutup, geo, alamat, geohash, phone ) {
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
                waktu_buka: buka,
                waktu_tutup: tutup,
                geo: geo,
                alamat: alamat,
                geohash: geohash,
                phone: phone,
                status_sekarang: "Tidak Aktif",
                mangkal: false,
                dipanggil: false,
                rating_layanan: 0, 
                rating_produk: 0, 
                jml_nilai_layanan: 0,
                jml_nilai_produk: 0,
                nilai_masuk: 0,  
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
  const docrefakun = doc(db, "mitra", auth.currentUser.uid);
  getDoc(docrefakun).then(docSnap => {
    if (docSnap.exists()) {
      try {
        if(docSnap.data().status_sekarang == "Aktif" && docSnap.data().mangkal == true ){
          updateDoc(docrefakun, { status_sekarang: "Tidak Aktif", mangkal: false });
          signOut(auth);
        } else if (docSnap.data().status_sekarang == "Aktif"){
          updateDoc(docrefakun, { status_sekarang: "Tidak Aktif" });
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
    tersedia: true,
  })
  .then(() => {
    Alert.alert(
      'Produk Berhasil Dibuat','Produk masuk daftar produk utama.'
    );
  })
  .catch((err) => {
    console.log('Something went wrong with added product to firestore.', err.message);
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
    tersedia: true,
  })
  .then(() => {
    Alert.alert(
      'Produk Berhasil Dibuat','Produk masuk daftar produk pre-order.'
    );
  })
  .catch((err) => {
    console.log('Ada yg salah saat menambahkan produk di firestore.', err.message);
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

export async function updateprodukTanpafoto (produkid, namaprodukbaru, deskprodukbaru, hargabaru, kuantitasbaru, satuanbaru, kategoribaru, tersediabaru){

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
          tersedia: tersediabaru,
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

export async function updateprodukDenganfoto (produkid, namaprodukbaru, deskprodukbaru, imagebaru, hargabaru, kuantitasbaru, satuanbaru, kategoribaru, tersediabaru){
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
          tersedia: tersediabaru,
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

export async function updateakunTanpafoto(namaakun, tokoakun, phoneakun, buka, tutup, geo, alamat, geohash){

  const auth = getAuth();
  const db = getFirestore(app);
  // const docRef = doc(db, "mitra", auth.currentUser.uid);
  // const colRef = collection(docRef, "produk")
  // const storage = getStorage();
  
  const docrefakun = doc(db, "mitra", auth.currentUser.uid);
  getDoc(docrefakun).then(docSnap => {
    if (docSnap.exists()) {
      try{
        updateDoc(docrefakun, {
          namalengkap: namaakun,
          namatoko: tokoakun,
          phone: phoneakun,
          waktu_buka: buka,
          waktu_tutup: tutup,
          geo: geo,
          alamat: alamat,
          geohash: geohash,
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
// PERBARUI DATA AKUN,  YG SEBELUMNYA ADA FOTO (IF) MAUPUN YG TIDAK ADA (ELSE)
// DI FIRESTORE DENGAN FOTO DI STORAGE

export async function updateakunDenganfoto(fotoakun, namaakun, tokoakun, phoneakun, buka, tutup, geo, alamat, geohash){
  const urlgambarbaru = await uploadgambarakun(fotoakun);

  const auth = getAuth();
  const db = getFirestore(app);

  const storage = getStorage();
  
  const docrefakun = doc(db, "mitra", auth.currentUser.uid);
  getDoc(docrefakun).then(docSnap => {
    if (docSnap.exists()) {
      if(docSnap.data().foto_akun) {
        const imgURL =  docSnap.data().foto_akun;
        const storageRef = ref(storage, imgURL);
        try{
          deleteObject(storageRef);
          updateDoc(docrefakun, {
            foto_akun: urlgambarbaru,
            namalengkap: namaakun,
            namatoko: tokoakun,
            phone: phoneakun,
            waktu_buka: buka,
            waktu_tutup: tutup,
            geo: geo,
            alamat: alamat,
            geohash: geohash,
          });
          Alert.alert(
            'Data Akun Berhasil Diperbarui','Foto lama kamu juga sudah yang terbaru.'
          );
        } catch (err) {
          Alert.alert('Ada error untuk memperbarui data akun!', err.message);
        };
      } else{
        try{
          updateDoc(docrefakun, {
            foto_akun: urlgambarbaru,
            namalengkap: namaakun,
            namatoko: tokoakun,
            phone: phoneakun,
            waktu_buka: buka,
            waktu_tutup: tutup,
            geo: geo,
            alamat: alamat,
            geohash: geohash,
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

  const docrefakun = doc(db, "mitra", auth.currentUser.uid);
  getDoc(docrefakun).then(docSnap => {
    if (docSnap.exists()) {
      try{
        if(status_sekarang == true ){
           updateDoc(docrefakun, {
            status_sekarang:"Aktif",     
          });
          Alert.alert(
            'Status berhasil diperbarui','Anda sekarang berstatus aktif berjualan.'          
          );
        } else {
          updateDoc(docrefakun, {
            status_sekarang:"Tidak Aktif",     
          });
          Alert.alert(
            'Status berhasil diperbarui','Anda sekarang berstatus tidak berjualan.'          
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

  const docrefakun = doc(db, "mitra", auth.currentUser.uid);
  getDoc(docrefakun).then(docSnap => {
    if (docSnap.exists()) {
      try{
        if(mangkal == true ){
          updateDoc(docrefakun, {
          mangkal: true,     
          });
          Alert.alert(
            'Status mangkal sudah aktif','Anda sekarang tidak bisa dipanggil oleh pelanggan via aplikasi dan pastikan anda berada di posisi mangkal.'          
          );
        } else {
          updateDoc(docrefakun, {
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

// API 15: buatTransaksiTL
// MEMBUAT TRANSAKSI UNTUK TEMU LANGSUNG. 

export const buatTransaksiTL = async ( namamitra, namatoko, namapelanggan, id_pelanggan, kelompokProduk, subtotalhargaKeranjang, hargalayanan, hargatotalsemua, jumlah_kuantitas, pembayaran, id_voucher, potongan) => {  
  const auth = getAuth();
  const db = getFirestore(app);
  try{
  const docRef = await addDoc(collection(db, "transaksi"), {
      id_mitra: auth.currentUser.uid, 
      namamitra: namamitra,
      namatoko: namatoko,
      namapelanggan: namapelanggan,
      id_pelanggan: id_pelanggan,
      waktu_selesai: serverTimestamp(),
      jenislayanan: 'Temu Langsung',
      status_transaksi: 'Selesai',
      produk: kelompokProduk,
      hargasubtotal: subtotalhargaKeranjang,
      hargalayanan: hargalayanan,
      hargatotalsemua: hargatotalsemua,
      jumlah_kuantitas: jumlah_kuantitas,
      pembayaran: pembayaran,
      id_voucher: id_voucher,
      potongan: potongan,
   });
    console.log("ID dokumenTLnya: ", docRef.id)
    return docRef.id;
  } catch(err){
    console.log('Ada Error Membuat Tranksaksi.', err.message);
  };
};

// API 16: selesaikanPO
// UPDATE PO JADI TRANSAKSI YANG SELESAI

export const selesaikanPO = async (id_transaksi, pembayaran) => {
    const db = getFirestore(app);
    const docreftran = doc(db, "transaksi", id_transaksi);
    getDoc(docreftran).then(docSnap => {
      if (docSnap.exists()) {
        try {
            updateDoc(docreftran, {
              pembayaran: pembayaran,
              status_transaksi: "Selesai", 
              waktu_selesai: serverTimestamp(), 
            });
        } catch (err) {
          Alert.alert('Ada error untuk menyelesaikan PO!', err.message);
        }
      }
    })
};

// API 16: batalkanPO
// UPDATE PO JADI TRANSAKSI YANG SELESAI

export const batalkanPO = async (id_transaksi, id_voucher, potongan) => {
    const db = getFirestore(app);
    const docreftran = doc(db, "transaksi", id_transaksi);
    if(potongan > 0){
      await kurangiTersediaVoucher(id_voucher, potongan)
      getDoc(docreftran).then(docSnap => {
        if (docSnap.exists()) {
          try {
              updateDoc(docreftran, {
                status_transaksi: "Selesai", 
                pembatalan: "Dibatalkan Mitra", 
                waktu_selesai: serverTimestamp(), 
              });
          } catch (err) {
            Alert.alert('Ada error untuk membatalkan PO!', err.message);
          }
        }
      })
    } else {
      getDoc(docreftran).then(docSnap => {
        if (docSnap.exists()) {
          try {
              updateDoc(docreftran, {
                status_transaksi: "Dibatalkan Mitra", 
              });
          } catch (err) {
            Alert.alert('Ada error untuk menyelesaikan PO!', err.message);
          }
        }
      })
    }
};

// API 17: terimaPM
// UPDATE PANGGILAN PM JADI DITERIMA 

export const terimaPM = async (id_transaksi, estimasi_waktu) => {
  const auth = getAuth();
  const db = getFirestore(app);
  const docreftran = doc(db, "transaksi", id_transaksi);
  const docrefmit = doc(db, "mitra", auth.currentUser.uid);
  getDoc(docreftran).then(docSnaptran => {
    if (docSnaptran.exists()) {
      try {
          updateDoc(docreftran, { 
            panggilan: "Diterima", 
            estimasi_waktu: estimasi_waktu, 
          });
      } catch (err) {
        Alert.alert('Ada error merima PM!', err.message);
      }
    }
  })
  getDoc(docrefmit).then(docSnapmit => {
    if (docSnapmit.exists()) {
      try {
          updateDoc(docrefmit, { 
            dipanggil: true, 
          });
      } catch (err) {
        Alert.alert('Ada error merima PM!', err.message);
      }
    }
  })
};

// API 18: tolakPM
// UPDATE PANGGILAN PM DITOLAK 

export const tolakPM = async (id_transaksi) => {
  const db = getFirestore(app);
  const docrefproduk = doc(db, "transaksi", id_transaksi);
  getDoc(docrefproduk).then(docSnap => {
    if (docSnap.exists()) {
      try {
          updateDoc(docrefproduk, { 
            panggilan: "Ditolak", 
            status_transaksi: "Ditolak",  
          });
      } catch (err) {
        Alert.alert('Ada error merima PM!', err.message);
      }
    }
  })
};

// API 19: batalPMolehMitra
// Mitra membatalkan panggilan saat otw

export const batalPMolehMitra = async (id_transaksi) => {
  const auth = getAuth();
  const db = getFirestore(app);
  const docreftran = doc(db, "transaksi", id_transaksi);
  const docrefmit = doc(db, "mitra", auth.currentUser.uid);
  const docSnaptran = await getDoc(docreftran);
  const docSnapmit = await getDoc(docrefmit);
  try{
    if(docSnaptran.exists() && docSnapmit.exists()){
      updateDoc(docreftran, { 
        pembatalan: "Dibatalkan Mitra", 
        status_transaksi: "Selesai",
        waktu_selesai: serverTimestamp(),  
      });
      updateDoc(docSnapmit, { 
        dipanggil: false, 
      });
    }
  } catch (err) {
    Alert.alert('Ada error merima PM!', err.message);
  }
};

// API 20: sampaiPM
// UPDATE PANGGILAN PM JADI SAMPAI
// KARENA SUDAH SAMPAI 

export const sampaiPM = async (id_transaksi) => {
  const db = getFirestore(app);
  const docreftran = doc(db, "transaksi", id_transaksi);
  getDoc(docreftran).then(docSnap => {
    if (docSnap.exists()) {
      try {
          updateDoc(docreftran, { 
            panggilan: "Sudah Sampai",
          });
      } catch (err) {
        Alert.alert('Ada error saat PM sudah sampai!', err.message);
      }
    }
  })
};

// API 21: selesaikanPM
// UPDATE PANGGILAN PM JADI SAMPAI
// KARENA SUDAH SAMPAI 

export const selesaikanPM = async (id_transaksi, kelompokProduk, subtotalhargaKeranjang, hargalayanan, hargatotalsemua, jumlah_kuantitas, pembayaran, id_voucher, potongan) => {
  const auth = getAuth();
  const db = getFirestore(app);
  const docreftran = doc(db, "transaksi", id_transaksi);
  const docrefmit = doc(db, "mitra", auth.currentUser.uid);
  getDoc(docreftran).then(docSnap => {
    if (docSnap.exists()) {
      try {
          updateDoc(docreftran, { 
            produk: kelompokProduk,
            hargasubtotal: subtotalhargaKeranjang,
            hargalayanan: hargalayanan,
            hargatotalsemua: hargatotalsemua,
            jumlah_kuantitas: jumlah_kuantitas,
            panggilan: "Selesai", 
            status_transaksi: "Selesai",
            waktu_selesai: serverTimestamp(), 
            pembayaran: pembayaran, 
            id_voucher: id_voucher,
            potongan: potongan,
          });
      } catch (err) {
        Alert.alert('Ada error menyelesaikan PM1!', err.message);
      }
    }
  })
  getDoc(docrefmit).then(docSnapmit => {
    if (docSnapmit.exists()) {
      try {
          updateDoc(docrefmit, { 
            dipanggil: false, 
          });
      } catch (err) {
        Alert.alert('Ada error menyelesaikan PM2!', err.message);
      }
    }
  })
};

// API 22: buatKasbonBaru
// MEMBUAT KASBON BARU. 

export const buatKasbonBaru = async ( namamitra, namatoko, namapelanggan, id_pelanggan, phonepelanggan, hargatotalsemua, id_transaksi) => {  
  const auth = getAuth();
  const db = getFirestore(app);

  const docRef = doc(db, "mitra", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  try{
    if(docSnap.exists()){
    const docRef = await addDoc(collection(db, "kasbon"), {
        id_mitra: auth.currentUser.uid, 
        namamitra: namamitra,
        namatoko: namatoko,
        phonemitra: docSnap.data().phone,
        id_pelanggan: id_pelanggan,
        namapelanggan: namapelanggan,
        phonepelanggan: phonepelanggan,
        status_kasbon: "Belum Lunas",
        waktu_dibuat: serverTimestamp(),
        total_kasbon: hargatotalsemua,
      });
    const colRef = collection(docRef,"transaksi_kasbon")
    addDoc(colRef,{
      id_transaksi: id_transaksi,
      waktu_transaksi: serverTimestamp(),
      total_harga: hargatotalsemua,
    });
    }
  } catch(err){
    console.log('Ada Error Membuat Kasbon.', err.message);
  };
};

// API 23: lunaskanKasbon
// MENAMBAH TRANSAKSI DALAM KASBON. 

export const lunaskanKasbon = async (id_kasbon) => {  
  const db = getFirestore(app);
  const docRef = doc(db, "kasbon", id_kasbon);
  const docSnap = await getDoc(docRef);
  try{
    if(docSnap.exists()){
      updateDoc(docRef, { 
          status_kasbon: "Lunas", 
      });
    } else {
      console.log("No such document!");
    }
  } catch(err){
    console.log('Ada Error melunaskan kasbon.', err.message);
  };
};

// API 24: tambahTransaksiKasbon
// MENAMBAH TRANSAKSI DALAM KASBON. 

export const tambahTransaksiKasbon = async (id_kasbon, hargatotalsemua, id_transaksi) => {  
  const db = getFirestore(app);
  const docRef = doc(db, "kasbon", id_kasbon);
  const docSnap = await getDoc(docRef);
  const colRef = collection(docRef, "transaksi_kasbon");
  try{
    if(docSnap.exists()){
        let total_kasbon = docSnap.data().total_kasbon + hargatotalsemua;

        updateDoc(docRef, { 
            total_kasbon: total_kasbon, 
          });
           
        addDoc(colRef,{
          id_transaksi: id_transaksi,
          total_harga: hargatotalsemua,
          waktu_transaksi: serverTimestamp(),
        });
    } else {
      console.log("No such document!");
    }
  } catch(err){
    console.log('Ada Error manambah tranksaksi kasbon.', err.message);
  };
};

// API 25: updateVoucherMitra
// MENAMBAH JML DATA VOUCHER. 

export const updateVoucherMitra = async (id_voucher, potongan) => {  
  const auth = getAuth();
  const db = getFirestore(app);
  const docRefVou = doc(db, "promosi", id_voucher);
  const docSnapVou = await getDoc(docRefVou);
  const docRefMit = doc(db, "mitra", auth.currentUser.uid);
  const docSnapMit= await getDoc(docRefMit);
  try{
    if(docSnapVou.exists() && docSnapMit.exists()){
      let awal_pengguna =  docSnapVou.data().jml_pengguna
      let awal_poin =  docSnapMit.data().poin_potongan
      let jml_terbaru = awal_pengguna + 1
      await updateDoc(docRefVou, { 
          jml_pengguna: awal_pengguna + 1, 
      });
      updateDoc(docRefMit, { 
          poin_potongan: awal_poin + potongan, 
      });
      return jml_terbaru
    } else {
      console.log("No such document!");
    }
   
  } catch(err){
    console.log('Ada Error update voucher.', err.message);
  };
};

//API 26: updateTersediaVoucher
// VOUCHER SUDAH MEMENUHU KUOTA ATAU BELUM

export const updateTersediaVoucher = async (id_voucher, potongan) => {  
  const jml_terbaru = await updateVoucherMitra(id_voucher, potongan)

  const db = getFirestore(app);
  const docRef = doc(db, "promosi", id_voucher);
  const docSnap = await getDoc(docRef);
  try{
    if(docSnap.exists()){
      if( jml_terbaru >= docSnap.data().kuota){
        updateDoc(docRef, { 
          tersedia: false, 
        });
      }
    } else {
      console.log("No such document!");
    }
  } catch(err){
    console.log('Ada Error update kesediaan voucher.', err.message);
  };
};

// API 27: kurangVoucherMitra
// MENGURANGI JML DATA VOUCHER. 

export const kurangVoucherMitra = async (id_voucher, potongan) => {  
  const auth = getAuth();
  const db = getFirestore(app);
  const docRefVou = doc(db, "promosi", id_voucher);
  const docSnapVou = await getDoc(docRefVou);
  const docRefMit = doc(db, "mitra", auth.currentUser.uid);
  const docSnapMit= await getDoc(docRefMit);
  try{
    if(docSnapVou.exists() && docSnapMit.exists()){
      let awal_pengguna =  docSnapVou.data().jml_pengguna
      let awal_poin =  docSnapMit.data().poin_potongan
      let jml_terbaru = awal_pengguna - 1
      await updateDoc(docRefVou, { 
          jml_pengguna: awal_pengguna - 1, 
      });
      updateDoc(docRefMit, { 
          poin_potongan: awal_poin - potongan, 
      });
      return jml_terbaru
    } else {
      console.log("No such document!");
    }
   
  } catch(err){
    console.log('Ada Error update pengurangan voucher.', err.message);
  };
};

//API 28: kurangiTersediaVoucher
// VOUCHER SUDAH MEMENUHU KUOTA ATAU BELUM

export const kurangiTersediaVoucher = async (id_voucher, potongan) => {  
  const jml_terbaru = await kurangVoucherMitra(id_voucher, potongan)

  const db = getFirestore(app);
  const docRef = doc(db, "promosi", id_voucher);
  const docSnap = await getDoc(docRef);
  try{
    if(docSnap.exists()){
      if( jml_terbaru < docSnap.data().kuota){
        updateDoc(docRef, { 
          tersedia: true, 
        });
      }
    } else {
      console.log("No such document!");
    }
  } catch(err){
    console.log('Ada Error update kesediaan voucher.', err.message);
  };
};