import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerFornecedores() {
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

  const handleRemove = async (index) => {
    const updatedFornecedores = [...fornecedores];
    updatedFornecedores.splice(index, 1);
    setFornecedores(updatedFornecedores);
    await saveFornecedores(updatedFornecedores);
  };

  const saveFornecedores = async (fornecedoresToSave) => {
    try {
      await AsyncStorage.setItem('fornecedores', JSON.stringify(fornecedoresToSave));
    } catch (error) {
      console.error('Erro ao salvar fornecedores:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Lista de Fornecedores</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerList}>
        {fornecedores.length > 0 ? (
          <FlatList
            data={fornecedores}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <View style={styles.infoContainer}>
                  <Text style={styles.itemText}>Nome: {item.nomeFornecedor}</Text>
                  <Text style={styles.itemText}>Email: {item.emailFornecedor}</Text>
                  <Text style={styles.itemText}>Celular: {item.celularFornecedor}</Text>
                  <Text style={styles.itemText}>CPF: {item.cpfFornecedor}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemove(index)}>
                  <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyText}>Nenhum fornecedor cadastrado.</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
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
  buttonText: {
    fontSize: 24,
    color: '#A9718E',
    fontWeight: 'bold',
  },
});
