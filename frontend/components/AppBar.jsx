import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import Home from '../app/home/home'


export default function AppBar({title, isWhite = false}) {
 const router = useRouter();  

  return (
    <View className="flex-row items-center my-3">
    <TouchableOpacity
      onPress={() => router.back()}
    >
      <Ionicons name="arrow-back-outline" className="mp-6" size={wp(8)} color={isWhite ? "#FFFFFF" : "#000000"}/>
    </TouchableOpacity>


    <Text 
      className="ml-3"
      style={{ fontSize: wp(5),color: isWhite ? "#FFFFFF" : "#000000" }}
    >{title}</Text>
  </View>
  )
}