import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { useAuth } from '../hooks/Auth'

import SignIn from '../pages/SignIn'
import ForgotPassword from '../pages/ForgotPassword'
import { DeliveryRoutes } from './DeliveryRoutes'

const Stack = createStackNavigator()

const AppRoutes: React.FC = () => {
  const { loading, userIsLoggedIn } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    )
  }

  if (userIsLoggedIn()) {
    return <DeliveryRoutes />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppRoutes
