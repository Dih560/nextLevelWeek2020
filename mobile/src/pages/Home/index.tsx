import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { View, ImageBackground, StyleSheet, Image, Text, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface IBGEUFRespose {
  sigla: string;
}

interface IBGECityRespose {
  nome: string;
}

const Home = () => {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<object>([] as object);
  const [cities, setCities] = useState<object>([] as object);
  const [selectedUf, setSelectedUf] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  function handleNavigateToPoints() {
    if (selectedUf === '') {
      Alert.alert('Oooooops...', 'Favor selecionar um estado!');
      return null;
    }
    if (selectedCity === '') {
      Alert.alert('Oooooops...', 'Favor selecionar uma cidade!');
      return null;
    }
    navigation.navigate('Points', { city: selectedCity, uf: selectedUf });
  }

  function handleSelectUf (value: string) {
    setSelectedUf(value);
    setSelectedCity('');
  }

  function handleSelectCity (value: string) {
    setSelectedCity(value);
  }

  useEffect(() => {
    axios.get<IBGEUFRespose[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => ({label: uf.sigla, value: uf.sigla}));
      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf != '') {
      axios.get<IBGECityRespose[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+selectedUf+'/municipios').then(response => {
        const citysNames = response.data.map(city => ({label: city.nome, value: city.nome}));
        setCities(citysNames);
      });
    } else {
      setCities([]);
    }
  }, [selectedUf])

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>

      <View style={styles.footer}>
        <RNPickerSelect
          placeholder={{label: 'Selecione o Estado...', value: ''}}
          onValueChange={value => handleSelectUf(value)}
          items={ufs}
        />
        <RNPickerSelect
          placeholder={{label: 'Selecione a Cidade...', value: ''}}
          onValueChange={value => handleSelectCity(value)}
          items={cities}
        />
        <RectButton style={styles.button} onPress={handleNavigateToPoints} >
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {
    borderColor: '#000'
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;