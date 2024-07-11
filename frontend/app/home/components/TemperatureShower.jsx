import { View, Text, Image, ImageBackground, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function TemperatureShower({status, temp}) {
  return (
    <View className="m-0 p-0">
        {/* temperature shower */}
        <View 
            style={{ width: wp(100)-16 }} 
            className="my-1 items-center"
        >
        
        <View className="flex-row">
          <Text 
            style={{ fontSize: hp(18) }}
            className="text-white"
          >
            {temp}
          </Text>

          <View className="flex  justify-center">
            <Text
              style={{ fontSize: hp(5) }}
              className="text-white"
            >o</Text>
            <View>
              <Image 
                source={require("../../../assets/images/icons/09n.png")}
                style={{ height: hp(10), width: hp(10) }}
              />
            </View>
          </View>

        </View>


        </View>

          {/* cloud status view */}
        <View className="flex items-center mt-1" >
            <Text style={{ fontSize: hp(3.5) }}  className=" text-white font-bold shadow-sm uppercase">{status}</Text>
        </View>
    </View>
    
  )
}