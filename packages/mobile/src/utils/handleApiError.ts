import { AxiosError } from 'axios'
import { Alert } from 'react-native'

export const handleApiError = (error: AxiosError) => {
  const errorMessage = error?.response?.data?.error || error.message

  Alert.alert('Error', errorMessage)
}
