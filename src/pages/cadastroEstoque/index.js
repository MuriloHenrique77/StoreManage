import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function EstoqueProdutos() {
  const navigation = useNavigation();

  const [nomeProduto, setNomeProduto] = useState('');
  const [nomeFornecedor, setNomeFornecedor] = useState('');

  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    const loadFornecedores = async () => {
      try {
        const fornecedoresData = await AsyncStorage.getItem('fornecedores');
        const fornecedoresList = fornecedoresData ? JSON.parse(fornecedoresData) : [];
        setFornecedores(fornecedoresList);
      } catch (error) {
        console.error('Erro ao carregar fornecedores:', error);
      }
    };

    loadFornecedores();
  }, []);

  const handleCadastroProduto = async () => {
    try {
      const fornecedorExistente = fornecedores.find((fornecedor) => fornecedor.nomeFornecedor === nomeFornecedor);

      if (!fornecedorExistente) {
        Alert.alert('Erro', 'Fornecedor não encontrado. Verifique o nome do fornecedor.');
        return;
      }

      const produtosData = await AsyncStorage.getItem('produtos');
      const produtos = produtosData ? JSON.parse(produtosData) : [];

 
      const ultimoProduto = produtos[produtos.length - 1];
      const ultimoId = ultimoProduto ? parseInt(ultimoProduto.idProduto) : 0;
      const proximoId = (ultimoId + 1).toString().padStart(3, '0');

      const novoProduto = {
        nomeProduto,
        idProduto: proximoId,
        nomeFornecedor,
      };

      produtos.push(novoProduto);

      await AsyncStorage.setItem('produtos', JSON.stringify(produtos));

      console.log('Produto cadastrado com sucesso!');
      navigation.navigate('MenuPrincipal', { produtos });
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      Alert.alert('Erro', 'Erro ao cadastrar produto. Tente novamente.');
    }
  };

  return (
    <View style={styles.containerCadastro}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeaderCadastro}>
        <Text style={styles.messageCadastro}>Cadastre um novo item</Text>
      </Animatable.View>  
      <Animatable.View animation="fadeInUp" style={styles.containerFormCadastro}>
        <Text style={styles.titleCadastro}>Nome do Produto</Text>
        <TextInput
          placeholder='Digite o nome do item. . .'
          style={styles.inputCadastro}
          onChangeText={(text) => setNomeProduto(text)}
        />
      
        <Text style={styles.titleCadastro}>Nome do Fornecedor</Text>
        <TextInput
          placeholder='Digite o nome do fornecedor. . .'
          style={styles.inputCadastro}
          onChangeText={(text) => setNomeFornecedor(text)}
        />

        <TouchableOpacity style={styles.buttonCadastro} onPress={handleCadastroProduto}>
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
    color: '#FFF2FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
