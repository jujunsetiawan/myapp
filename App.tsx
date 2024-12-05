import { StatusBar } from 'react-native'
import React from 'react'
import Navigation from './src/navigations'

const App = () => {
  return (
    <>
      <StatusBar backgroundColor='#0286FF00' barStyle='dark-content' translucent />
      <Navigation/>
    </>
  )
}

export default App