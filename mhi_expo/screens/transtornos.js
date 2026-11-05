
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import MHIHeader from '../components/header-temp';

const API_URL = 'http://localhost:3000';

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
      <MHIHeader navigation={navigation} ativa="Transtornos" />

      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>Transtornos mentais</Text>

        <Text style={styles.descricao}>
          Conheça informações introdutórias sobre saúde mental.
          O conteúdo é educativo e não substitui avaliação profissional.
        </Text>

        {carregando && (
          <ActivityIndicator size="large" color="#168BC3" />
        )}

        {!!erro && (
          <Text style={styles.erro}>{erro}</Text>
        )}

        {!carregando && !erro && transtornos.length === 0 && (
          <Text style={styles.mensagem}>
            Nenhum transtorno cadastrado ainda.
          </Text>
        )}

        {!carregando && transtornos.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.categoria}>SAÚDE MENTAL</Text>

            <Text style={styles.nome}>{item.nome}</Text>

            <Text style={styles.texto}>
              {item.descricao}
            </Text>

            {!!item.sintomas && (
              <>
                <Text style={styles.subtitulo}>Sintomas</Text>
                <Text style={styles.texto}>
                  {item.sintomas}
                </Text>
              </>
            )}

            <Text style={styles.subtitulo}>
              Cuidados e tratamento
            </Text>

            <Text style={styles.texto}>
              As opções de cuidado dependem de cada pessoa e devem ser
              discutidas com profissionais de saúde qualificados.
            </Text>

            {!!item.informacoes_adicionais && (
              <>
                <Text style={styles.subtitulo}>
                  Informações adicionais
                </Text>

                <Text style={styles.texto}>
                  {item.informacoes_adicionais}
                </Text>
              </>
            )}
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

  categoria: {
    color: '#168BC3',
    fontSize: 11,
    marginBottom: 7,
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
