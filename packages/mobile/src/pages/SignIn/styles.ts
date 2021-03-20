import styled, { css } from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const Container = styled.View`
  background-color: #4c33cc;
  flex: 1;
  padding: 24px;
  justify-content: center;
`

export const Title = styled.Text`
  font-size: 48px;
  line-height: 48px;
  font-family: 'Roboto-BoldItalic';
  color: #fff;
`

export const SubTitle = styled.Text`
  color: #d5ccff;
  font-size: 15px;
  line-height: 25px;
  padding-top: 16px;
  padding-bottom: 48px;
`

export const SignInOptionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  padding-bottom: 8px;
`

export const RememberMeContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const RememberMeText = styled.Text`
  color: #fff;
`

export const ForgotPasswordButton = styled(TouchableOpacity)``

export const ForgotPasswordButtonText = styled.Text`
  color: #fff;
`

interface ContainerProps {
  isFocused: boolean
  isErrored: boolean
}

export const InputContainer = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #f7f5fa;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #f7f5fa;
  flex-direction: row;
  align-items: center;
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`

export const TextInput = styled.TextInput`
  flex: 1;
  color: #000;
  font-size: 16px;
`

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`

export const RightIcon = styled(FeatherIcon)`
  margin-left: 16px;
`
