
import React, { useEffect, useRef } from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';

import MHIHeader from '../components/header-temp';

export default function HomeScreen({ navigation }) {
  const secoes = [
    {
      icone: '✚',
      numero: '01',
      titulo: 'Transtornos explicados',
      texto: 'Informações introdutórias para conhecer diferentes condições de saúde mental.',
      tela: 'Transtornos',
      cor: '#EAF3FF',
      corIcone: '#4385C5',
    },
    {
      icone: '♡',
      numero: '02',
      titulo: 'Entenda seus sentimentos',
      texto: 'Reconheça suas emoções e compreenda melhor suas necessidades.',
      tela: 'Sentimentos',
      cor: '#F3EDFF',
      corIcone: '#9070C8',
    },
    {
      icone: '⌖',
      numero: '03',
      titulo: 'Ajuda na sua região',
      texto: 'Encontre informações sobre serviços de atendimento próximos.',
      tela: 'Localidades',
      cor: '#E8F7F1',
      corIcone: '#419B79',
    },
  ];

  // Valores iniciais das animações
  const animacaoHero = useRef(new Animated.Value(0)).current;

  const animacoesCards = useRef(
    secoes.map(() => new Animated.Value(0))
  ).current;

  const animacaoAjuda = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animacaoHero, {
        toValue: 1,
        duration: 650,
        useNativeDriver: false,
      }),

      Animated.stagger(
        150,
        animacoesCards.map((animacao) =>
          Animated.timing(animacao, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          })
        )
      ),

      Animated.sequence([
        Animated.delay(450),
        Animated.timing(animacaoAjuda, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  }, []);

  const estiloAnimado = (animacao) => ({
    opacity: animacao,
    transform: [
      {
        translateY: animacao.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
      },
    ],
  });

  return (
    <View style={styles.fundo}>
      <View style={styles.layout}>
        <MHIHeader navigation={navigation} ativa="Home" />

        <ScrollView
          style={styles.areaConteudo}
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
        >
          {/* DESTAQUE PRINCIPAL */}
          <Animated.View
            style={[styles.hero, estiloAnimado(animacaoHero)]}
          >
            <View style={styles.seloContainer}>
              <Text style={styles.selo}>ODS 3</Text>

              <Text style={styles.seloDescricao}>
                SAÚDE E BEM-ESTAR
              </Text>
            </View>

            <Text style={styles.titulo}>
              Cuidar da mente também é cuidar da saúde.
            </Text>

            <Text style={styles.descricao}>
              Informação, acolhimento e conhecimento para compreender
              melhor a saúde mental e descobrir onde encontrar apoio.
            </Text>

            <View style={styles.decoracao}>
              <Text style={styles.decoracaoTexto}>MHI</Text>
            </View>
          </Animated.View>

          {/* SEÇÕES */}
          <View style={styles.cabecalhoSecao}>
            <View>
              <Text style={styles.subtituloSecao}>
                CONHEÇA A PLATAFORMA
              </Text>

              <Text style={styles.tituloSecao}>
                Explore o MHI
              </Text>
            </View>
          </View>

          {secoes.map((item, index) => (
            <Animated.View
              key={item.tela}
              style={[
                estiloAnimado(animacoesCards[index]),
              ]}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.card,
                  pressed && styles.cardPressionado,
                ]}
                onPress={() => navigation.navigate(item.tela)}
              >
                <View
                  style={[
                    styles.iconeContainer,
                    { backgroundColor: item.cor },
                  ]}
                >
                  <Text
                    style={[
                      styles.icone,
                      { color: item.corIcone },
                    ]}
                  >
                    {item.icone}
                  </Text>
                </View>

                <View style={styles.cardConteudo}>
                  <Text style={styles.numero}>
                    {item.numero}
                  </Text>

                  <Text style={styles.tituloCard}>
                    {item.titulo}
                  </Text>

                  <Text style={styles.textoCard}>
                    {item.texto}
                  </Text>

                  <Text style={styles.link}>
                    Conhecer seção →
                  </Text>
                </View>
              </Pressable>
            </Animated.View>
          ))}

          {/* APOIO */}
          <Animated.View
            style={[
              styles.ajuda,
              estiloAnimado(animacaoAjuda),
            ]}
          >
            <View style={styles.ajudaCabecalho}>
              <View style={styles.ajudaIcone}>
                <Text style={styles.ajudaIconeTexto}>♡</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.ajudaSubtitulo}>
                  VOCÊ NÃO ESTÁ SOZINHO
                </Text>

                <Text style={styles.tituloAjuda}>
                  Onde buscar apoio?
                </Text>
              </View>
            </View>

            <Text style={styles.textoAjuda}>
              Existem serviços gratuitos que podem oferecer
              orientação e atendimento.
            </Text>

            <View style={styles.linhaAjuda} />

            <View style={styles.contato}>
              <View>
                <Text style={styles.nomeContato}>CVV</Text>

                <Text style={styles.descricaoContato}>
                  Apoio emocional gratuito
                </Text>
              </View>

              <Text style={styles.numeroContato}>188</Text>
            </View>

            <View style={styles.linhaAjuda} />

            <View style={styles.contato}>
              <View>
                <Text style={styles.nomeContato}>SAMU</Text>

                <Text style={styles.descricaoContato}>
                  Emergências médicas
                </Text>
              </View>

              <Text style={styles.numeroContato}>192</Text>
            </View>
          </Animated.View>

          <Text style={styles.rodape}>
            MHI · Informação e conscientização sobre saúde mental.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },

  layout: {
    flex: 1,
    flexDirection: 'row',
  },

  areaConteudo: {
    flex: 1,
    height: '100%',
  },

  conteudo: {
    padding: 28,
    paddingBottom: 45,
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
  },

  hero: {
    backgroundColor: '#E8F5FF',
    borderWidth: 1,
    borderColor: '#D5EAF9',
    borderRadius: 26,
    padding: 32,
    marginBottom: 38,
    overflow: 'hidden',
  },

  seloContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 23,
  },

  selo: {
    backgroundColor: '#168FD0',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 8,
    overflow: 'hidden',
  },

  seloDescricao: {
    color: '#4383A8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginLeft: 10,
  },

  titulo: {
    color: '#183247',
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    maxWidth: 650,
    marginBottom: 16,
  },

  descricao: {
    color: '#607789',
    fontSize: 15,
    lineHeight: 25,
    maxWidth: 620,
    marginBottom: 5,
  },

  decoracao: {
    position: 'absolute',
    right: -25,
    bottom: -45,
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: '#D7EDFC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  decoracaoTexto: {
    color: '#C1E1F5',
    fontSize: 55,
    fontWeight: '900',
  },

  cabecalhoSecao: {
    marginBottom: 20,
  },

  subtituloSecao: {
    color: '#168FD0',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.3,
    marginBottom: 7,
  },

  tituloSecao: {
    color: '#183247',
    fontSize: 25,
    fontWeight: '800',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EDF3',
    borderRadius: 19,
    padding: 21,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#23445B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.045,
    shadowRadius: 9,
    elevation: 2,
  },

  cardPressionado: {
    backgroundColor: '#F8FBFD',
    opacity: 0.85,
  },

  iconeContainer: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },

  icone: {
    fontSize: 27,
    fontWeight: '700',
  },

  cardConteudo: {
    flex: 1,
  },

  numero: {
    color: '#8AA0AF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 5,
  },

  tituloCard: {
    color: '#20394C',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 7,
  },

  textoCard: {
    color: '#667D8D',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 9,
  },

  link: {
    color: '#168FD0',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 3,
  },

  ajuda: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DCEAF2',
    borderWidth: 1,
    borderRadius: 22,
    padding: 24,
    marginTop: 23,
  },

  ajudaCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  ajudaIcone: {
    backgroundColor: '#EAF7FF',
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  ajudaIconeTexto: {
    color: '#168FD0',
    fontSize: 26,
  },

  ajudaSubtitulo: {
    color: '#168FD0',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },

  tituloAjuda: {
    color: '#20394C',
    fontSize: 19,
    fontWeight: '800',
  },

  textoAjuda: {
    color: '#667D8D',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 15,
  },

  linhaAjuda: {
    height: 1,
    backgroundColor: '#E8EEF3',
    marginVertical: 12,
  },

  contato: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  nomeContato: {
    color: '#20394C',
    fontSize: 15,
    fontWeight: '800',
  },

  descricaoContato: {
    color: '#718694',
    fontSize: 12,
    marginTop: 3,
  },

  numeroContato: {
    color: '#168FD0',
    fontSize: 22,
    fontWeight: '900',
  },

  rodape: {
    color: '#91A2AD',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 30,
  },
});
