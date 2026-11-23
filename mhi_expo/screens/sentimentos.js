
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import MHIHeader from '../components/header-temp';

import API_URL from '../config/api';

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

const cores = {
  'Alegria': '#E5A928',
  'Tristeza': '#5685B5',
  'Ansiedade': '#8B6BC1',
  'Raiva': '#D66A62',
  'Medo': '#568B9D',
  'Solidão': '#7375A8',
  'Culpa': '#A17B55',
  'Esgotamento': '#4F9189',
  'Esperança': '#479B75',
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
        setErro(
          'Não foi possível carregar os sentimentos. Verifique se a API está funcionando.'
        );
      } finally {
        setCarregando(false);
      }
    }

    buscarSentimentos();
  }, []);

  return (
    <View style={styles.fundo}>
      <View style={styles.layout}>
        <MHIHeader navigation={navigation} ativa="Sentimentos" />

        <ScrollView contentContainerStyle={styles.conteudo}>
          <Text style={styles.categoria}>
            AUTOCONHECIMENTO
          </Text>

          <Text style={styles.titulo}>
            Seus sentimentos
          </Text>

          <Text style={styles.descricao}>
            Todo sentimento tem uma função. Reconhecer o que você sente
            pode ajudar a compreender suas necessidades.
          </Text>

          <View style={styles.destaque}>
            <Text style={styles.destaqueTitulo}>
              Não existe sentimento errado.
            </Text>

            <Text style={styles.destaqueTexto}>
              Aprender a identificar suas emoções é um passo importante
              para cuidar do seu bem-estar.
            </Text>
          </View>

          <Text style={styles.tituloLista}>
            Conheça algumas emoções
          </Text>

          {carregando && (
            <ActivityIndicator
              size="large"
              color="#168BC3"
              style={styles.carregando}
            />
          )}

          {!!erro && (
            <Text style={styles.erro}>{erro}</Text>
          )}

          {!carregando && !erro && sentimentos.length === 0 && (
            <Text style={styles.mensagem}>
              Nenhum sentimento cadastrado ainda.
            </Text>
          )}

          {!carregando && !erro && sentimentos.map((item) => {
            const cor = cores[item.nome] || '#168BC3';

            return (
              <View
                key={item.id}
                style={[
                  styles.card,
                  { borderLeftColor: cor },
                ]}
              >
                <View style={styles.cabecalhoCard}>
                  <View
                    style={[
                      styles.emojiContainer,
                      { borderColor: cor },
                    ]}
                  >
                    <Text style={styles.emoji}>
                      {emojis[item.nome] || '💭'}
                    </Text>
                  </View>

                  <Text style={styles.nome}>
                    {item.nome}
                  </Text>
                </View>

                <Text style={styles.texto}>
                  {item.descricao}
                </Text>

                <View style={styles.separador} />

                <Text style={styles.subtitulo}>
                  Como lidar com esse sentimento?
                </Text>

                <Text style={styles.texto}>
                  {item.orientacoes || 'Não há orientações cadastradas.'}
                </Text>

                <View style={styles.blocoAjuda}>
                  <Text style={styles.subtituloAjuda}>
                    Quando buscar ajuda?
                  </Text>

                  <Text style={styles.textoAjuda}>
                    Se o sofrimento persistir ou dificultar seu cotidiano,
                    conversar com alguém de confiança ou com um profissional
                    pode ajudar.
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'row',
  },

  fundo: {
    flex: 1,
    backgroundColor: '#F4FAFE',
  },

  conteudo: {
    padding: 20,
    paddingBottom: 35,
  },

  categoria: {
    color: '#168BC3',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 8,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#102D42',
    marginBottom: 9,
  },

  descricao: {
    color: '#587184',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 20,
  },

  destaque: {
    backgroundColor: '#E5F3FC',
    borderRadius: 14,
    padding: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#C8DDED',
  },

  destaqueTitulo: {
    color: '#126D9E',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  destaqueTexto: {
    color: '#45677E',
    lineHeight: 21,
    fontSize: 14,
  },

  tituloLista: {
    color: '#102D42',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  carregando: {
    marginVertical: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE8F0',
    borderLeftWidth: 5,
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,
  },

  cabecalhoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  emojiContainer: {
    width: 48,
    height: 48,
    borderRadius: 13,
    borderWidth: 1,
    backgroundColor: '#F4FAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  emoji: {
    fontSize: 25,
  },

  nome: {
    color: '#123047',
    fontSize: 19,
    fontWeight: 'bold',
  },

  texto: {
    color: '#587184',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
  },

  separador: {
    height: 1,
    backgroundColor: '#E5EDF3',
    marginVertical: 12,
  },

  subtitulo: {
    color: '#168BC3',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  blocoAjuda: {
    backgroundColor: '#F1F7FB',
    borderRadius: 10,
    padding: 13,
    marginTop: 5,
  },

  subtituloAjuda: {
    color: '#126D9E',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  textoAjuda: {
    color: '#587184',
    fontSize: 13,
    lineHeight: 20,
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
