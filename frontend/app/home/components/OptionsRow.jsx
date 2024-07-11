import { View, Text, Image, ImageBackground, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function OptionsRow({options}) {
    return (
      <View className="flex-row justify-evenly bg-white py-6 rounded-3xl my-2">
        {options.map((option, index) => (
          <View key={index} className="items-center">
              <Image source={option.icon} style={{ height: hp(3.2), width: hp(3.2) }}/>
              <Text className="my-1 text-slate-500">{option.name}</Text>
              <Text>{option.value}</Text>
          </View>
          
        ))}
      </View>
    );
  };