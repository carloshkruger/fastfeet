import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import DeliveryDetails from '../pages/DeliveryDetails'
import ConfirmDelivery from '../pages/ConfirmDelivery'
import Deliveries from '../pages/Deliveries'
import colors from '../constants/colors'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function DeliveryBottomTabRoutes() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {
          height: 60
        },
        tabStyle: {
          justifyContent: 'center',
          borderTopColor: colors.secondary,
          borderTopWidth: 2
        },
        labelStyle: {
          fontSize: 16
        },
        activeBackgroundColor: '#fff',
        activeTintColor: colors.primary,
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

const DeliveryRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Delivery" component={DeliveryBottomTabRoutes} />
        <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
        <Stack.Screen name="ConfirmDelivery" component={ConfirmDelivery} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export { DeliveryRoutes }
