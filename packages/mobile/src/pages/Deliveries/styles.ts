import styled from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

export const Container = styled.View`
  flex: 1;
  background-color: #f5f3f8;
`

export const Header = styled.View`
  background-color: #4c33cc;
  padding: 24px;
  padding-bottom: 80px;
`

export const HeaderUserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`

export const WelcomeContainer = styled.View``

export const WelcomeText = styled.Text`
  font-size: 16px;
  line-height: 20px;
  color: #d4ccff;
`

export const UserNameText = styled.Text`
  font-size: 16px;
  line-height: 20px;
  color: #d4ccff;
`

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
`

export const TitleText = styled.Text`
  font-size: 32px;
  line-height: 36px;
  color: #fff;
`

export const LocationContainer = styled.View`
  flex-direction: row;
`

export const LocationText = styled.Text`
  padding-left: 8px;
  color: #d4ccff;
  font-size: 15px;
`

export const SearchBarContainer = styled.View`
  align-items: center;
  justify-content: center;
`

export const SearchBarSubContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 90%;
`

export const InputContainer = styled.View`
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
  margin-top: -32px;
  box-shadow: 0px 8px 24px rgba(21, 6, 51, 0.08);
  background-color: #fff;
  border-bottom-start-radius: 0;
  border-bottom-end-radius: 0;
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

export const SearchResultListContainer = styled.ScrollView`
  width: 100%;
  background-color: #fff;
  top: 24px;
  max-height: 170px;
  z-index: 1;
  position: absolute;
`

export const SearchResultListItem = styled.View`
  padding: 16px;
  border-top-color: #dad7e0;
  border-top-width: 1px;
`
export const LoadingText = styled.Text`
  font-size: 18px;
  text-align: center;
  padding-top: 16px;
`

export const NoDeliveryFoundText = styled.Text`
  font-size: 18px;
  text-align: center;
`
