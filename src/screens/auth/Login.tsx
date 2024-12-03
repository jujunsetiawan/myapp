import { View, Text, Button } from 'react-native'
import React from 'react'

const Login = ({navigation}: any) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Page</Text>
      <Button title='Login' onPress={() => navigation.navigate('Todo')} />
    </View>
  )
}

export default Login