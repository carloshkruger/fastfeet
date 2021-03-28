import React from 'react'
import { Image, View } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'

import { Delivery } from '../../models/Delivery'

import {
  CardBody,
  Circle,
  Container,
  DetailButton,
  DetailButtonText,
  ProductNameContainer,
  ProductNameText,
  ProgressItem,
  ProgressItemText,
  BodyContainer,
  ProgressBarLineContainer,
  ProgressBarLineItem
} from './styles'

import Package from '../../assets/Package.png'
import { useNavigation } from '@react-navigation/core'

interface DeliveryCardProps {
  delivery: Delivery
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({ delivery }) => {
  const { navigate } = useNavigation()

  function goToDeliveryDetailsPage() {
    navigate('DeliveryDetails', {
      deliveryId: delivery.deliveryId
    })
  }

  return (
    <Container>
      <CardBody>
        <ProductNameContainer>
          <Image source={Package} />
          <ProductNameText>{delivery.productName}</ProductNameText>
        </ProductNameContainer>

        <BodyContainer>
          <ProgressBarLineContainer>
            <ProgressBarLineItem active={delivery.deliveryInitialized} />
            <ProgressBarLineItem active={delivery.deliveryFinished} />
          </ProgressBarLineContainer>

          <View style={{ flexDirection: 'row' }}>
            <ProgressItem align="flex-start">
              <Circle active={true} />
              <ProgressItemText active={true}>AGUARDANDO</ProgressItemText>
            </ProgressItem>
            <ProgressItem align="center">
              <Circle active={delivery.deliveryInitialized} />
              <ProgressItemText active={delivery.deliveryInitialized}>
                RETIRADO
              </ProgressItemText>
            </ProgressItem>
            <ProgressItem align="flex-end">
              <Circle active={delivery.deliveryFinished} />
              <ProgressItemText active={delivery.deliveryFinished}>
                ENTREGUE
              </ProgressItemText>
            </ProgressItem>
          </View>
        </BodyContainer>
      </CardBody>

      <DetailButton onPress={goToDeliveryDetailsPage}>
        <DetailButtonText>Detalhes</DetailButtonText>
        <FeatherIcon name="arrow-right" size={20} />
      </DetailButton>
    </Container>
  )
}

export default DeliveryCard
