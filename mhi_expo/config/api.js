
import { Platform } from 'react-native';

// Endereço do computador na rede local
const IP_LOCAL = '10.136.164.171';

// Configuração automática conforme o ambiente
const API_URL =
    process.env.EXPO_PUBLIC_API_URL ||
    (Platform.OS === 'web'
        ? 'http://localhost:3000'
        : `http://${IP_LOCAL}:3000`);

export default API_URL;
