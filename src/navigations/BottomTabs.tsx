import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Todo from '../screens/Todo'
import Profile from '../screens/Profile'
import IonIcon from '@react-native-vector-icons/ionicons'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: 'darkblue' }}>
        <Tab.Screen name='Todolist' component={Todo} options={{ tabBarIcon: ({focused, color}) => (<IonIcon name='book-outline' size={20} color={color} />)}} />
        <Tab.Screen name='Profile' component={Profile} options={{ tabBarIcon: ({focused, color}) => (<IonIcon name='person-outline' size={20} color={color} />)}} />
    </Tab.Navigator>
  )
}

export default BottomTabs