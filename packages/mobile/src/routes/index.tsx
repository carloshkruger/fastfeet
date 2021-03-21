import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../pages/SignIn'
import ForgotPassword from '../pages/ForgotPassword'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hooks/Auth'
import { ActivityIndicator, View } from 'react-native'

const { Navigator, Screen } = createStackNavigator()

const AppRoutes: React.FC = () => {
  const { loading } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    )
  }

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
