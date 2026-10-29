
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/telainicial';
import SentimentosScreen from '../screens/sentimentos';
import TranstornosScreen from '../screens/transtornos';
import LocalizacaoScreen from '../screens/localidades';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
