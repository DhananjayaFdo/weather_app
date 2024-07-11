import { View, Text, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import * as Location from 'expo-location';

export default function SplashScreen({ navigation }) {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    const getUserCurrentLocation = async () => {
        try {
            if (Platform.OS === 'android' || Platform.OS === 'ios') {
               
                let { status } = await Location.requestForegroundPermissionsAsync();
                
                if (status !== 'granted') {
                    console.log('PERMISSION NOT GRANTED');
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);

                await getCurrentLocationWeatherDetails();

            }
        } catch (error) {
            setErrorMsg('Error getting location: ' + error.message);
        }
    };

    const getCurrentLocationWeatherDetails = async () => {

        try {
            await axios.get(
                'https://api.openweathermap.org/data/2.5/weather?lat=6.927079&lon=79.861244&APPID=0302d4fb14db57fc0b32d4d0448ff6d1',
            ).then(res => {
                navigation.navigate("Drawer", {"data": res.data});
            }).catch(err => {
                console.log(err);
            })
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        getUserCurrentLocation();
    }, []);

    return (
        <View className="flex-1">
            <Image
                source={require("../../assets/images/UIs/Splash Screen.png")}
                style={{ height: hp(100), width: wp(100) }}
            />
        </View>
    )
}