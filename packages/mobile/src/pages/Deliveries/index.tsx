import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View, FlatList } from 'react-native'

import { useAuth } from '../../hooks/Auth'

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
  RightIcon
} from './styles'

import api from '../../utils/Api'
import { handleApiError } from '../../utils/handleApiError'
import { Delivery } from '../../models/Delivery'
import DeliveryCard from '../../components/DeliveryCard'
import { useRoute } from '@react-navigation/core'

const Deliveries: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [searchResultList, setSearchResultList] = useState<string[]>([])
  const [searchingNeighborhoods, setSearchingNeighborhoods] = useState(false)
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

      setSearchingNeighborhoods(true)

      const response = await api.get('/deliveries/neighborhoods', {
        params: {
          neighborhood: searchValue
        }
      })

      setSearchResultList(response.data.neighborhoods)
      setSearchingNeighborhoods(false)
    } catch (error) {
      setSearchResultList([])
      setSearchingNeighborhoods(false)
      handleApiError(error)
    }
  }

  async function getDeliveries(neighborhood = '') {
    try {
      setSearchResultList([])
      setSearchingDeliveries(true)
      setDeliveries([])

      const apiRouteName =
        routeName === 'PendingDeliveries'
          ? 'deliveries-to-be-made'
          : 'deliveries-already-made'

      const response = await api.get(`/users/${apiRouteName}`, {
        params: {
          neighborhood
        }
      })

      setSearchingDeliveries(false)
      setDeliveries(response.data)
    } catch (error) {
      setSearchingDeliveries(false)
      handleApiError(error)
    }
  }

  return (
    <Container>
      <View>
        <Header>
          <HeaderUserInfo>
            <WelcomeContainer>
              <WelcomeText>Bem vindo,</WelcomeText>
              <UserNameText>{user.name}</UserNameText>
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

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%'
            }}
          >
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
              {searchResultList.length
                ? searchResultList.map(item => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => getDeliveries(item)}
                    >
                      <SearchResultListItem>
                        <Text>{item}</Text>
                      </SearchResultListItem>
                    </TouchableOpacity>
                  ))
                : null}
            </SearchResultListContainer>
          </View>
        </View>
      </View>

      {deliveries.length ? (
        <FlatList
          style={{ marginTop: 16 }}
          data={deliveries}
          keyExtractor={item => item.deliveryId}
          renderItem={({ item }) => <DeliveryCard delivery={item} />}
        />
      ) : searchingDeliveries ? (
        <Text style={{ fontSize: 18, textAlign: 'center', paddingTop: 16 }}>
          Carregando...
        </Text>
      ) : (
        <Text style={{ fontSize: 18, textAlign: 'center', paddingTop: 16 }}>
          Nenhum resultado encontrado
        </Text>
      )}
    </Container>
  )
}

export default Deliveries
