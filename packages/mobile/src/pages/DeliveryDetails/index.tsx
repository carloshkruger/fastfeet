import React, { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'

import api from '../../utils/Api'
import { handleApiError } from '../../utils/handleApiError'
import PrimaryButton from '../../components/PrimaryButton'

import {
  Container,
  Header,
  BackButton,
  BackButtonIcon,
  HeaderTitle,
  CardsContainer,
  Card,
  CardTitleContainer,
  CardTitleIcon,
  CardTitleText,
  CardInfoGroup,
  CardInfoContainer,
  CardInfoTitle,
  CardInfoValue
} from './styles'

interface DeliveryDetails {
  id: string
  recipientName: string
  address: {
    address: string
    number: number
    neighborhood: string
    city: string
    state: string
    postalCode: string
  }
  isInitialized: boolean
  isFinished: boolean
  statusDescription: string
  postDate: string
  initializedDate: string
  finishedDate: string
}

interface Params {
  deliveryId: string
}

const FALLBACK_TO_EMPTY_DATE = '_ _ /_ _ /_ _ _ _'

const DeliveryDetails: React.FC = () => {
  const [delivery, setDelivery] = useState<DeliveryDetails | undefined>(
    undefined
  )

  const { goBack } = useNavigation()
  const { params } = useRoute()

  const deliveryId = (params as Params).deliveryId

  useEffect(() => {
    getDeliveryDetails()
  }, [deliveryId])

  function getDeliveryDetails() {
    api
      .get(`/deliveries/${deliveryId}`)
      .then(response => setDelivery(response.data))
      .catch(error => handleApiError(error))
  }

  function handleInitializeDelivery() {
    Alert.alert('Iniciar entrega?', '', [
      {
        text: 'Não'
      },
      {
        text: 'Sim',
        onPress: () => {
          api
            .post(`deliveries/${deliveryId}/start`)
            .then(() => {
              Alert.alert('Pacote retirado.', 'Só falta entregar :)')
              getDeliveryDetails()
            })
            .catch(error => handleApiError(error))
        }
      }
    ])
  }

  function handleFinilizeDelivery() {}

  function formatDate(date: string): string {
    return date || FALLBACK_TO_EMPTY_DATE
  }

  if (!delivery) {
    return (
      <View style={{ alignItems: 'center', padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Carregando...</Text>
      </View>
    )
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <BackButtonIcon name="arrow-left" size={20} />
        </BackButton>

        <HeaderTitle>Detalhes</HeaderTitle>
      </Header>

      <CardsContainer>
        <Card>
          <CardTitleContainer>
            <CardTitleIcon name="file-text" size={24} />
            <CardTitleText>Dados</CardTitleText>
          </CardTitleContainer>

          <CardInfoContainer>
            <CardInfoTitle>DESTINATÁRIO</CardInfoTitle>
            <CardInfoValue>{delivery.recipientName}</CardInfoValue>
          </CardInfoContainer>

          <CardInfoContainer>
            <CardInfoTitle>ENDEREÇO</CardInfoTitle>
            <CardInfoValue>
              {delivery.address.address}, {delivery.address.number}
              {'\n'}
              {delivery.address.neighborhood}, {delivery.address.state}
              {'\n'}
              {delivery.address.postalCode}
            </CardInfoValue>
          </CardInfoContainer>
        </Card>

        <Card>
          <CardTitleContainer>
            <CardTitleIcon name="info" size={24} />
            <CardTitleText>Situação</CardTitleText>
          </CardTitleContainer>

          <CardInfoGroup>
            <CardInfoContainer style={{ flex: 1 }}>
              <CardInfoTitle>STATUS</CardInfoTitle>
              <CardInfoValue>{delivery.statusDescription}</CardInfoValue>
            </CardInfoContainer>

            <CardInfoContainer style={{ flex: 1 }}>
              <CardInfoTitle>POSTADO EM</CardInfoTitle>
              <CardInfoValue>{formatDate(delivery.postDate)}</CardInfoValue>
            </CardInfoContainer>
          </CardInfoGroup>

          <CardInfoGroup>
            <CardInfoContainer style={{ flex: 1 }}>
              <CardInfoTitle>DATA DE RETIRADA</CardInfoTitle>
              <CardInfoValue>
                {formatDate(delivery.initializedDate)}
              </CardInfoValue>
            </CardInfoContainer>

            <CardInfoContainer style={{ flex: 1 }}>
              <CardInfoTitle>DATA DE ENTREGA</CardInfoTitle>
              <CardInfoValue>{formatDate(delivery.finishedDate)}</CardInfoValue>
            </CardInfoContainer>
          </CardInfoGroup>
        </Card>
      </CardsContainer>

      <View
        style={{
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 32,
          bottom: 0,
          position: 'absolute',
          width: '100%'
        }}
      >
        {delivery.isFinished ? null : delivery.isInitialized ? (
          <PrimaryButton
            name="Confirmar entrega"
            onPress={handleFinilizeDelivery}
          />
        ) : (
          <PrimaryButton
            name="Retirar pacote"
            onPress={handleInitializeDelivery}
          />
        )}
      </View>
    </Container>
  )
}

export default DeliveryDetails
