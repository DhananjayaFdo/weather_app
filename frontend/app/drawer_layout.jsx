import 'react-native-gesture-handler';
import { View, Text, Image, ImageBackground, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Home from './home/home';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DailyWeatherForecast from './daily_weather_forecast/daily_weather_forecast';
import TodayWeatherCast from './today_weather_cast/today_weather_cast';



function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <Image 
            source={require("../assets/images/UIs/Splash Screen.png")}
            style={{ width:hp(10) , height: hp(10)}}
        />
       
        <DrawerItem
          label="Daily Forecast"
          onPress={() => props.navigation.navigate('DailyWeatherForecast')}
        />

        <DrawerItem
          label="Today Forecast"
          onPress={() => props.navigation.navigate('TodayWeatherCast')}
        />

        {/* <DrawerItem
          label="Today Forecast"
          onPress={() => props.navigation.navigate('TodayWeatherCast')}
        /> */}
      </DrawerContentScrollView>
    );
  }


export default function DrawerLayout({ route }) {
  const { weatherDetails } = route.weatherDetails;
  

    const Drawer = createDrawerNavigator();

    return (
        // <NavigationContainer independent={true}> 
        //     <Drawer.Navigator initialRouteName='Home' 
        //         drawerContent={(props) => <CustomDrawerContent {...props} />}
        //         screenOptions={{ headerShown: false }}
        //     >
        //         <Drawer.Screen name="Home" component={Home} initialParams={weatherDetails}/>
        //         <Drawer.Screen name="DailyWeatherForecast" component={DailyWeatherForecast}/>
        //         <Drawer.Screen name="TodayWeatherCast" component={TodayWeatherCast}/>
        //     </Drawer.Navigator>
        // </NavigationContainer>
        <View>
          <SafeAreaView/>
          <Text className="text-black">Hello {weatherDetails}</Text>
        </View>
    )
}