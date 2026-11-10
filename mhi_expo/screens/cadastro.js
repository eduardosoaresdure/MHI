
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

const API_URL = 'http://localhost:3000';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function cadastrar() {
    if (!nome.trim() || !email.trim() || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch(`${API_URL}/auth/registrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        Alert.alert('Erro', dados.mensagem || 'Não foi possível cadastrar.');
        return;
      }

      Alert.alert('Sucesso', 'Conta criada! Agora faça seu login.');
      navigation.navigate('Login');
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.fundo}>
      <Image
  source={require('../assets/MHI logo.png')}
  style={styles.logo}
  resizeMode="contain"
/>
      <Text style={styles.titulo}>Criar conta</Text>
      <Text style={styles.descricao}>Cadastre-se para acessar o MHI.</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

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
        placeholder="Senha (mínimo 6 caracteres)"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Pressable
        style={styles.botao}
        onPress={cadastrar}
        disabled={carregando}
      >
        <Text style={styles.textoBotao}>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já possui conta? Entre aqui.</Text>
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
  width: 110,
  height: 110,
  alignSelf: 'center',
  marginBottom: 15,
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
