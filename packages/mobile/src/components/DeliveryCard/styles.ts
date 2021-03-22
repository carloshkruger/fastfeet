import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: #fff;
  margin-left: 24px;
  margin-right: 24px;
  margin-bottom: 16px;
`

export const CardBody = styled.View`
  padding: 16px;
`

export const ProductNameContainer = styled.View`
  flex-direction: row;
`

export const ProductNameText = styled.Text`
  font-size: 22px;
  line-height: 24px;
  padding-left: 16px;
`

export const ProgressContainer = styled.View`
  padding-top: 24px;
  padding-bottom: 16px;
`

export const ProgressBarContainer = styled.View`
  height: 2px;
  background-color: #dad7e0;
`

export const ProgressBar = styled.View`
  height: 2px;
  background-color: #00da6d;
`

export const ProgressTextContainer = styled.View`
  padding-top: 4px;
  flex-direction: row;
`

export const ProgressText = styled.Text`
  font-size: 10px;
  width: 33.3%;
`

export const DetailButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff1d6;
  padding: 16px;
`

export const DetailButtonText = styled.Text`
  font-size: 15px;
`
