import { StyleSheet, Text, View, FlatList} from 'react-native'
import React from 'react'
import { Kuning } from '../Utils/Warna'
import RiwayatCard from '../Components/RiwayatCard'

const RiwayatScreen = () => {
  return (
    <View style={styles.latar}>
      {/* <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingBottom:80}} 
                  numColumns={3}
                  columnWrapperStyle={{justifyContent:'space-around'}}
                  data={produkutama}
                  renderItem= {({item}) => <RiwayatCard item={item} />}
                  keyExtractor={(item) => item.id}
                  //ListHeaderComponent= {atasproduk}
                  //ListEmptyComponent={kosongproduk}
                  ListFooterComponent={<View style={{height:10}}></View>}
              /> */}
    </View>
  )
}

export default RiwayatScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
  },
})