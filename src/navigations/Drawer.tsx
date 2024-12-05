import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Todo from '../screens/Todo'
import Profile from '../screens/Profile'
import IonIcon from '@react-native-vector-icons/ionicons'
import DrawerContent from './DrawerContent'

const Tab = createDrawerNavigator()

const Drawer = () => {
  return (
    <Tab.Navigator
    drawerContent={props => <DrawerContent {...props} />}
    screenOptions={{ 
        drawerActiveTintColor: 'white',
        drawerActiveBackgroundColor: '#003CB3'
    }}>
        <Tab.Screen name='Todolist' component={Todo} options={{ drawerIcon: ({focused, color}) => (<IonIcon name='airplane' size={24} color={color} />)}} />
        <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}

export default Drawer