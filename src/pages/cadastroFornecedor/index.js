import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function CadastrarFornecedor() {
  const navigation = useNavigation();

  const [nomeFornecedor, setNomeFornecedor] = useState('');
  const [emailFornecedor, setEmailFornecedor] = useState('');
  const [celularFornecedor, setCelularFornecedor] = useState('');
  const [cpfFornecedor, setCpfFornecedor] = useState('');

  const handleCadastroFornecedor = async () => {
    try {

      const fornecedoresData = await AsyncStorage.getItem('fornecedores');
      const fornecedores = fornecedoresData ? JSON.parse(fornecedoresData) : [];

  
      const novoFornecedor = {
        nomeFornecedor,
        emailFornecedor,
        celularFornecedor,
        cpfFornecedor,
      };

      fornecedores.push(novoFornecedor);

      await AsyncStorage.setItem('fornecedores', JSON.stringify(fornecedores));


      console.log('Fornecedor cadastrado com sucesso!');
      navigation.navigate('MenuPrincipal', { fornecedores });
    } catch (error) {
      console.error('Erro ao cadastrar fornecedor:', error);
      Alert.alert('Erro', 'Erro ao cadastrar fornecedor. Tente novamente.');
    }
  };

  return (
    <View style={styles.containerCadastro}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeaderCadastro}>
        <Text style={styles.messageCadastro}>Cadastre seu Fornecedor</Text>
      </Animatable.View>  
      <Animatable.View animation="fadeInUp" style={styles.containerFormCadastro}>
        <Text style={styles.titleCadastro}>Nome do Fornecedor</Text>
        <TextInput
          placeholder='Digite o nome do fornecedor. . .'
          style={styles.inputCadastro}
          onChangeText={(text) => setNomeFornecedor(text)}
        />
        <Text style={styles.titleCadastro}>Email do Fornecedor</Text>
        <TextInput
          placeholder='Digite o email do fornecedor. . .'
          autoComplete="email"
          keyboardType="email-address"
          style={styles.inputCadastro}
          onChangeText={(text) => setEmailFornecedor(text)}
        />
        <Text style={styles.titleCadastro}>Celular do Fornecedor</Text>
        <TextInput
          placeholder='Digite o número do fornecedor. . .'
          keyboardType='numeric'
          style={styles.inputCadastro}
          onChangeText={(text) => setCelularFornecedor(text)}
        />
        <Text style={styles.titleCadastro}>CPF/CNPJ do Fornecedor</Text>
        <TextInput
          placeholder='Digite o CPF/CNPJ do fornecedor. . .'
          keyboardType='numeric'
          style={styles.inputCadastro}
          onChangeText={(text) => setCpfFornecedor(text)}
        />

        <TouchableOpacity style={styles.buttonCadastro} onPress={handleCadastroFornecedor}>
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
      titleSCadastro: {
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
        color: '#FFF2FF',
        fontSize: 18,
        fontWeight: 'bold',
      },
})