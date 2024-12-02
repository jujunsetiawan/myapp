import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const SplashScreen = ({ navigation }: any) => {

    useEffect(() => {
      setTimeout(() => {
        navigation.navigate('Register')
      }, 3000);
    }, [])

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  )
}

export default SplashScreen