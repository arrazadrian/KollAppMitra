import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Abu, Ijo, IjoTua, Putih } from '../Utils/Warna';
import { 
    KasbonScreen,
    LunasScreen, 
  } from '../Screens/Index.js'


const Tab = createMaterialTopTabNavigator();

const TopTabKasbon = ({ navigation }) => {
  return (
    <Tab.Navigator
        initialRouteName='ProsesScreen'
        screenOptions={{
            tabBarActiveTintColor: Putih,
            tabBarInactiveTintColor: IjoTua,
            tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
            tabBarStyle: { backgroundColor: Ijo, paddingTop: StatusBar.currentHeight},
        }}
    >   

        <Tab.Screen 
            name="KasbonScreen" 
            component={KasbonScreen} 
            options={{ tabBarLabel: "Belum Lunas" }} />
        
        <Tab.Screen 
            name="LunasScreen" 
            component={LunasScreen} 
            options={{ tabBarLabel: "Sudah Lunas" }} />
    </Tab.Navigator>
  )
}

export default TopTabKasbon

const styles = StyleSheet.create({})