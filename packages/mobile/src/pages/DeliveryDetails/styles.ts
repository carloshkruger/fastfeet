import styled from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  background-color: #f7f5fa;
`

export const Header = styled.View`
  background-color: #4c33cc;
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
  color: #fff;
  font-size: 28px;
  line-height: 28px;
  padding-bottom: 40px;
`

export const CardsContainer = styled.View`
  padding: 24px;
  margin-top: -56px;
`

export const Card = styled.View`
  background-color: #fff;
  padding: 24px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
`

export const CardTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const CardTitleIcon = styled(FeatherIcon)`
  color: #ffc042;
  margin-right: 8px;
`

export const CardTitleText = styled.Text`
  color: #4c4766;
  font-size: 22px;
  font-weight: 700;
`

export const CardInfoGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const CardInfoContainer = styled.View`
  padding-top: 24px;
`

export const CardInfoTitle = styled.Text`
  color: #4c4766;
  font-size: 10px;
  line-height: 12px;
  font-weight: 700;
`

export const CardInfoValue = styled.Text`
  font-size: 15px;
  line-height: 25px;
  color: #6f6c80;
`
