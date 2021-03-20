import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import { Button, ButtonText } from './styles'

interface PrimaryButtonProps extends RectButtonProps {
  name: string
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ name, ...rest }) => {
  return (
    <Button {...rest}>
      <ButtonText>{name}</ButtonText>
    </Button>
  )
}

export default PrimaryButton
