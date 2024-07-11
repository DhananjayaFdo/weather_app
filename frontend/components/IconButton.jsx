import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';

export default function IconButton({icon, method}) {
  return (
    <TouchableOpacity 
      className="px-2"
      onPress={() => method()}
    >
        
        <Feather name={icon} size={hp(3)} color={'#ffffff'}/>
    </TouchableOpacity>
  )
}