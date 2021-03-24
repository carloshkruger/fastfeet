import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import LogosOnTop from '../../components/LogosOnTop'
import colors from '../../constants/colors'

import giantOutlineLogo from '../../assets/GiantOutlineLogo.png'
import longArrowLeft from '../../assets/LongArrowLeft.png'

import {
  BottomActionsContainer,
  Container,
  GoBackText,
  HighlightedTitle,
  Title,
  SubTitle
} from './styles'

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
          <HighlightedTitle>Esqueceu </HighlightedTitle>
          sua senha?
        </Title>

        <SubTitle>
          Por motivos de segurança, para recuperá-la, vá até a central da
          distribuidora FastFeet.
        </SubTitle>
      </View>

      <Text style={{ color: colors.textPrimary }}>ENDEREÇO</Text>

      <SubTitle>
        Rua Guilherme Gemballa,{'\n'}260 Jardim América,{'\n'}SC 89 168-000
      </SubTitle>

      <BottomActionsContainer>
        <TouchableOpacity onPress={goToLoginPage}>
          <Image source={longArrowLeft} style={{ margin: 8 }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={goToLoginPage}>
          <GoBackText>Voltar para o login</GoBackText>
        </TouchableOpacity>
      </BottomActionsContainer>
    </Container>
  )
}

export default ForgotPassword
