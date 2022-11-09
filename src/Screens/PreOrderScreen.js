import { StyleSheet, Text, View, Pressable, Dimensions, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, {useEffect, useState, useRef, useCallback} from 'react'
import { Ijo, IjoTua, Kuning, Putih, IjoMint  } from '../Utils/Warna'
import ListProduk from '../Components/ListProduk'
import PencarianBar from '../Components/PencarianBar'
import ProdukKosong from '../Components/ProdukKosong'
//import { daftarproduk } from '../Data/daftarproduk'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { updateKategori } from '../features/kategoriSlice'
import { jeniskategori } from '../Data/jeniskategori'
import { useDispatch, useSelector } from 'react-redux';
import GarisBatas from '../Components/GarisBatas'
import { useFocusEffect } from '@react-navigation/native';


const { width, height } = Dimensions.get('window')

const kosongprekategori = () => {
  return(
  <View style={{alignItems:'center'}}>
    <ProdukKosong/>
    <Text style={{
      fontSize: 16, color: IjoTua, textAlign:'center',
      width: width*0.8,
    }}>
      Kamu tidak punya produk pre-order kategori ini
    </Text>
  </View>
  )
};

const kosongpre = () => {
  return(
  <View style={{alignItems:'center'}}>
    <ProdukKosong/>
    <Text style={{
      fontSize: 16, color: IjoTua, textAlign:'center',
      width: width*0.8,
    }}>
      Kamu tidak punya produk pre-order sama sekali
    </Text>
  </View>
  )
};

const ataspre = () => {
  const[pilkategori, setPilkategori]= useState("Semua Produk")
  const dispatch = useDispatch();

  useEffect(() => {
    const pilihKategori = () => {
      dispatch(updateKategori({pilkategori}));
      console.log("Kategori yg dipilih: " + pilkategori)
    };
    pilihKategori();
  }, [pilkategori]);

  return(
    <View style={{paddingTop: 10}}>
      <View style={{ paddingHorizontal: 10, marginBottom:5 }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: IjoTua}}>Kategori</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingStart: 10, paddingEnd: 10}}>
        {jeniskategori.map((item, index) => (
          <TouchableOpacity key={index}
            style={{backgroundColor: pilkategori == item.nama ? IjoMint : Putih, ...styles.kartuKategori}}
            onPress={() =>setPilkategori(item.nama)}>
            <View style={ styles.kategoripilihan}>
                <Image source={item.image} style={styles.gambar} />
            </View>
            <Text style={{color: pilkategori == item.nama ? Ijo : IjoTua,...styles.nama}}>{item.nama}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <GarisBatas/>
      <View style={{marginBottom: 10, paddingHorizontal: 10}}>
        <Text style={styles.judul}>Produk Pre-Order</Text>
        <Text style={styles.deskripsi}>Produk yang diantar satu hari setelah pemesanan.</Text>
      </View>
    </View>
  )
}

const PreOrderScreen = ({navigation}) => {

  const[produkpreorder,setProdukpreorder] = useState();
  const[sizepre,setSizepre] = useState();
  const { pilkategori } = useSelector(state => state.kategori);

   //Dapetin data produk pre-order, putus listener kalo pindah halaman
   useFocusEffect(
    useCallback(() => {
      const auth = getAuth();
      const db = getFirestore(app);
      const docRef = doc(db, "mitra", auth.currentUser.uid);
      const colRef = collection(docRef, "produk")
      if(pilkategori == "Semua Produk"){
        const q = query(colRef, where("jenis", "==", "Produk pre-order"), orderBy("waktudibuat","desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const listProdukpreorder = []; 
          querySnapshot.forEach(doc => listProdukpreorder.push({...doc.data(), id: doc.id}));
          setProdukpreorder(listProdukpreorder);
          setSizepre(querySnapshot.size)
        });
        return () => {
          console.log('Produk Pre-Order Unmounted'); 
          unsubscribe();
        }
      } else {
        const qq = query(colRef, where("jenis", "==", "Produk pre-order"), where("kategori", "==", pilkategori), orderBy("waktudibuat","desc"));
        const unsubscribe = onSnapshot(qq, (querySnapshot) => {
          const listProdukpreorder = []; 
          querySnapshot.forEach(doc => listProdukpreorder.push({...doc.data(), id: doc.id}));
          setProdukpreorder(listProdukpreorder);
        });
        return () => {
          console.log('Produk Pre-Order Unmounted'); 
          unsubscribe();
        }
      }
    },[pilkategori])
  );


  return (
    <View style={styles.latar}>
      {!produkpreorder ? (
        <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
          <ActivityIndicator size="large" color={IjoTua}/>
        </View>
      ):(
     <View>
      <View>
       <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:80}} 
          numColumns={3}
          columnWrapperStyle={{justifyContent:'space-around'}}
          data={produkpreorder}
          renderItem= {({item}) => <ListProduk item={item} />}
          keyExtractor={ item => item.id}
          ListHeaderComponent={ataspre}
          ListEmptyComponent={ sizepre < 1 ?
            (kosongpre) : (kosongprekategori)
          }
          ListFooterComponent={<View style={{height:10}}></View>}
       />
      </View>
      </View>
      )}
    <Pressable style={styles.tambah}
          onPress={() => navigation.navigate('TambahPreScreen')}
          >
          <Text style={{fontSize:30, fontWeight:'bold', color: Putih}}>
          +</Text>
    </Pressable>
  </View>
  )
}

export default PreOrderScreen

const styles = StyleSheet.create({
  latar: {
    backgroundColor: Kuning,
    flex: 1,
  },
  judul:{
    fontSize: 20,
    fontWeight: 'bold',
    color: Ijo,
  },
  deskripsi:{
    fontSize: 16,
    color: IjoTua,
  },
  tambah:{
    position: 'absolute',
    bottom: 20,
    right: 10,
    height: 70,
    width: 70,
    backgroundColor: Ijo,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logopojok:{
    width: 80,
    height: 40,
  },
  nama:{
    fontSize: 14,
    fontWeight: 'bold',
    width: 60,
  },  
  gambar:{
    width: width*0.1,
    height: width*0.1,
  },
  kartuKategori:{
    flexDirection: 'row',
    alignSelf:'center',
    marginRight: 10,
    marginBottom: 10,
    padding: 5,
    borderRadius: 50,
    justifyContent:'flex-start',
    alignItems:'center',
  },
  kategoripilihan:{
    alignItems:'center',
    padding: 5, 
    borderRadius: 50, 
    marginRight: 10,
    backgroundColor: Putih,
  },
})