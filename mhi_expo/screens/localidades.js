
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

export default function LocalizacaoScreen({ navigation }) {
  const [servicos, setServicos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarServicos() {
      try {
        setCarregando(true);
        setErro('');

        const resposta = await fetch(`${API_URL}/localidades`);

        if (!resposta.ok) {
          throw new Error('Não foi possível consultar os serviços.');
        }

        const dados = await resposta.json();
        setServicos(dados);

      } catch (error) {
        console.error('Erro ao buscar localidades:', error);
        setErro(
          'Não foi possível carregar os serviços. Verifique se a API está funcionando.'
        );
      } finally {
        setCarregando(false);
      }
    }

    buscarServicos();
  }, []);

  return (
    <View style={styles.fundo}>
      <MHIHeader navigation={navigation} ativa="Localidades" />

      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.categoria}>SANTA CRUZ DO SUL — RS</Text>

        <Text style={styles.titulo}>Onde buscar ajuda</Text>

        <Text style={styles.descricao}>
          Conheça serviços de saúde mental e procure informações
          para encontrar atendimento na sua região.
        </Text>

        <View style={styles.mapa}>
          <Text style={styles.emoji}></Text>

          <Text style={styles.nomeMapa}>Mapa dos serviços</Text>

          <Text style={styles.texto}>
            A visualização interativa do mapa será adicionada
            em uma próxima etapa do projeto.
          </Text>
        </View>

        {carregando && (
          <ActivityIndicator size="large" color="#168BC3" />
        )}

        {!!erro && (
          <Text style={styles.erro}>{erro}</Text>
        )}

        {!carregando && !erro && servicos.length === 0 && (
          <Text style={styles.mensagem}>
            Nenhum serviço cadastrado ainda.
          </Text>
        )}

        {!carregando && servicos.map((servico) => (
          <View key={servico.id} style={styles.card}>
            <Text style={styles.nome}>{servico.nome}</Text>

            <Text style={styles.tipo}>
              {servico.tipo_servico}
            </Text>

            <Text style={styles.subtitulo}>Endereço</Text>
            <Text style={styles.texto}>
              {servico.endereco}
            </Text>

            {!!servico.telefone && (
              <>
                <Text style={styles.subtitulo}>Telefone</Text>
                <Text style={styles.texto}>
                  {servico.telefone}
                </Text>
              </>
            )}

            {servico.latitude != null &&
              servico.longitude != null && (
                <>
                  <Text style={styles.subtitulo}>
                    Coordenadas geográficas
                  </Text>

                  <Text style={styles.texto}>
                    Latitude: {servico.latitude}
                    {'\n'}
                    Longitude: {servico.longitude}
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

  categoria: {
    color: '#168BC3',
    fontSize: 11,
    marginBottom: 8,
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

  mapa: {
    backgroundColor: '#DDEFE0',
    borderColor: '#C8DDED',
    borderWidth: 1,
    borderRadius: 14,
    minHeight: 180,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },

  nomeMapa: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#123047',
    marginBottom: 8,
  },

  texto: {
    color: '#587184',
    lineHeight: 21,
    marginBottom: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C8DDED',
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
    marginBottom: 13,
  },

  nome: {
    color: '#168BC3',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  tipo: {
    color: '#587184',
    fontSize: 13,
    marginBottom: 12,
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
