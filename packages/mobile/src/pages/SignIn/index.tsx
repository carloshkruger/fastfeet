import React, { useState } from 'react'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import CheckBox from '@react-native-community/checkbox'

import {
  Container,
  Title,
  SubTitle,
  InputContainer,
  Icon,
  TextInput,
  RightIcon,
  Button,
  ButtonText
} from './styles'

import logo from '../../assets/Logo.png'
import giantOutlineLogo from '../../assets/GiantOutlineLogo.png'
import textLogo from '../../assets/TextLogo.png'

const SignIn: React.FC = () => {
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')

  const [
    secureTextEntryOnPasswordField,
    setSecureTextEntryOnPasswordField
  ] = useState<boolean>(true)

  const [rememberMeActivated, setRememberMeActivated] = useState(false)
  const [seePasswordActivated, setSeePasswordActivated] = useState(false)

  function changeRememberMe() {
    setRememberMeActivated(!rememberMeActivated)
  }

  function changeSeePassword() {
    setSeePasswordActivated(!seePasswordActivated)
    setSecureTextEntryOnPasswordField(seePasswordActivated)
  }

  return (
    <>
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

            <View
              style={{
                paddingBottom: 80,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Image source={logo} style={{ width: 40, height: 44 }} />
              <Image source={textLogo} />
            </View>

            <Title>
              <Text style={{ color: '#FFC042' }}>Entregador, {'\n'}</Text>
              você é nosso maior valor
            </Title>

            <SubTitle>
              Faça seu login para {'\n'}começar suas entregas.
            </SubTitle>

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

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 8,
                paddingBottom: 8
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  value={rememberMeActivated}
                  tintColors={{ true: '#FFC042', false: '#d5ccff' }}
                  onChange={changeRememberMe}
                />
                <Text style={{ color: '#FFF' }}>Lembrar-me</Text>
              </View>

              <TouchableOpacity>
                <Text style={{ color: '#FFF' }}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View>

            <Button>
              <ButtonText>Entrar</ButtonText>
            </Button>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  )
}

export default SignIn
