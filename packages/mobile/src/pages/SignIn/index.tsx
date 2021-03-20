import React, { useState } from 'react'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import CheckBox from '@react-native-community/checkbox'

import PrimaryButton from '../../components/PrimaryButton'

import {
  Container,
  Title,
  SubTitle,
  InputContainer,
  Icon,
  TextInput,
  RightIcon,
  ForgotPasswordButton,
  ForgotPasswordButtonText,
  SignInOptionsContainer,
  RememberMeContainer,
  RememberMeText
} from './styles'

import giantOutlineLogo from '../../assets/GiantOutlineLogo.png'
import LogosOnTop from '../../components/LogosOnTop'
import { useNavigation } from '@react-navigation/core'

const SignIn: React.FC = () => {
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')

  const [
    secureTextEntryOnPasswordField,
    setSecureTextEntryOnPasswordField
  ] = useState<boolean>(true)

  const [rememberMeActivated, setRememberMeActivated] = useState(false)
  const [seePasswordActivated, setSeePasswordActivated] = useState(false)

  const { navigate } = useNavigation()

  function changeRememberMe() {
    setRememberMeActivated(!rememberMeActivated)
  }

  function changeSeePassword() {
    setSeePasswordActivated(!seePasswordActivated)
    setSecureTextEntryOnPasswordField(seePasswordActivated)
  }

  function navigateToForgotPasswordPage() {
    navigate('ForgotPassword')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={75}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Image
            source={giantOutlineLogo}
            style={{ position: 'absolute', top: 0 }}
          />

          <LogosOnTop />

          <Title>
            <Text style={{ color: '#FFC042' }}>Entregador, {'\n'}</Text>
            você é nosso maior valor
          </Title>

          <SubTitle>Faça seu login para {'\n'}começar suas entregas.</SubTitle>

          <View>
            <InputContainer isFocused={false} isErrored={false}>
              <Icon name="user" size={20} />
              <TextInput
                placeholder="CPF"
                keyboardType="numeric"
                onChangeText={setCpf}
              />
            </InputContainer>
            <InputContainer isFocused={false} isErrored={false}>
              <Icon name="lock" size={20} />
              <TextInput
                placeholder="Senha"
                onChangeText={setPassword}
                textContentType="password"
                secureTextEntry={secureTextEntryOnPasswordField}
              />
              <RightIcon
                name={seePasswordActivated ? 'eye-off' : 'eye'}
                size={20}
                onPress={changeSeePassword}
              />
            </InputContainer>
          </View>

          <SignInOptionsContainer>
            <RememberMeContainer>
              <CheckBox
                value={rememberMeActivated}
                tintColors={{ true: '#FFC042', false: '#d5ccff' }}
                onChange={changeRememberMe}
              />
              <RememberMeText>Lembrar-me</RememberMeText>
            </RememberMeContainer>

            <ForgotPasswordButton onPress={navigateToForgotPasswordPage}>
              <ForgotPasswordButtonText>
                Esqueci minha senha
              </ForgotPasswordButtonText>
            </ForgotPasswordButton>
          </SignInOptionsContainer>

          <PrimaryButton name="Entrar" onPress={() => console.log('aqyu')} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default SignIn
