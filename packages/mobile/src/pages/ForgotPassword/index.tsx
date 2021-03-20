import React from 'react'

import { Container, Title } from './styles'

import LogosOnTop from '../../components/LogosOnTop'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import giantOutlineLogo from '../../assets/GiantOutlineLogo.png'
import { SubTitle } from '../SignIn/styles'
import { useNavigation } from '@react-navigation/core'

import longArrowLeft from '../../assets/LongArrowLeft.png'

const ForgotPassword: React.FC = () => {
  const { goBack } = useNavigation()

  function goToLoginPage() {
    goBack()
  }

  return (
    <Container>
      <Image
        source={giantOutlineLogo}
        style={{ position: 'absolute', top: 0 }}
      />

      <LogosOnTop />

      <View style={{ width: '70%' }}>
        <Title>
          <Text style={{ color: '#FFC042' }}>Esqueceu </Text>
          sua senha?
        </Title>

        <SubTitle>
          Por motivos de segurança, para recuperá-la, vá até a central da
          distribuidora FastFeet.
        </SubTitle>
      </View>

      <Text style={{ color: '#fff' }}>ENDEREÇO</Text>

      <SubTitle>
        Rua Guilherme Gemballa,{'\n'}260 Jardim América,{'\n'}SC 89 168-000
      </SubTitle>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 64
        }}
      >
        <TouchableOpacity onPress={goToLoginPage}>
          <Image source={longArrowLeft} style={{ margin: 8 }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={goToLoginPage}>
          <Text style={{ color: '#fff', fontSize: 16 }}>
            Voltar para o login
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  )
}

export default ForgotPassword
