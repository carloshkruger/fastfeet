import styled from 'styled-components/native'

const ACTIVE_COLOR = '#00DA6D'
const INACTIVE_COLOR = '#dad7e0'

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

export const DetailButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff1d6;
  padding: 16px;
`

export const DetailButtonText = styled.Text`
  font-size: 15px;
`

export const BodyContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  padding-top: 32px;
  padding-bottom: 8px;
`

export const ProgressBarLineContainer = styled.View`
  flex-direction: row;
`
export const ProgressBarLineItem = styled.View<ActiveProp>`
  height: 1.5px;
  flex: 1;
  background-color: ${props => (props.active ? ACTIVE_COLOR : INACTIVE_COLOR)};
`

interface ActiveProp {
  active: boolean
}

interface ProgressItemProps {
  align: 'flex-start' | 'center' | 'flex-end'
}

export const ProgressItem = styled.View<ProgressItemProps>`
  flex: 1;
  align-items: ${props => props.align};
`

export const Circle = styled.View<ActiveProp>`
  height: 10px;
  width: 10px;
  background-color: ${props => (props.active ? ACTIVE_COLOR : INACTIVE_COLOR)};
  border-radius: 5px;
  margin-top: -5px;
`

export const ProgressItemText = styled.Text<ActiveProp>`
  font-size: 10px;
  font-weight: 700;
  color: ${props => (props.active ? ACTIVE_COLOR : INACTIVE_COLOR)};
`
