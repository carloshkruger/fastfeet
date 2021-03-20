import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../pages/SignIn'
import ForgotPassword from '../pages/ForgotPassword'
import { NavigationContainer } from '@react-navigation/native'

const { Navigator, Screen } = createStackNavigator()

const AppRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Screen name="SignIn" component={SignIn} />
        <Screen name="ForgotPassword" component={ForgotPassword} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AppRoutes
