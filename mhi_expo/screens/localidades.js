
import React, { useEffect, useState } from 'react';

import MapaServicos from '../components/MapaServicos';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
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

  const obterCor = (tipo) => {
    const categoria = (tipo || '').toUpperCase();

    if (categoria.includes('AD')) return '#8B5CF6';
    if (categoria.includes('IA')) return '#0D9488';

    return '#168BC3';
  };

  const abrirGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.fundo}>
      <View style={styles.layout}>
        <MHIHeader navigation={navigation} ativa="Localidades" />

        <ScrollView contentContainerStyle={styles.conteudo}>
          <Text style={styles.categoria}>
            SANTA CRUZ DO SUL — RS
          </Text>

          <Text style={styles.titulo}>Onde buscar ajuda</Text>

          <Text style={styles.descricao}>
            Conheça serviços de saúde mental e procure informações
            para encontrar atendimento na sua região.
          </Text>

          <View style={styles.mapaContainer}>
            <Text style={styles.nomeMapa}>
              Mapa dos serviços
            </Text>

            <Text style={styles.texto}>
              Explore os locais de atendimento em Santa Cruz do Sul.
            </Text>

            <MapaServicos servicos={servicos} />
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

          {!carregando && !erro && servicos.map((servico) => {
            const coordenadasValidas =
              servico.latitude != null &&
              servico.longitude != null &&
              Number.isFinite(Number(servico.latitude)) &&
              Number.isFinite(Number(servico.longitude));

            const cor = obterCor(servico.tipo_servico);

            return (
              <View key={servico.id} style={styles.card}>
                <Text style={styles.nome}>
                  {servico.nome}
                </Text>

                <View
                  style={[
                    styles.etiqueta,
                    { backgroundColor: `${cor}18` },
                  ]}
                >
                  <Text style={[styles.tipo, { color: cor }]}>
                    {servico.tipo_servico}
                  </Text>
                </View>

                <View style={styles.informacao}>
                  <Text style={styles.subtitulo}>
                    Endereço
                  </Text>

                  <Text style={styles.texto}>
                    {servico.endereco || 'Não informado'}
                  </Text>
                </View>

                {!!servico.telefone && (
                  <View style={styles.informacao}>
                    <Text style={styles.subtitulo}>
                      Telefone
                    </Text>

                    <Text style={styles.texto}>
                      {servico.telefone}
                    </Text>
                  </View>
                )}

                {coordenadasValidas && (
                  <TouchableOpacity
                    style={styles.botaoMapa}
                    onPress={() =>
                      abrirGoogleMaps(
                        Number(servico.latitude),
                        Number(servico.longitude)
                      )
                    }
                  >
                    <Text style={styles.textoBotao}>
                      Abrir no Google Maps
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
          
<View style={styles.secaoInformativa}>
  <Text style={styles.tituloSecao}>
    Conheça os tipos de CAPS
  </Text>

  <Text style={styles.descricaoSecao}>
    Cada unidade possui uma modalidade de atendimento,
    organizada de acordo com as necessidades da população.
  </Text>

  <View style={styles.cardInformativo}>
    <Text style={styles.tituloInformativo}>
      CAPS II
    </Text>
    <Text style={styles.descricaoInformativa}>
      Oferece acompanhamento especializado a pessoas
      com sofrimento psíquico intenso e persistente.
    </Text>
  </View>

  <View style={styles.cardInformativo}>
    <Text style={styles.tituloInformativo}>
      CAPS IA (Infantojuvenil)
    </Text>
    <Text style={styles.descricaoInformativa}>
      Voltado ao atendimento de crianças e adolescentes
      que precisam de acompanhamento em saúde mental.
    </Text>
  </View>

  <View style={styles.cardInformativo}>
    <Text style={styles.tituloInformativo}>
      CAPS AD III
    </Text>
    <Text style={styles.descricaoInformativa}>
      Oferece acompanhamento relacionado a necessidades
      decorrentes do uso de álcool e outras drogas, com
      funcionamento 24 horas.
    </Text>
  </View>

  <Text style={styles.observacao}>
    As necessidades de cada pessoa são avaliadas pela
    equipe de saúde, que orienta o acompanhamento adequado.
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

  mapaContainer: {
    marginBottom: 20,
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
    marginBottom: 14,
  },

  nome: {
    color: '#102D42',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 9,
  },

  etiqueta: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 15,
  },

  tipo: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  informacao: {
    marginBottom: 10,
  },

  subtitulo: {
    color: '#168BC3',
    fontWeight: 'bold',
    marginBottom: 4,
  },

  botaoMapa: {
    backgroundColor: '#168BC3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
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

secaoInformativa: {
  marginTop: 12,
  marginBottom: 20,
},

tituloSecao: {
  fontSize: 21,
  fontWeight: 'bold',
  color: '#102D42',
  marginBottom: 8,
},

descricaoSecao: {
  color: '#587184',
  lineHeight: 21,
  marginBottom: 15,
},

cardInformativo: {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#C8DDED',
  borderRadius: 12,
  padding: 16,
  marginBottom: 12,
},

tituloInformativo: {
  color: '#168BC3',
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 7,
},

descricaoInformativa: {
  color: '#587184',
  fontSize: 14,
  lineHeight: 21,
},

observacao: {
  color: '#587184',
  fontSize: 12,
  lineHeight: 18,
  fontStyle: 'italic',
  marginTop: 4,
},

});
