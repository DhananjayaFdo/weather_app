import { View, Text, Image, ImageBackground, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import IconButton from '../../components/IconButton';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import OptionsRow from './components/OptionsRow';
import Weathers from './components/AdditionalWeathers';
import TemperatureShower from './components/TemperatureShower';
import { useRouter } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';

export default function Home({extraData ,navigation}) {
    // const { data } = route.params;
 
    isLoading = false;
    const router = useRouter();

  // weather options
  const options = [
    { icon: require("../../assets/images/openWeatherIcons/img.png"), name: "Max Temp", "value": extraData.main.temp_max+"\u2103" },
    { icon: require("../../assets/images/openWeatherIcons/humidity.png"), name: "Humidity" ,"value": extraData.main.humidity+"%"  },
    { icon: require("../../assets/images/openWeatherIcons/wind.png"), name: "Wind" ,"value": extraData.wind.speed+"2.51 m/s"},
];

// weather options
const wethers = [
   { "temp": "28.86 \u2103", "status":"SCATTERED CLOUD", "cloud": require("../../assets/images/openWeatherIcons/11d.png"), "time": "11:30 AM"},
   { "temp": "28.86 \u2103", "status":"SCATTERED CLOUD", "cloud": require("../../assets/images/openWeatherIcons/11d.png"), "time": "11:30 AM"},
   { "temp": "28.86 \u2103", "status":"SCATTERED CLOUD", "cloud": require("../../assets/images/openWeatherIcons/11d.png"), "time": "11:30 AM"},
];

 function setBackground() {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18 ? require("../../assets/images/BGImages/1.jpg") : require("../../assets/images/BGImages/4.jpg");
   
}

function navToSearch(){
   return router.push('../search/search')
}

function formatDateTime() {
    const date = new Date();
  
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
    const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date);
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const time = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  
    return `${dayName} ${day} ${month} ${time}`;
  }

  const convertKelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  }; 

  const  navToHome = () => {
    navigation.navigate('Home');
  }

  const  navToSave = () => {
    navigation.navigate('SaveLocations');
  }
  

if(isLoading){
    return (
        <View></View>
    )
}

return (
<View className="flex-1">
    <ImageBackground
        style={{ width: wp(100),height:hp(100) }} 
        source={setBackground()}
        className="px-2"
    >

    <StatusBar style="light"/>

    <SafeAreaView/>

    {/* Icon Button */}
    <View className="flex-row justify-between">
        <View className="flex-row">
            <IconButton icon={'menu'} method={ navigation.openDrawer}/>
            <IconButton icon={'refresh-cw'}  method={navToHome}/>
        </View>

        <View className="flex-row">
            <IconButton icon={'star'} method={navToSave}/>
            <IconButton icon={'search'} method={navToSearch}/>

        </View>
    </View>

    {/* Location Shower */}
    <View className="flex-row items-center justify-center">
            <Entypo name="location-pin" size={hp(4)} color={'#ffffff'}/>
            <Text style={{ fontSize: hp(4) }} className="text-white font-bold shadow-sm">{extraData.name}</Text>
    </View>

    {/* date time view */}
    <View className="flex items-center">
        <Text style={{ fontSize: hp(2) }} className="text-white">{formatDateTime()}</Text>
    </View>

    {/* Temperature view */}
    <TemperatureShower status={extraData.weather[0].description} temp={convertKelvinToCelsius(extraData.main.temp)}/>

    {/* options show */} 
    <OptionsRow options={options}/>

    {/* Other weather options */}
    <Weathers wethers={wethers}/>

    </ImageBackground>
</View>
)
}