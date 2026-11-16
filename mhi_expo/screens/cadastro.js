
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

import API_URL from '../config/api';

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
      {/* Formas decorativas */}
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
            <Text style={styles.titulo}>Criar conta</Text>

            <Text style={styles.descricao}>
              Cadastre-se para acessar o MHI.
            </Text>

            {/* Nome */}
            <View style={styles.campo}>
              <Feather name="user" size={17} color="#EAF7FF" />

              <TextInput
                style={styles.input}
                placeholder="Nome completo"
                placeholderTextColor="#EAF7FF"
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />
            </View>

            {/* Email */}
            <View style={styles.campo}>
              <Feather name="mail" size={17} color="#EAF7FF" />

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

            {/* Senha */}
            <View style={styles.campo}>
              <Feather name="lock" size={17} color="#EAF7FF" />

              <TextInput
                style={styles.input}
                placeholder="Senha (mínimo 6 caracteres)"
                placeholderTextColor="#EAF7FF"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
            </View>

            {/* Botão */}
            <Pressable
              style={({ pressed }) => [
                styles.botao,
                pressed && styles.botaoPressionado,
                carregando && styles.botaoDesabilitado,
              ]}
              onPress={cadastrar}
              disabled={carregando}
            >
              <Text style={styles.textoBotao}>
                {carregando ? 'Cadastrando...' : 'Cadastrar'}
              </Text>
            </Pressable>

            <Text style={styles.textoLogin}>
              Já possui uma conta?
            </Text>

            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkLogin}>Entrar na minha conta</Text>
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

  textoLogin: {
    color: '#EAF7FF',
    fontSize: 12,
    marginTop: 25,
  },

  linkLogin: {
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
