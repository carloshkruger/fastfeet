import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SignIn from '../pages/SignIn'
import ForgotPassword from '../pages/ForgotPassword'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hooks/Auth'
import { ActivityIndicator, View } from 'react-native'
import Deliveries from '../pages/Deliveries'
import DeliveryDetails from '../pages/DeliveryDetails'
import ConfirmDelivery from '../pages/ConfirmDelivery'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function DeliveryRoutes() {
  return (
    <Tab.Navigator
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
      <Tab.Screen
        options={{ title: 'Pendentes' }}
        name="PendingDeliveries"
        component={Deliveries}
      />
      <Tab.Screen
        options={{ title: 'Feitas' }}
        name="FinishedDeliveries"
        component={Deliveries}
      />
    </Tab.Navigator>
  )
}

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
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Delivery" component={DeliveryRoutes} />
          <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
          <Stack.Screen name="ConfirmDelivery" component={ConfirmDelivery} />
        </Stack.Navigator>
      </NavigationContainer>
    )
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
