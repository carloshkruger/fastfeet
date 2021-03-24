import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { useRoute } from '@react-navigation/core'

import { useAuth } from '../../hooks/Auth'
import api from '../../utils/Api'
import { handleApiError } from '../../utils/handleApiError'
import { Delivery } from '../../models/Delivery'
import DeliveryCard from '../../components/DeliveryCard'

import ExitApp from '../../assets/ExitApp.png'
import MapsPin from '../../assets/MapsPin.png'

import {
  Container,
  Header,
  WelcomeContainer,
  WelcomeText,
  UserNameText,
  TitleContainer,
  TitleText,
  LocationContainer,
  LocationText,
  InputContainer,
  TextInput,
  Icon,
  HeaderUserInfo,
  SearchResultListItem,
  SearchResultListContainer,
  RightIcon,
  SearchBarContainer,
  SearchBarSubContainer,
  LoadingText,
  NoDeliveryFoundText
} from './styles'

const Deliveries: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [searchResultList, setSearchResultList] = useState<string[]>([])
  const [searchingDeliveries, setSearchingDeliveries] = useState(false)
  const [showClearTextIcon, setShowClearTextIcon] = useState(false)

  const { signOut, user } = useAuth()
  const { name: routeName } = useRoute()

  useEffect(() => {
    const timer = setTimeout(findNeighborhoodList, 1000)

    return () => clearTimeout(timer)
  }, [searchValue])

  useEffect(() => {
    getDeliveries()
  }, [])

  function onTextChangeInSearchInput(text: string) {
    setSearchValue(text)
    setShowClearTextIcon(!!text.length)

    if (text.length === 0) {
      setSearchResultList([])
    }
  }

  function onPressClearText() {
    setSearchValue('')
    setShowClearTextIcon(false)
    setSearchResultList([])
    getDeliveries()
  }

  async function findNeighborhoodList() {
    try {
      if (!searchValue) {
        setSearchResultList([])
        return
      }

      const response = await api.get('/deliveries/neighborhoods', {
        params: {
          neighborhood: searchValue
        }
      })

      setSearchResultList(response.data.neighborhoods)
    } catch (error) {
      setSearchResultList([])
      handleApiError(error)
    }
  }

  async function getDeliveries(neighborhood = '') {
    try {
      setSearchResultList([])
      setSearchingDeliveries(true)

      const apiRouteName =
        routeName === 'PendingDeliveries'
          ? 'deliveries-to-be-made'
          : 'deliveries-already-made'

      const response = await api.get(`/users/${apiRouteName}`, {
        params: {
          neighborhood
        }
      })

      setDeliveries(response.data)
    } catch (error) {
      handleApiError(error)
    } finally {
      setSearchingDeliveries(false)
    }
  }

  return (
    <Container>
      <View>
        <Header>
          <HeaderUserInfo>
            <WelcomeContainer>
              <WelcomeText>Bem vindo,</WelcomeText>
              <UserNameText>{user?.name}</UserNameText>
            </WelcomeContainer>
            <TouchableOpacity onPress={signOut}>
              <Image source={ExitApp} />
            </TouchableOpacity>
          </HeaderUserInfo>

          <TitleContainer>
            <TitleText>Entregas</TitleText>
            <LocationContainer>
              <Image source={MapsPin} />
              <LocationText>Rio do Sul</LocationText>
            </LocationContainer>
          </TitleContainer>
        </Header>

        <SearchBarContainer>
          <SearchBarSubContainer>
            <InputContainer>
              <Icon name="search" size={20} />
              <TextInput
                value={searchValue}
                placeholder="Filtrar por bairro"
                onChangeText={onTextChangeInSearchInput}
              />
              <RightIcon
                name="x"
                size={20}
                onPress={onPressClearText}
                style={{ display: showClearTextIcon ? 'flex' : 'none' }}
              />
            </InputContainer>

            <SearchResultListContainer>
              {searchResultList.length &&
                searchResultList.map(item => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => getDeliveries(item)}
                  >
                    <SearchResultListItem>
                      <Text>{item}</Text>
                    </SearchResultListItem>
                  </TouchableOpacity>
                ))}
            </SearchResultListContainer>
          </SearchBarSubContainer>
        </SearchBarContainer>
      </View>

      {searchingDeliveries ? (
        <LoadingText>Carregando...</LoadingText>
      ) : (
        <FlatList
          ListEmptyComponent={
            <NoDeliveryFoundText>
              Nenhum resultado encontrado
            </NoDeliveryFoundText>
          }
          style={{ marginTop: 16 }}
          data={deliveries}
          keyExtractor={item => item.deliveryId}
          renderItem={({ item }) => <DeliveryCard delivery={item} />}
        />
      )}
    </Container>
  )
}

export default Deliveries
