import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer, useRoute } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './home/home';
import DailyWeatherForecast from './daily_weather_forecast/daily_weather_forecast';
import TodayWeatherCast from './today_weather_cast/today_weather_cast';
import Search from './search/search';
import SplashScreen from './splash/splash';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const route = useRoute();
  const { data } = route.params || {};

  return (
    <Drawer.Navigator initialRouteName='Home' screenOptions={{ headerShown:false }} >
      <Drawer.Screen name="Home">
        {props => <Home {...props} extraData={data} />} 
      </Drawer.Screen>
      <Drawer.Screen name='DailyForecast' component={DailyWeatherForecast}/>
      <Drawer.Screen name='TodayForecast' component={TodayWeatherCast}/>
    </Drawer.Navigator>
  )
}

export default function index() {
  return (
    <NavigationContainer
      independent={true}
    >
      <Stack.Navigator screenOptions={{ headerShown:false }} initialRouteName="Splash">
        <Stack.Screen name='Splash' component={SplashScreen}/>
        <Stack.Screen name='Drawer' component={DrawerNavigator}/>
        <Stack.Screen name='Search' component={Search}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}