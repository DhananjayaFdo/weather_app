import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, PermissionsAndroid, Platform, Alert } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Weathers({ wethers }) {

  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is needed to show weather information.');
      return;
    }
    getLocation();
  };

  const getLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      fetchWeatherData(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to fetch location.');
    }
  };

  const fetchWeatherData = async (latitude, longitude) => {
    const apiKey = '0302d4fb14db57fc0b32d4d0448ff6d1';
    const url = `http://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=3&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data.list);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to fetch weather data.');
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const formattedTime = date.toLocaleTimeString('en-US', { hour12: true });
    return formattedTime;
  };

  const convertKelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  }; 

  if(weatherData == null){
    return <View></View>
  }

  if(weatherData.isEmpty){
    return <View></View>
  }

  return (
    <View className="flex-row justify-evenly bg-white py-6 rounded-3xl my-2">
      {weatherData.map((wether, index) => (
        <View key={index} className="items-center">
          <Text style={{ fontSize: hp(1.7) }}>{convertKelvinToCelsius(wether.main.temp)}{"\u2103"}</Text>
          <Text className="my-1 text-slate-500 uppercase" style={{ fontSize: hp(1.2) }}>{wether.weather[0].description}</Text>
          <Image source={require("../../../assets/images/icons/03d.png")} style={{ height: hp(5), width: hp(5) }} />
          <Text className="my-1 text-slate-500" style={{ fontSize: hp(1.7) }}>{formatDateTime(wether.dt)}</Text>
        </View>
      ))}
    </View>
  );
};