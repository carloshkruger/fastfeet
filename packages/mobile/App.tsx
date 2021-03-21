import 'react-native-gesture-handler'

import React from 'react'
import { StatusBar, View } from 'react-native'
import AppRoutes from './src/routes'
import AppProvider from './src/hooks'

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#4c33cc' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#4c33cc"
        translucent
      />
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </View>
  )
}

export default App
