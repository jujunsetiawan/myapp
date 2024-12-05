import React from 'react'
import { View, Button } from 'react-native'

const DrawerContent = ({ navigation }: any) => {
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
      <Button title='Todo' onPress={() => navigation.navigate('Todolist')} />
      <Button title='Profile' onPress={() => navigation.navigate('Profile')} />
    </View>
  )
}

export default DrawerContent