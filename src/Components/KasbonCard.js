import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Putih } from '../Utils/Warna'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const KasbonCard = () => {
  const navigation = useNavigation();
  

  return (
    <Pressable style={styles.card} onPress={()=> navigation.navigate('ReceiptKasbonScreen')}>
      <View>
        <Text style={styles.nama}>Antonia Kerona</Text>
        <Text>Mulai dari: 21 Sept 2021</Text>
      </View>
      <View>
        <Text style={{marginBottom: -5, fontSize: 12, textAlign:'right'}}>Total Kasbon</Text>
        <Text style={styles.total}>Rp400000</Text>
      </View>
    </Pressable>
  )
}

export default KasbonCard

const styles = StyleSheet.create({
    card:{
        backgroundColor: Putih,
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        elevation: 5,
        flexDirection: 'row',
        alignItems:'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    nama:{
        color: IjoTua,
        fontSize: 16,
        fontWeight: 'bold',
    },
    total:{
        color: Ijo,
        fontSize: 18,
        fontWeight: 'bold',
    },
})