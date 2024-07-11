import { View, Text, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import axios from 'axios';

const SunSetView = () => {

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
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        try {
            const response = await axios.get(url);
            setWeatherData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Unable to fetch weather data.');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!weatherData) {
        return (
            <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No weather data available</Text>
            </View>
        );
    }

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    function ItemCard({ icon, time }) {
        return (
            <View className="flex m-5 items-center">
                <Feather name={icon} size={wp(20)} />
                <View className="my-3 items-center">
                    <Text>{time}</Text>
                    <Text className="font-bold" style={{ fontSize: wp(5) }}>Sunrise</Text>

                </View>
            </View>
        )
    }

    return (
        <View
            className="flex-row bg-white shadow-md rounded-3xl justify-evenly"
            style={{ width: wp(100) - 16 }}
        >
            <ItemCard icon={"sunrise"} time={formatDateTime(weatherData.sys.sunrise)} />
            <ItemCard icon={"sunset"} time={formatDateTime(weatherData.sys.sunset)} />
        </View>
    )
}

export default SunSetView