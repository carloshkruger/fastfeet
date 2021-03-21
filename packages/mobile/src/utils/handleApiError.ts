import { AxiosError } from 'axios'
import { Alert } from 'react-native'

export const handleApiError = (error: AxiosError) => {
  const apiError = error?.response?.data?.error

  if (apiError) {
    Alert.alert('Erro', apiError)
  } else {
    Alert.alert('Erro', error.message)
  }
}
