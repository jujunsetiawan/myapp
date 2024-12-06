import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Todo from '../screens/Todo'
import Profile from '../screens/Profile'
import IonIcon from '@react-native-vector-icons/ionicons'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: 'red' }}>
        <Tab.Screen name='Todolist' component={Todo} options={{ tabBarIcon: ({focused, color}) => (<IonIcon name='bicycle' size={20} color={color} />)}} />
        <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}

export default BottomTabs