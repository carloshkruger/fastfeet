import React from 'react'
import { Image } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'

import { Delivery } from '../../models/Delivery'

import {
  CardBody,
  Container,
  DetailButton,
  DetailButtonText,
  ProductNameContainer,
  ProductNameText,
  ProgressBar,
  ProgressBarContainer,
  ProgressContainer,
  ProgressText,
  ProgressTextContainer
} from './styles'

import Package from '../../assets/Package.png'
import { useNavigation } from '@react-navigation/core'

interface DeliveryCardProps {
  delivery: Delivery
}

const PROGRESS_BAR_PERCENTAGE = {
  finished: '100%',
  initialized: '50%',
  waiting: '10%'
}

const STEP_FINISHED_COLOR = '#00DA6D'
const STEP_NOT_FINISHED_COLOR = '#dad7e0'

const DeliveryCard: React.FC<DeliveryCardProps> = ({ delivery }) => {
  const { navigate } = useNavigation()

  function goToDeliveryDetailsPage() {
    navigate('DeliveryDetails', {
      deliveryId: delivery.deliveryId
    })
  }

  const progressBarPercentage = delivery.deliveryFinished
    ? PROGRESS_BAR_PERCENTAGE.finished
    : delivery.deliveryInitialized
    ? PROGRESS_BAR_PERCENTAGE.initialized
    : PROGRESS_BAR_PERCENTAGE.waiting

  return (
    <Container>
      <CardBody>
        <ProductNameContainer>
          <Image source={Package} />
          <ProductNameText>{delivery.productName}</ProductNameText>
        </ProductNameContainer>

        <ProgressContainer>
          <ProgressBarContainer>
            <ProgressBar style={{ width: progressBarPercentage }} />
          </ProgressBarContainer>

          <ProgressTextContainer>
            <ProgressText
              style={{ textAlign: 'left', color: STEP_FINISHED_COLOR }}
            >
              AGUARDANDO
            </ProgressText>
            <ProgressText
              style={{
                textAlign: 'center',
                color: delivery.deliveryInitialized
                  ? STEP_FINISHED_COLOR
                  : STEP_NOT_FINISHED_COLOR
              }}
            >
              RETIRADO
            </ProgressText>
            <ProgressText
              style={{
                textAlign: 'right',
                color: delivery.deliveryFinished
                  ? STEP_FINISHED_COLOR
                  : STEP_NOT_FINISHED_COLOR
              }}
            >
              ENTREGE
            </ProgressText>
          </ProgressTextContainer>
        </ProgressContainer>
      </CardBody>

      <DetailButton onPress={goToDeliveryDetailsPage}>
        <DetailButtonText>Detalhes</DetailButtonText>
        <FeatherIcon name="arrow-right" size={20} />
      </DetailButton>
    </Container>
  )
}

export default DeliveryCard
