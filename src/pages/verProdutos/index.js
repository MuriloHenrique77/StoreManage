import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function VerProdutos() {
  const navigation = useNavigation();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const loadProdutos = async () => {
      try {
        const produtosData = await AsyncStorage.getItem('produtos');
        const produtosList = produtosData ? JSON.parse(produtosData) : [];
        setProdutos(produtosList);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };

    loadProdutos();
  }, []);

  const handleIncrement = (index) => {
    const updatedProdutos = [...produtos];
    updatedProdutos[index].quantidade += 1;
    setProdutos(updatedProdutos);
    saveProdutos(updatedProdutos);
  };

  const handleDecrement = (index) => {
    const updatedProdutos = [...produtos];
    if (updatedProdutos[index].quantidade > 0) {
      updatedProdutos[index].quantidade -= 1;
      setProdutos(updatedProdutos);
      saveProdutos(updatedProdutos);
    }
  };

  const handleValueChange = (index, value) => {
    const updatedProdutos = [...produtos];
    updatedProdutos[index].valor = value;
    setProdutos(updatedProdutos);
    saveProdutos(updatedProdutos);
  };

  const handleRemove = (index) => {
    const updatedProdutos = [...produtos];
    updatedProdutos.splice(index, 1);
    setProdutos(updatedProdutos);
    saveProdutos(updatedProdutos);
  };

  const addNovoProduto = async () => {
    const novoProduto = {
      nomeProduto: 'Novo Produto',
      quantidade: 1,
      idProduto: (produtos.length + 1).toString(),
    };

    const updatedProdutos = [...produtos, novoProduto];
    setProdutos(updatedProdutos);
    await saveProdutos(updatedProdutos);
  };

  const saveProdutos = async (produtosToSave) => {
    try {
      await AsyncStorage.setItem('produtos', JSON.stringify(produtosToSave));
    } catch (error) {
      console.error('Erro ao salvar produtos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Lista de Produtos</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerList}>
        {produtos.length > 0 ? (
          <FlatList
            data={produtos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>Nome: {item.nomeProduto}</Text>
                <Text style={styles.itemText}>Quantidade: {item.quantidade}</Text>
                <Text style={styles.itemText}>Id: {item.idProduto}</Text>

                {item.valor !== undefined && item.valor !== null ? (
                  <Text style={styles.itemText}>Valor: R$ {item.valor.toFixed(2)}</Text>
                ) : (
                  <Text style={styles.itemText}>Valor: Indefinido</Text>
                )}

                <View style={styles.buttonsContainer}>
                  <TouchableOpacity onPress={() => handleIncrement(index)}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleDecrement(index)}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleRemove(index)}>
                    <Text style={styles.buttonText}>X</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.itemText}>Editar Valor:</Text>
                <TextInput
                  style={styles.inputValor}
                  keyboardType="numeric"
                  value={item.valor ? item.valor.toString() : ''}
                  onChangeText={(value) => handleValueChange(index, parseFloat(value) || 0)}
                />
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
        )}
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A9718E',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '18%',
    paddingLeft: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  containerList: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: '5%',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#A9718E',
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 6,
    color: '#000',
  },
  emptyText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 24,
    color: '#A9718E',
    fontWeight: 'bold',
    marginTop: 10,
  },
  inputValor: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
});
