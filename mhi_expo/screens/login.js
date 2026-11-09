
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (!email.trim() || !senha) {
      Alert.alert('Atenção', 'Preencha email e senha.');
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        Alert.alert('Erro', dados.mensagem || 'Não foi possível entrar.');
        return;
      }

      await AsyncStorage.setItem('token', dados.token);
      await AsyncStorage.setItem('usuario', JSON.stringify(dados.usuario));

      if (dados.usuario.nivel_usuario === 'admin') {
        navigation.replace('Admin');
      } else {
        navigation.replace('Home');
      }
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.fundo}>
      <Text style={styles.logo}>MHI</Text>
      <Text style={styles.titulo}>Bem-vindo de volta!</Text>
      <Text style={styles.descricao}>Entre na sua conta para continuar.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Pressable style={styles.botao} onPress={entrar} disabled={carregando}>
        <Text style={styles.textoBotao}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>Ainda não tem conta? Cadastre-se</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Home')}>
        <Text style={styles.voltar}>Voltar ao início</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#F4FAFE',
    justifyContent: 'center',
    padding: 25,
  },
  logo: {
    color: '#168BC3',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titulo: {
    color: '#102D42',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
  descricao: {
    color: '#587184',
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8DDED',
    borderRadius: 12,
    padding: 15,
    marginBottom: 14,
  },
  botao: {
    backgroundColor: '#168BC3',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 5,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  link: {
    color: '#168BC3',
    textAlign: 'center',
    marginTop: 22,
    fontWeight: 'bold',
  },
  voltar: {
    color: '#587184',
    textAlign: 'center',
    marginTop: 18,
  },
});
