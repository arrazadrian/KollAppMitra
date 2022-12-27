import { StyleSheet, Text, View, Pressable, Image, Alert } from 'react-native'
import React from 'react'
import { AbuTua, Ijo, IjoTua, Putih } from '../Utils/Warna'
import { Bag } from '../assets/Images/Index'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from "react-redux";
import { pilihProdukKeranjang, totalHarga } from '../features/keranjangSlice'
import "intl";
import "intl/locale-data/jsonp/id";
import { handleBatallanjut } from '../../API/firebasemethod'

const KeranjangPM = () => {
  const items = useSelector(pilihProdukKeranjang)
  const navigation = useNavigation();
  const totalhargaKeranjang = useSelector(totalHarga)
  const { id_transaksi, hargalayanan } = useSelector(state => state.datapm);

  const handleTidakJadi =()=> {
    if(hargalayanan == 0){
      let biayaBatal = 5000
      Alert.alert(`Pelanggan tidak jadi berbelanja?`,`Pelanggan harus membayar biaya pembatalan sebesar Rp${biayaBatal} tunai.`,
          [
                {
                  text: 'Batal',
                  onPress: () => {
                    console.log('Batal dipencet')
                  }
                },
                {
                  text: 'Ya',
                  onPress: async () => {
                    await handleBatallanjut(id_transaksi, biayaBatal);
                    navigation.navigate('HomeScreen');
                  }
                }
          ]
      )
    } else { 
        Alert.alert(`Pelanggan tidak jadi berbelanja?`,`Pelanggan harus membayar biaya pembatalan sebesar Rp${hargalayanan} tunai.`,
          [
                {
                  text: 'Batal',
                  onPress: () => {
                    console.log('Batal dipencet')
                  }
                },
                {
                  text: 'Ya',
                  onPress: async () => {
                    await handleBatallanjut(id_transaksi, biayaBatal);
                    navigation.navigate('HomeScreen');
                  }
                }
          ]
        )
    }
  }

  return (
    <View>
      <View style={styles.pesan}>
                  <View style={{flexDirection:'row'}}>
                    <View style={{marginHorizontal: 10, justifyContent:'center'}}>
                      <Image source={Bag} style={{width:40, height:40}}/>
                    </View>
                    <View>
                      <Text style={{color:Putih, fontWeight:'bold'}}>
                          <Text>{items.length}</Text>
                          <Text>  </Text>
                          <Text>Produk</Text>
                      </Text>
                      <Text style={{color:Putih, fontWeight:'bold', fontSize: 20}}>
                          <Text>Rp{new Intl.NumberFormat('id-Id').format(totalhargaKeranjang).toString()}</Text>
                      </Text>
                    </View>
                  </View>
                  { !items.length ?
                    (
                      <Pressable 
                        style={{backgroundColor: Putih, padding: 10, borderRadius: 10}} 
                        onPress={handleTidakJadi}
                        >
                        <Text style={{color:Ijo, fontWeight:'bold', fontSize: 18}}>Tidak Jadi</Text>
                      </Pressable>
                    ):(
                      <Pressable 
                        disabled={!items.length}
                        style={{backgroundColor: IjoTua, padding: 10, borderRadius: 10}} 
                        onPress={()=>navigation.navigate('CheckoutPMScreen')}
                        >
                        <Text style={{color:Putih, fontWeight:'bold', fontSize: 18}}>Checkout</Text>
                      </Pressable>
                    )
                  }
                  
            </View>
    </View>
  )
}

export default KeranjangPM

const styles = StyleSheet.create({
    pesan:{
        flexDirection: 'row',
        backgroundColor: Ijo,
        alignItems:'center',
        justifyContent:'space-between',
        alignSelf:'center',
        padding: 10,
        borderRadius: 10,
        position: 'absolute',
        width: '95%',
        borderColor: IjoTua,
        borderWidth: 1,
        bottom:20,
      },
})