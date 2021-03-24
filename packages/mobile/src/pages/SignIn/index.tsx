import React, { useRef, useState } from 'react'
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TextInput as RNTextInput,
  View
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import CheckBox from '@react-native-community/checkbox'

import PrimaryButton from '../../components/PrimaryButton'
import giantOutlineLogo from '../../assets/GiantOutlineLogo.png'
import LogosOnTop from '../../components/LogosOnTop'
import { useAuth } from '../../hooks/Auth'
import { handleApiError } from '../../utils/handleApiError'
import colors from '../../constants/colors'

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
  RememberMeText,
  HighlightedTitle
} from './styles'

const SignIn: React.FC = () => {
  const passwordInputRef = useRef<RNTextInput>(null)

  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')

  const [
    secureTextEntryOnPasswordField,
    setSecureTextEntryOnPasswordField
  ] = useState<boolean>(true)

  const [rememberMeActivated, setRememberMeActivated] = useState(false)
  const [seePasswordActivated, setSeePasswordActivated] = useState(false)

  const { navigate } = useNavigation()
  const { signIn } = useAuth()

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

  async function handleSubmit() {
    try {
      if (!cpf) {
        Alert.alert('', 'CPF é obrigatório.')
        return
      }

      if (!password) {
        Alert.alert('', 'Senha é obrigatório.')
        return
      }

      await signIn({
        cpf,
        password
      })
    } catch (error) {
      handleApiError(error)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Image
            source={giantOutlineLogo}
            style={{ position: 'absolute', top: 0 }}
          />

          <LogosOnTop />

          <Title>
            <HighlightedTitle>Entregador, {'\n'}</HighlightedTitle>
            você é nosso maior valor
          </Title>

          <SubTitle>Faça seu login para {'\n'}começar suas entregas.</SubTitle>

          <View>
            <InputContainer>
              <Icon name="user" size={20} />
              <TextInput
                placeholder="CPF"
                keyboardType="numeric"
                onChangeText={setCpf}
                maxLength={11}
                onSubmitEditing={() => passwordInputRef?.current?.focus()}
              />
            </InputContainer>
            <InputContainer>
              <Icon name="lock" size={20} />
              <TextInput
                ref={passwordInputRef}
                placeholder="Senha"
                onChangeText={setPassword}
                textContentType="password"
                secureTextEntry={secureTextEntryOnPasswordField}
                autoCapitalize="none"
                autoCorrect={false}
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
                tintColors={{ true: colors.secondary, false: '#d5ccff' }}
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

          <PrimaryButton name="Entrar" onPress={handleSubmit} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default SignIn
