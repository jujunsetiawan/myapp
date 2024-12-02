import React from 'react'
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/auth/SplashScreen';
import Register from '../screens/auth/Register';

// const RootStack = createNativeStackNavigator({
//     screens: {
//         SplashScreen: SplashScreen,
//     },
//   });

// const Navigation = createStaticNavigation(RootStack)

const Stack = createNativeStackNavigator()

const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false,  }} >
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='Register' component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation