
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

export default function TranstornosScreen({ navigation }) {
  const [transtornos, setTranstornos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarTranstornos() {
      try {
        setCarregando(true);
        setErro('');

        const resposta = await fetch(`${API_URL}/transtornos`);

        if (!resposta.ok) {
          throw new Error('Não foi possível consultar os transtornos.');
        }

        const dados = await resposta.json();
        setTranstornos(dados);

      } catch (error) {
        console.error('Erro ao buscar transtornos:', error);
        setErro(
          'Não foi possível carregar os transtornos. Verifique se a API está funcionando.'
        );
      } finally {
        setCarregando(false);
      }
    }

    buscarTranstornos();
  }, []);

  return (
    <View style={styles.fundo}>
      <View style={styles.layout}>
        <MHIHeader navigation={navigation} ativa="Transtornos" />

        <ScrollView contentContainerStyle={styles.conteudo}>
          <Text style={styles.categoriaTopo}>
            INFORMAÇÃO E CONSCIENTIZAÇÃO
          </Text>

          <Text style={styles.titulo}>
            Transtornos mentais
          </Text>

          <Text style={styles.descricao}>
            Conhecer a saúde mental é um passo importante para combater
            preconceitos, compreender diferentes experiências e incentivar
            a busca por acolhimento.
          </Text>

          <View style={styles.aviso}>
            <Text style={styles.avisoTitulo}>
              Informação importante
            </Text>

            <Text style={styles.avisoTexto}>
              Este conteúdo tem finalidade educativa. Somente profissionais
              qualificados podem realizar avaliações e diagnósticos.
            </Text>
          </View>

          <Text style={styles.tituloLista}>
            Conheça alguns transtornos
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

          {!carregando && !erro && transtornos.length === 0 && (
            <Text style={styles.mensagem}>
              Nenhum transtorno cadastrado ainda.
            </Text>
          )}

          {!carregando && !erro && transtornos.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.identificacao}>
                <View style={styles.indicador} />

                <View style={styles.identificacaoTexto}>
                  <Text style={styles.categoria}>
                    SAÚDE MENTAL
                  </Text>

                  <Text style={styles.nome}>
                    {item.nome}
                  </Text>
                </View>
              </View>

              <Text style={styles.texto}>
                {item.descricao}
              </Text>

              {!!item.sintomas && (
                <View style={styles.bloco}>
                  <Text style={styles.subtitulo}>
                    Sintomas e características
                  </Text>

                  <Text style={styles.texto}>
                    {item.sintomas}
                  </Text>
                </View>
              )}

              <View style={styles.bloco}>
                <Text style={styles.subtitulo}>
                  Cuidados e tratamento
                </Text>

                <Text style={styles.texto}>
                  As opções de cuidado dependem de cada pessoa e devem ser
                  discutidas com profissionais de saúde qualificados.
                </Text>
              </View>

              {!!item.informacoes_adicionais && (
                <View style={styles.blocoAdicional}>
                  <Text style={styles.subtituloAdicional}>
                    Informações adicionais
                  </Text>

                  <Text style={styles.textoAdicional}>
                    {item.informacoes_adicionais}
                  </Text>
                </View>
              )}
            </View>
          ))}

          <View style={styles.rodape}>
            <Text style={styles.rodapeTexto}>
              Cada pessoa tem uma experiência única. Evite julgamentos
              e lembre-se de que buscar ajuda é um ato de cuidado.
            </Text>
          </View>
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

  categoriaTopo: {
    color: '#168BC3',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.1,
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

  aviso: {
    backgroundColor: '#E5F3FC',
    borderColor: '#C8DDED',
    borderWidth: 1,
    borderRadius: 14,
    padding: 17,
    marginBottom: 25,
  },

  avisoTitulo: {
    color: '#126D9E',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  avisoTexto: {
    color: '#45677E',
    fontSize: 13,
    lineHeight: 21,
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
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,
  },

  identificacao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  indicador: {
    width: 5,
    height: 48,
    backgroundColor: '#168BC3',
    borderRadius: 5,
    marginRight: 12,
  },

  identificacaoTexto: {
    flex: 1,
  },

  categoria: {
    color: '#168BC3',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
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

  bloco: {
    borderTopWidth: 1,
    borderTopColor: '#E5EDF3',
    paddingTop: 13,
    marginTop: 7,
  },

  subtitulo: {
    color: '#168BC3',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  blocoAdicional: {
    backgroundColor: '#F1F7FB',
    borderRadius: 10,
    padding: 13,
    marginTop: 8,
  },

  subtituloAdicional: {
    color: '#126D9E',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  textoAdicional: {
    color: '#587184',
    fontSize: 13,
    lineHeight: 20,
  },

  rodape: {
    backgroundColor: '#EAF4F9',
    borderRadius: 12,
    padding: 16,
    marginTop: 5,
  },

  rodapeTexto: {
    color: '#45677E',
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
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
