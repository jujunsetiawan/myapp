import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const SplashScreen = ({ navigation }: any) => {

    useEffect(() => {
      setTimeout(() => {
        navigation.navigate('Login')
      }, 3000);
    }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'medium' }}>Welcome to Myapp</Text>
    </View>
  )
}

export default SplashScreen