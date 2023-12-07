import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/welcome'
import SignIn from '../pages/SignIn'
import Cadastro from '../pages/cadastro';
import CadastrarFornecedor from '../pages/cadastroFornecedor';
import EstoqueProdutos from '../pages/cadastroEstoque';
import MenuPrincipal from '../pages/menu';
import VerProdutos from '../pages/verProdutos';
import VerFornecedores from '../pages/verFornecedores';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = "Welcome"
                component = {Welcome}
                options = {{ headerShown: false}}
            />

            <Stack.Screen
                name = "SignIn"
                component = {SignIn}
                options = {{ headerShown: false}}
            />

            <Stack.Screen
                name = "Cadastro"
                component = {Cadastro}
                options = {{ headerShown: false}}
            />

            <Stack.Screen
                name = "EstoqueProdutos"
                component = {EstoqueProdutos}
                options = {{ headerShown: false}}
                />

            <Stack.Screen
                name = "CadastrarFornecedor"
                component = {CadastrarFornecedor}
                options = {{ headerShown: false}}
                />
            
            <Stack.Screen
                name = "MenuPrincipal"
                component = {MenuPrincipal}
                options = {{ headerShown: false}}
                />
            
            <Stack.Screen
                name = "verProdutos"
                component = {VerProdutos}
                options = {{ headerShown: false}}
                />

            <Stack.Screen
                name = "verFornecedores"
                component = {VerFornecedores}
                options = {{ headerShown: false}}
                />
        </Stack.Navigator>
    )
}