import React from 'react'
import { Image } from 'react-native'

import { LogoContainter } from './styles'

import logo from '../../assets/Logo.png'
import textLogo from '../../assets/TextLogo.png'

const LogosOnTop: React.FC = () => {
  return (
    <LogoContainter>
      <Image source={logo} style={{ width: 40, height: 44 }} />
      <Image source={textLogo} />
    </LogoContainter>
  )
}

export default LogosOnTop
