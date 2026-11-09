
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/telainicial';
import SentimentosScreen from '../screens/sentimentos';
import TranstornosScreen from '../screens/transtornos';
import LocalizacaoScreen from '../screens/localidades';
import LoginScreen from '../screens/login';
import CadastroScreen from '../screens/cadastro';
import AdminScreen from '../screens/admin';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F4FAFE' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sentimentos" component={SentimentosScreen} />
        <Stack.Screen name="Transtornos" component={TranstornosScreen} />
        <Stack.Screen name="Localidades" component={LocalizacaoScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
