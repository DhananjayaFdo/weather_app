import { View, Text, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import AppBar from '../../components/AppBar'
import SunSetView from './components/SunSetView'
import Weathers from './components/AdditionalWeathers';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

export default function TodayWeatherCast({ navigation }) {


  // weather options
  const wethers = [
    { "temp": "28.86 \u2103", "status": "SCATTERED CLOUD", "cloud": require("../../assets/images/openWeatherIcons/11d.png"), "time": "11:30 AM" },
    { "temp": "28.86 \u2103", "status": "SCATTERED CLOUD", "cloud": require("../../assets/images/openWeatherIcons/11d.png"), "time": "11:30 AM" },
    { "temp": "28.86 \u2103", "status": "SCATTERED CLOUD", "cloud": require("../../assets/images/openWeatherIcons/11d.png"), "time": "11:30 AM" },
  ];

  return (
    <View className="flex-1 mx-2">
      <StatusBar />
      <SafeAreaView />

      {/* <AppBar title={'Today Weather Forecast'}/> */}

      <View className="flex-row items-center my-3">
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back-outline" className="mp-6" size={wp(8)} color={"#000000"} />
        </TouchableOpacity>


        <Text
          className="ml-3"
          style={{ fontSize: wp(5), color: "#000000" }}
        >Today Weather Forecast</Text>
      </View>

      <SunSetView />

      {/* Other weather options */}
      <Weathers wethers={wethers} />
    </View>
  )
}