import React from 'react'
import { StatusBar, View } from 'react-native'
import SignIn from './src/pages/SignIn'

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#4c33cc' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#4c33cc"
        translucent
      />
      <SignIn />
    </View>
  )
}

export default App
