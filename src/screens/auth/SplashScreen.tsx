import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { get } from '../../services/asyncstorage.service'

const SplashScreen = ({ navigation }: any) => {

    const checkDataUser = async() => {
      try {
        const value = await get('user')
        return value ? navigation.replace('Todo') : navigation.replace('Login')
      } catch (error) {
        return navigation.replace('Login')
      }
    }

    useEffect(() => {
      checkDataUser()
    }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'medium' }}>Welcome to Myapp</Text>
    </View>
  )
}

export default SplashScreen