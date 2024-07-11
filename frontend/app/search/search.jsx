import { View, Text, ImageBackground, StatusBar, SafeAreaView, TextInput, Button, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import AppBar from '../../components/AppBar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Entypo, Feather } from '@expo/vector-icons';
import axios from 'axios';
import CityCart from './components/CityCart';

export default function Search() {

    const [weatherData, setWeatherData] = useState([]);
    const [cityName, setCityName] = useState('');

    const handleSearch = () => {
        if (!cityName) {
            Alert.alert('Error', 'Please enter a city name.');
            return;
        }
        fetchWeatherData(cityName);
    };

    const fetchWeatherData = async (city) => {
        const apiKey = '0302d4fb14db57fc0b32d4d0448ff6d1';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(url);
            const weatherInfo = {
                temp: response.data.main.temp,
                status: response.data.weather[0].description,
                // cloud: getCloudImage(response.data.weather[0].icon),
                time: new Date(response.data.dt * 1000).toLocaleTimeString(),
            };
            setWeatherData([response.data]);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Unable to fetch weather data.');
        }
    };



  const  CityShower = () => {
        if (weatherData.length === 0) {
        return (
          <View className="flex-1 my-5 items-center justify-center">
            <Text>No weather data available</Text>
          </View>
        );
      }else{
        return <CityCart data={weatherData}/>
      }

        
    }



    return (
        <View>
            <ImageBackground
                style={{ height: hp(100), width: wp(100) }}
                source={require("../../assets/images/BGImages/searchCity.jpg")}
                className="p-2"
            >
                <StatusBar />
                <SafeAreaView />

                <AppBar title={'Search City'} isWhite={true} />

                <View className="flex-row justify-around items-center">
                    <View className="flex-row items-center justify-start">
                        <View style={{ height: 60, width: 40 }}
                            className="bg-white rounded-l-xl items-center justify-center"
                        >
                            <Entypo name="location-pin" size={20} color={"#808080"} />
                        </View>

                        <TextInput
                            value={cityName}
                            onChangeText={setCityName}
                            placeholder={"City Name"}
                            style={{
                                backgroundColor: "#FFFFFF",
                                height: 60,
                                width: wp(75) - 64,
                                padding: 10,
                            }}
                            className="rounded-r-xl"
                        />
                    </View>

                   
                   <TouchableOpacity onPress={handleSearch}>
                        <View
                                style={{ width: 60, height: 60 }}
                                className="bg-white rounded-xl flex items-center justify-center"
                            >
                                <Feather name="search" size={25} />
                            </View>
                   </TouchableOpacity>
                </View>

                <View className="flex-1 my-5 items-center justify-center pb-20">        
                    <CityShower/>
                </View>



            </ImageBackground>
        </View>
    )
}