import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Button = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #ffc042;
  border-radius: 10px;
  margin-top: 8px;
  justify-content: center;
  align-items: center;
`

export const ButtonText = styled.Text`
  color: #312e38;
  font-size: 16px;
`
