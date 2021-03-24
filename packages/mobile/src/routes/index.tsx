import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import { DeliveryRoutes } from './DeliveryRoutes'
import { AuthRoutes } from './AuthRoutes'

import { useAuth } from '../hooks/Auth'

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

  return <AuthRoutes />
}

export default AppRoutes
