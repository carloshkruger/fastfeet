import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../utils/Api'
import { Alert } from 'react-native'

interface User {
  id: string
  name: string
}

interface AuthState {
  accessToken: string
  user: User
}

interface SignInCredentials {
  cpf: string
  password: string
}

interface AuthContextData {
  user: User
  loading: boolean
  signIn(credentias: SignInCredentials): Promise<void>
  signOut(): void
  updateUser(user: User): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      try {
        const [token, user] = await AsyncStorage.multiGet([
          '@FastFeet:token',
          '@FastFeet:user'
        ])

        if (token[1] && user[1]) {
          api.defaults.headers.authorization = `Bearer ${token[1]}`

          setData({ accessToken: token[1], user: JSON.parse(user[1]) })
        }

        setLoading(false)
      } catch {
        Alert.alert('Erro', 'Ocorreu algum erro inesperado.')
      }
    }

    loadStorageData()
  }, [])

  const signIn = useCallback(async ({ cpf, password }) => {
    const response = await api.post('sessions', {
      cpf,
      password
    })

    const { accessToken, user } = response.data

    await AsyncStorage.multiSet([
      ['@FastFeet:token', accessToken],
      ['@FastFeet:user', JSON.stringify(user)]
    ])

    api.defaults.headers.authorization = `Bearer ${accessToken}`

    setData({ accessToken, user })
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@FastFeet:token', '@FastFeet:user'])

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    async (user: User) => {
      setData({
        accessToken: data.accessToken,
        user
      })

      await AsyncStorage.setItem('@FastFeet:user', JSON.stringify(user))
    },
    [data.accessToken]
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
