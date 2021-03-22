import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SignIn from '../pages/SignIn'
import ForgotPassword from '../pages/ForgotPassword'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hooks/Auth'
import { ActivityIndicator, View } from 'react-native'
import Deliveries from '../pages/Deliveries'

const { Navigator, Screen } = createStackNavigator()
const {
  Navigator: BottomTabNavigator,
  Screen: BottomTabScreen
} = createBottomTabNavigator()

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
    return (
      <NavigationContainer>
        <BottomTabNavigator
          tabBarOptions={{
            keyboardHidesTabBar: true,
            style: {
              height: 60
            },
            tabStyle: {
              justifyContent: 'center',
              borderTopColor: '#FFC042',
              borderTopWidth: 2
            },
            labelStyle: {
              fontSize: 16
            },
            activeBackgroundColor: '#fff',
            activeTintColor: '#4C33CC',
            inactiveBackgroundColor: '#F7F5FA',
            inactiveTintColor: '#6F6C80'
          }}
        >
          <BottomTabScreen
            options={{
              title: 'Pendentes'
            }}
            name="PendingDeliveries"
            component={Deliveries}
          />
          <BottomTabScreen
            options={{
              title: 'Feitos'
            }}
            name="FinishedDeliveries"
            component={Deliveries}
          />
        </BottomTabNavigator>
      </NavigationContainer>
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
