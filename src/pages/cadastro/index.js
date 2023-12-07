import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [celular, setCelular] = useState('');
  const [cpf, setCpf] = useState('');

  const saveUserData = async () => {
    try {
      const usersData = await AsyncStorage.getItem('users');
      let users = usersData ? JSON.parse(usersData) : [];


      if (users.find(user => user.email === email)) {
        Alert.alert('Erro', 'Este email já está cadastrado. Tente outro.');
        return;
      }

      const newUser = { email, senha, celular, cpf };
      users.push(newUser);


      await AsyncStorage.setItem('users', JSON.stringify(users));

      console.log('Usuário cadastrado com sucesso!');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <View style={styles.containerCadastro}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeaderCadastro}>
        <Text style={styles.messageCadastro}>Cadastre-se!</Text>
      </Animatable.View>  
      <Animatable.View animation="fadeInUp" style={styles.containerFormCadastro}>
        <Text style={styles.titleCadastro}>Email</Text>
        <TextInput
          placeholder='Digite um email. . .'
          autoComplete="email"
          keyboardType="email-address"
          style={styles.inputCadastro}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.titleCadastro}>Senha</Text>
        <TextInput
          placeholder='Digite uma senha. . .'
          secureTextEntry
          autoCapitalize="none"
          style={styles.inputCadastro}
          onChangeText={(text) => setSenha(text)}
        />
        
        <Text style={styles.titleCadastro}>Celular</Text>
        <TextInput
          placeholder='Digite seu numero de celular. . .'
          keyboardType='numeric'
          style={styles.inputCadastro}
          onChangeText={(text) => setCelular(text)}
        />
        <Text style={styles.titleCadastro}>CPF</Text>
        <TextInput
          placeholder='Digite seu CPF. . .'
          keyboardType='numeric'
          style={styles.inputCadastro}
          onChangeText={(text) => setCpf(text)}
        />

        <TouchableOpacity style={styles.buttonCadastro} onPress={saveUserData}>
          <Text style={styles.buttonTextCadastro}>Cadastrar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCadastro: {
    flex: 1,
    backgroundColor: '#A9718E',
  },
  messageCadastro: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  containerHeaderCadastro: {
    marginTop: '14%',
    marginBottom: '18%',
    paddingLeft: '5%',
  },
  containerFormCadastro: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  titleCadastro: {
    fontSize: 20,
    marginTop: 28,
  },
  inputCadastro: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  buttonCadastro: {
    position: 'absolute',
    backgroundColor: '#A9718E',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextCadastro: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
