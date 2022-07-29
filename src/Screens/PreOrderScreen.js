import { StyleSheet, Text, View, Pressable, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { Ijo, IjoTua, Kuning, Putih,  } from '../Utils/Warna'
import ListProduk from '../Components/ListProduk'
import PencarianBar from '../Components/PencarianBar'
import ProdukKosong from '../Components/ProdukKosong'
import { daftarpreproduk } from '../Data/daftarpreproduk'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';

const { width, height } = Dimensions.get('window')

const kosongpre = () => {
  return(
  <View style={{alignItems:'center'}}>
    <ProdukKosong/>
    <Text style={{
      fontSize: 16, color: IjoTua, textAlign:'center',
      width: width*0.8,
    }}>
      Kamu tidak punya produk pre-order. Buat produk pre-order
      dengan ketuk tanda plus di kanan bawah.
    </Text>
  </View>
  )
}

const ataspre = () => {
  return(
    <View>
      <View style={{flexDirection:'row', marginVertical:10}}>
        <PencarianBar />
      </View>
      <View style={{marginBottom: 10}}>
        <Text style={styles.judul}>Produk Pre-Order</Text>
        <Text style={styles.deskripsi}>Produk yang diantar satu hari setelah pemesanan.</Text>
      </View>
    </View>
  )
}

const PreOrderScreen = ({navigation}) => {

  const[produkpreorder,setProdukpreorder] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  useEffect(()=>{
    const fetchProdukPreOrder = async() => {
      try{
        const list = []; 
        const auth = getAuth();
        const db = getFirestore(app);
        const docRef = doc(db, "mitra", auth.currentUser.uid);
        const colRef = collection(docRef, "produk")

        const q = query(colRef, where("jenis", "==", "Produk pre-order"), orderBy("waktudibuat","desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const { image, harga, namaproduk, deskproduk, kuantitas, satuan, kategori} = doc.data();
          list.push({
            id: doc.id,
            namaproduk,
            deskproduk,
            image,
            harga,
            kuantitas,
            satuan,
            kategori,
          });
        });

        if (componentMounted.current){ // (5) is component still mounted?
          setProdukpreorder(list); // (1) write data to state
          setLoading(false); // (2) write some value to state
        }
        return () => { // This code runs when component is unmounted
            componentMounted.current = false; // (4) set it to false when we leave the page
        }

      } catch(err){
        console.log(err);
      }
    }
    fetchProdukPreOrder();
  },[])


  return (
    <View style={styles.latar}>
      {loading ? (
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
          ListEmptyComponent={kosongpre}
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
    paddingHorizontal: 10,
  },
  judul:{
    fontSize: 20,
    fontWeight: 'bold',
    color: IjoTua,
  },
  deskripsi:{
    fontSize: 16,
    color: IjoTua,
  },
  tambah:{
    position: 'absolute',
    bottom: 15,
    right: 20,
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
})