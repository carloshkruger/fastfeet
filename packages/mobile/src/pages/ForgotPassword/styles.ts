import styled from 'styled-components/native'

import colors from '../../constants/colors'

export const Container = styled.View`
  background-color: ${colors.primary};
  flex: 1;
  padding: 24px;
  padding-top: 72px;
`

export const Title = styled.Text`
  font-size: 48px;
  line-height: 48px;
  font-family: 'Roboto-BoldItalic';
  color: ${colors.textPrimary};
`
export const HighlightedTitle = styled.Text`
  color: ${colors.secondary};
`

export const SubTitle = styled.Text`
  color: ${colors.textSecondary};
  font-size: 15px;
  line-height: 25px;
  padding-top: 16px;
  padding-bottom: 48px;
`

export const BottomActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 64px;
`

export const GoBackText = styled.Text`
  color: ${colors.textPrimary};
  font-size: 16px;
`
