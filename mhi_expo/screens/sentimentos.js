
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import MHIHeader from '../components/header-temp';

// Endereço da API para testes no navegador do computador
const API_URL = 'http://localhost:3000';

const emojis = {
  'Alegria': '☀️',
  'Tristeza': '💭',
  'Ansiedade': '🌀',
  'Raiva': '🔥',
  'Medo': '🛡️',
  'Solidão': '🌙',
  'Culpa': '⚖️',
  'Esgotamento': '🔋',
  'Esperança': '🌱',
};

export default function SentimentosScreen({ navigation }) {
  const [sentimentos, setSentimentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarSentimentos() {
      try {
        setCarregando(true);
        setErro('');

        const resposta = await fetch(`${API_URL}/sentimentos`);

        if (!resposta.ok) {
          throw new Error('Não foi possível consultar os sentimentos.');
        }

        const dados = await resposta.json();

        setSentimentos(dados);

      } catch (error) {
        console.error('Erro ao buscar sentimentos:', error);
        setErro('Não foi possível carregar os sentimentos. Verifique se a API está funcionando.');
      } finally {
        setCarregando(false);
      }
    }

    buscarSentimentos();
  }, []);

  return (
    <View style={styles.fundo}>
      <MHIHeader navigation={navigation} ativa="Sentimentos" />

      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>Seus sentimentos</Text>

        <Text style={styles.descricao}>
          Todo sentimento tem uma função. Reconhecer o que você sente
          pode ajudar a compreender suas necessidades.
        </Text>

        {carregando && (
          <ActivityIndicator size="large" color="#168BC3" />
        )}

        {!!erro && (
          <Text style={styles.erro}>{erro}</Text>
        )}

        {!carregando && !erro && sentimentos.length === 0 && (
          <Text style={styles.mensagem}>
            Nenhum sentimento cadastrado ainda.
          </Text>
        )}

        {!carregando && sentimentos.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.emoji}>
              {emojis[item.nome] || '💭'}
            </Text>

            <Text style={styles.nome}>{item.nome}</Text>

            <Text style={styles.texto}>{item.descricao}</Text>

            <Text style={styles.subtitulo}>Orientações</Text>

            <Text style={styles.texto}>
              {item.orientacoes || 'Não há orientações cadastradas.'}
            </Text>

            <Text style={styles.subtitulo}>Quando buscar ajuda</Text>

            <Text style={styles.texto}>
              Se o sofrimento persistir ou dificultar seu cotidiano,
              conversar com alguém de confiança ou com um profissional
              pode ajudar.
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#F4FAFE',
  },
  conteudo: {
    padding: 16,
    paddingBottom: 30,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#102D42',
    marginBottom: 8,
  },
  descricao: {
    color: '#587184',
    lineHeight: 21,
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C8DDED',
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
    marginBottom: 13,
  },
  emoji: {
    fontSize: 25,
    marginBottom: 8,
  },
  nome: {
    color: '#123047',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  texto: {
    color: '#587184',
    lineHeight: 21,
    marginBottom: 10,
  },
  subtitulo: {
    color: '#168BC3',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  erro: {
    color: '#C0392B',
    textAlign: 'center',
    marginTop: 15,
  },
  mensagem: {
    color: '#587184',
    textAlign: 'center',
    marginTop: 15,
  },
});
