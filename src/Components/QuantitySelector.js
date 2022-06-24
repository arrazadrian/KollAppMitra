import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Minus, Plus } from '../assets/Icons/Index'


const QuantitySelector = ({quantity,setQuantity,total,setTotal}) => {
    
    const onMinus = () => {
        setQuantity(Math.max(0, quantity - 1));
    //    setTotal(Math.max(0, total - 1));
    }
  
    const onPlus = () => {
        setQuantity(quantity + 1);
    //    setTotal(total + 1);
    }

    return (
    <View style={{flexDirection:'row', marginTop: 5, justifyContent:'space-around', alignItems:'center'}}>
        <Pressable onPress={onMinus}> 
            <Minus/>
        </Pressable>
        <Text style={{fontSize: 20}}>{quantity}</Text>
        <Pressable onPress={onPlus}>
            <Plus/>
        </Pressable>
    </View>
  )
}

export default QuantitySelector

const styles = StyleSheet.create({})