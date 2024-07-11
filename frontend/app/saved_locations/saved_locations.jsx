import { View, Text, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SaveLocationScreen({navigation}) {
  return (
    <View className="">
        <StatusBar/>
        <SafeAreaView/>

      <View className="flex-row items-center my-3">
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back-outline" className="mp-6" size={wp(8)} color={"#000000"} />
        </TouchableOpacity>

        <Text
          className="ml-3"
          style={{ fontSize: wp(5), color: "#000000" }}
        >Saved Locations</Text>
      </View>
    </View>
  )
}