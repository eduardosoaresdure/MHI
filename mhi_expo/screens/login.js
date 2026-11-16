
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import API_URL from '../config/api';

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
      <View style={styles.formaSuperior} />
      <View style={styles.formaInferior} />
      <View style={styles.formaLateral} />

      <KeyboardAvoidingView
        style={styles.teclado}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.conteudo}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formulario}>
            <Text style={styles.titulo}>Login</Text>

            <Text style={styles.descricao}>
              Entre na sua conta para continuar.
            </Text>

            <View style={styles.campo}>
              <Feather name="user" size={17} color="#EAF7FF" />

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#EAF7FF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.campo}>
              <Feather name="lock" size={17} color="#EAF7FF" />

              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#EAF7FF"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.botao,
                pressed && styles.botaoPressionado,
                carregando && styles.botaoDesabilitado,
              ]}
              onPress={entrar}
              disabled={carregando}
            >
              <Text style={styles.textoBotao}>
                {carregando ? 'Entrando...' : 'Entrar'}
              </Text>
            </Pressable>

            <Text style={styles.textoCadastro}>
              Ainda não tem uma conta?
            </Text>

            <Pressable onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.linkCadastro}>Criar minha conta</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('Home')}
              style={styles.voltarContainer}
            >
              <Feather name="arrow-left" size={14} color="#EAF7FF" />
              <Text style={styles.voltar}>Voltar ao início</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#168FD0',
    overflow: 'hidden',
  },

  teclado: {
    flex: 1,
    zIndex: 2,
  },

  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 45,
  },

  formulario: {
    width: '100%',
    maxWidth: 390,
    alignItems: 'center',
  },

  formaSuperior: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#64B9E8',
    top: -135,
    left: -105,
    opacity: 0.45,
  },

  formaInferior: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: '#087DBB',
    bottom: -145,
    left: -105,
    opacity: 0.55,
  },

  formaLateral: {
    position: 'absolute',
    width: 250,
    height: 310,
    borderRadius: 100,
    backgroundColor: '#087DBB',
    right: -175,
    top: '37%',
    transform: [{ rotate: '-25deg' }],
    opacity: 0.45,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 7,
  },

  descricao: {
    color: '#EAF7FF',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 27,
  },

  campo: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    marginBottom: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },

  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    marginLeft: 10,
    paddingVertical: 10,
    outlineStyle: 'none',
  },

  botao: {
    width: '100%',
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  botaoPressionado: {
    backgroundColor: '#EAF7FF',
    opacity: 0.9,
  },

  botaoDesabilitado: {
    opacity: 0.65,
  },

  textoBotao: {
    color: '#087DBB',
    fontSize: 14,
    fontWeight: '700',
  },

  textoCadastro: {
    color: '#EAF7FF',
    fontSize: 12,
    marginTop: 25,
  },

  linkCadastro: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 5,
    textDecorationLine: 'underline',
  },

  voltarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
    gap: 7,
  },

  voltar: {
    color: '#EAF7FF',
    fontSize: 12,
  },
});
