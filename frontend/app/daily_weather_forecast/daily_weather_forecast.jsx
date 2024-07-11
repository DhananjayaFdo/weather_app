import { View, Text, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import WeatherTile from './components/WeatherTile'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import axios from 'axios';

export default function DailyWeatherForecast({ navigation }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      fetchWeatherData(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to fetch location.');
    }
  };

  const fetchWeatherData = async (latitude, longitude) => {
    const apiKey = '0302d4fb14db57fc0b32d4d0448ff6d1';
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&cnt=10&appid=${apiKey}`;
    console.log(url);
    try {
      const response = await axios.get(url);
      setWeatherData(response.data.daily.slice(0, 10));
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to fetch weather data.');
      setLoading(false);
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  // if (!weatherData) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>No weather data available</Text>
  //     </View>
  //   );
  // }


  weathers = [
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
    { "date": "10/12", "day": "wednesday", "temp": '28', "status": "light rain", "min": "24", "max": '30' },
  ];

  function WeatherStatues() {
    return (
      <FlatList
        data={weathers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <WeatherTile
            date={item.date}
            day={item.day}
            temp={item.temp}
            status={item.status}
            min={item.min}
            max={item.max}
          />

        )}
      />
    )
  }

  return (
    <View className="flex-1 mx-2">
      <StatusBar />
      <SafeAreaView />

      {/* <AppBar title={"Daily Weather Forecast"}/> */}

      <View className="flex-row items-center my-3">
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back-outline" className="mp-6" size={wp(8)} color={"#000000"} />
        </TouchableOpacity>

        <Text
          className="ml-3"
          style={{ fontSize: wp(5), color: "#000000" }}
        >Daily Weather Forecast</Text>
      </View>

      <WeatherStatues />

      <SafeAreaView />
    </View>
  )
}