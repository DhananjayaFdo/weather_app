import { View, Text, Alert, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Location from 'expo-location';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';

const WeatherTile = ({ date, day, temp, status, min, max }) => {
    
return (
        <View className="flex-row items-center justify-evenly mb-2"

            style={{ width: wp(100) - 16 }}

        >
            <View className="items-center" style={{ width: (wp(100) - 16) / 3 }}>
                <Text
                    style={{ fontStyle: wp(10) }}
                    className="font-medium"
                >
                    {day}
                </Text>

                <View className="flex-row items-center">
                    <Feather name="calendar" size={20} />
                    <Text
                        style={{ fontStyle: wp(10) }}
                        className="font-medium"
                    >
                        {date}
                    </Text>
                </View>
            </View>

            <View className="items-center" style={{ width: (wp(100) - 16) / 3 }}>
                <View className="flex-row items-center">
                    <Text>{temp}{"\u2103"}</Text>
                    <Image
                        source={require("../../../assets/images/icons/04d.png")}
                        style={{ height: wp(10), width: wp(10) }}
                    />
                </View>

                <Text
                    style={{ fontStyle: wp(10) }}
                    className="capitalize"
                >{status}</Text>
            </View>


            <View className="flex-row items-center justify-center" style={{ width: (wp(100) - 16) / 3 }}>
                <Image
                    source={require("../../../assets/images/openWeatherIcons/img_1.png")}
                    style={{ height: wp(10), width: wp(10) }}
                    className="mr-1"
                />
                <View >
                    <Text style={{ color: '#FA7D00' }}>Max {max}{"\u2103"}</Text>
                    <Text style={{ color: '#34CCF9' }}>Min {min}{"\u2103"}</Text>
                </View>
            </View>
        </View>
    )
}

export default WeatherTile