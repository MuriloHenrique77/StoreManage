import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      
      const user = users.find(u => u.email === email && u.senha === senha);

      if (user) {
        console.log('Login bem-sucedido!');
        navigation.navigate('MenuPrincipal');
      } else {

        Alert.alert('Erro', 'Email ou senha inválidos. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao realizar o login:', error);
    }
  };

  return (
    <View style={styles.containerSignIn}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeaderSignIn}>
        <Text style={styles.messageSignIn}>Bem-Vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerFormSignIn}>
        <Text style={styles.titleSignIn}>Email</Text>
        <TextInput
          placeholder='Digite um email. . .'
          autoComplete="email"
          keyboardType="email-address"
          style={styles.inputSignIn}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.titleSignIn}>Senha</Text>
        <TextInput
          placeholder='Digite uma senha. . .'
          secureTextEntry
          autoCapitalize="none"
          style={styles.inputSignIn}
          onChangeText={(text) => setSenha(text)}
        />

        <TouchableOpacity style={styles.buttonSignIn} onPress={handleLogin}>
          <Text style={styles.buttonTextSignIn}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegisterSignIn} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.registerTextSignIn}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerSignIn: {
    flex: 1,
    backgroundColor: '#A9718E',
  },
  containerHeaderSignIn: {
    marginTop: '14%',
    marginBottom: '18%',
    paddingLeft: '5%',
  },
  messageSignIn: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  containerFormSignIn: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  titleSignIn: {
    fontSize: 20,
    marginTop: 28,
  },
  inputSignIn: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  buttonSignIn: {
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
  buttonTextSignIn: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRegisterSignIn: {
    marginTop: 14,
    alignSelf: 'center',
  },
  registerTextSignIn: {
    color: '#a1a1a1',
  },
});
