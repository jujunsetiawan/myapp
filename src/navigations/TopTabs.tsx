import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Todo from '../screens/Todo'
import Profile from '../screens/Profile'

const Tab = createMaterialTopTabNavigator()

const TopTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ 
        tabBarPressColor: 'red',
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'purple',
        tabBarIndicatorStyle: {backgroundColor: 'lightgreen'}
    }}>
        <Tab.Screen name='Todolist' component={Todo} />
        <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}

export default TopTabs