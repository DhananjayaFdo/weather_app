import { View, Text, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function CityCart({ data }) {

    const convertKelvinToCelsius = (kelvin) => {
        return Math.round(kelvin - 273.15);
    };

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const formattedTime = date.toLocaleTimeString('en-US', { hour12: true });
        return formattedTime;
    };

    return (
        <View>
            <View className="items-center bg-white p-8 rounded-lg" style={{ width: wp(60) }}>
                <Text style={{ fontSize: hp(1.7) }} className="mb-1">{data[0].name}</Text>
                <Text style={{ fontSize: hp(1.7) }}>{convertKelvinToCelsius(data[0].main.temp)}{"\u2103"}</Text>
                <Text className="my-1 text-slate-500 uppercase" style={{ fontSize: hp(1.2) }}>{data[0].weather[0].description}</Text>
                <Image source={require("../../../assets/images/icons/03d.png")} style={{ height: hp(5), width: hp(5) }} />
                <Text className="my-1 text-slate-500" style={{ fontSize: hp(1.7) }}>{formatDateTime(data[0].dt)}</Text>
            </View>
        </View>
    )
}