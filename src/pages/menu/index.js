import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function MenuPrincipal() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="pulse" 
                    easing="ease-out" 
                    iterationCount="infinite"
                    source={require('../../assets/Frame1.png')}
                    style={{ width: '100%' }}
                    resizeMode="contain"
                />
            </View>

            <Animatable.View delay={700} animation='fadeInUp' style={styles.containerForm}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('EstoqueProdutos')}
                >
                    <Text style={styles.buttonTextMenu}>Cadastrar Produto</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('CadastrarFornecedor')}
                >
                    <Text style={styles.buttonTextMenu}>Cadastrar Fornecedor</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('verProdutos')}
                >
                    <Text style={styles.buttonTextMenu}>Ver Produto</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('verFornecedores')}
                >
                    <Text style={styles.buttonTextMenu}>Ver Fornecedores</Text>
                </TouchableOpacity>
            </Animatable.View>

        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A9718E',
        justifyContent: 'center', 
    },
    containerLogo: {
        flex: 0.6, 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    containerForm: {
        marginTop:-100,
        flex: 0.4, 
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    button: {
        backgroundColor: '#A9718E',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 12,
        marginVertical: 10,
        width: '60%', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTextMenu: {
        fontSize: 18,
        color: '#FFF2FF',
        fontWeight: 'bold',
    },
});
