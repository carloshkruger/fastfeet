import styled from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import colors from '../../constants/colors'

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`

export const Header = styled.View`
  background-color: ${colors.primary};
  height: 120px;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const BackButton = styled.TouchableOpacity`
  left: 16px;
  position: absolute;
  top: 20px;
  padding: 8px;
`

export const BackButtonIcon = styled(FeatherIcon)`
  color: #fff;
`

export const HeaderTitle = styled.Text`
  color: ${colors.textPrimary};
  font-size: 28px;
  line-height: 28px;
  padding-bottom: 40px;
`

export const PhotoCardContainer = styled.View`
  padding: 24px;
  margin-top: -24px;
`

export const PhotoCard = styled.View`
  background-color: #fff;
  position: relative;
  height: 400px;
`

export const PhotoIconContainer = styled.View`
  position: absolute;
  bottom: 0;
  align-items: center;
  width: 100%;
  height: 80px;
`

export const PhotoButton = styled.TouchableOpacity`
  padding: 16px;
  background-color: #000;
  opacity: 0.4;
  border-radius: 32px;
`

export const PhotoIcon = styled(FeatherIcon)`
  color: #fff;
`

export const SendPhotoButtonContainer = styled.View`
  padding: 24px;
  padding-bottom: 32px;
  align-items: center;
  flex: 1;
  position: absolute;
  bottom: 0;
  width: 100%;
`

export const TakePictureText = styled.Text`
  color: ${colors.textSecondary};
  font-size: 12px;
`
