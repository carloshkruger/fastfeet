import React, { useRef, useState } from 'react'
import { Alert, Image, Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'
import { RNCamera } from 'react-native-camera'

import api from '../../utils/Api'
import { handleApiError } from '../../utils/handleApiError'
import PrimaryButton from '../../components/PrimaryButton'

import {
  Container,
  Header,
  BackButton,
  BackButtonIcon,
  HeaderTitle,
  PhotoCardContainer,
  PhotoCard,
  PhotoIconContainer,
  PhotoButton,
  PhotoIcon,
  SendPhotoButtonContainer,
  TakePictureText
} from './styles'

interface Params {
  deliveryId: string
}

const ConfirmDelivery: React.FC = () => {
  const [uriImage, setUriImage] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const cameraRef = useRef<RNCamera>(null)

  const { goBack } = useNavigation()
  const { params } = useRoute()
  const deliveryId = (params as Params).deliveryId

  function repic() {
    setUriImage('')
  }

  async function takePicture() {
    try {
      if (isRecording) {
        return
      }

      setIsRecording(true)

      const data = await cameraRef.current?.takePictureAsync({
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true
      })

      setUriImage(data?.uri || '')
    } catch (error) {
      Alert.alert('Error', 'Erro ao tentar utilizar a câmera.')
    } finally {
      setIsRecording(false)
    }
  }

  async function handleConfirmDelivery() {
    try {
      const formData = new FormData()
      formData.append('image', uriImage)

      await api.post(`/deliveries/${deliveryId}/finalize`, formData)

      Alert.alert('Foto enviada', 'Pacote entregue', [
        {
          text: 'OK',
          onPress: () => goBack()
        }
      ])
    } catch (error) {
      handleApiError(error)
    }
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <BackButtonIcon name="arrow-left" size={20} />
        </BackButton>

        <HeaderTitle>Confirmar</HeaderTitle>
      </Header>

      <PhotoCardContainer>
        <PhotoCard>
          {isRecording ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ fontSize: 16 }}>Processando imagem...</Text>
            </View>
          ) : !!uriImage ? (
            <Image
              source={{
                uri: uriImage
              }}
              style={{ flex: 1 }}
            />
          ) : null}

          <RNCamera
            ref={cameraRef}
            captureAudio={false}
            androidCameraPermissionOptions={{
              title: 'Permissão para usar a câmera',
              message: 'Precisamos da sua permissão para utilizar a câmera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancelar'
            }}
            type={RNCamera.Constants.Type.back}
            style={{
              flex: 1,
              display: !!uriImage === false && !isRecording ? 'flex' : 'none'
            }}
          />

          {!isRecording && (
            <PhotoIconContainer>
              {!!uriImage === false ? (
                <PhotoButton onPress={takePicture}>
                  <PhotoIcon name="camera" size={32} />
                </PhotoButton>
              ) : (
                <PhotoButton onPress={repic}>
                  <PhotoIcon name="refresh-cw" size={32} />
                </PhotoButton>
              )}
            </PhotoIconContainer>
          )}
        </PhotoCard>
      </PhotoCardContainer>

      <SendPhotoButtonContainer>
        <TakePictureText>
          Tire uma foto do pacote com a assinatura do destinatário
        </TakePictureText>
        <PrimaryButton
          onPress={handleConfirmDelivery}
          name="Enviar foto"
          style={{ marginTop: 24 }}
          enabled={!!uriImage}
        />
      </SendPhotoButtonContainer>
    </Container>
  )
}

export default ConfirmDelivery
