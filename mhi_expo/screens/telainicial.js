
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import MHIHeader from '../components/header-temp';

export default function HomeScreen({ navigation }) {
  const secoes = [
    {
      icone: '✚',
      titulo: 'Transtornos explicados',
      texto: 'Informações introdutórias sobre saúde mental.',
      tela: 'Transtornos',
    },
    {
      icone: '♡',
      titulo: 'Entenda seus sentimentos',
      texto: 'Reconheça emoções e compreenda suas necessidades.',
      tela: 'Sentimentos',
    },
    {
      icone: '⌖',
      titulo: 'Ajuda na sua região',
      texto: 'Consulte informações sobre serviços de atendimento.',
      tela: 'Localidades',
    },
  ];

  return (
    <View style={styles.fundo}>
    <View style={styles.layout}>
      <MHIHeader navigation={navigation} ativa="Home" />

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.hero}>
          <Text style={styles.selo}>ODS 3 · SAÚDE E BEM-ESTAR</Text>

          <Text style={styles.titulo}>
            Cuidar da mente também é cuidar da saúde
          </Text>

          <Text style={styles.descricao}>
            Informação clara sobre saúde mental para entender melhor o que
            você sente e encontrar apoio.
          </Text>

          <Pressable
            style={styles.botao}
            onPress={() => navigation.navigate('Transtornos')}
          >
            <Text style={styles.textoBotao}>
              Conhecer os transtornos →
            </Text>
          </Pressable>
        </View>

        <Text style={styles.tituloSecao}>Explore o MHI</Text>

        {secoes.map((item) => (
          <Pressable
            key={item.tela}
            style={styles.card}
            onPress={() => navigation.navigate(item.tela)}
          >
            <Text style={styles.icone}>{item.icone}</Text>
            <Text style={styles.tituloCard}>{item.titulo}</Text>
            <Text style={styles.textoCard}>{item.texto}</Text>
            <Text style={styles.link}>Explorar →</Text>
          </Pressable>
        ))}

        <View style={styles.ajuda}>
          <Text style={styles.tituloCard}>Precisa conversar?</Text>
          <Text style={styles.textoCard}>
            CVV — 188: apoio emocional gratuito.
          </Text>
          <Text style={styles.textoCard}>
            SAMU — 192: emergências médicas.
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

areaConteudo: {
  flex: 1,
  height: '100%',
},

  
  fundo: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },
  conteudo: {
    padding: 20,
    paddingBottom: 36,
  },
  hero: {
    backgroundColor: '#EAF7FF',
    borderColor: '#D4EEFF',
    borderWidth: 1,
    borderRadius: 24,
    padding: 26,
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  selo: {
    color: '#168FD0',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginBottom: 16,
  },
  titulo: {
    color: '#183247',
    fontSize: 29,
    lineHeight: 36,
    fontWeight: '800',
    textAlign: 'left',
    marginBottom: 14,
  },
  descricao: {
    color: '#607789',
    fontSize: 15,
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 22,
  },
  botao: {
    backgroundColor: '#38B6FF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 19,
    shadowColor: '#168FD0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  tituloSecao: {
    color: '#183247',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E3EDF4',
    borderWidth: 1,
    borderRadius: 20,
    padding: 22,
    marginBottom: 14,
    shadowColor: '#23445B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.055,
    shadowRadius: 10,
    elevation: 2,
  },
  icone: {
    color: '#168FD0',
    fontSize: 27,
    marginBottom: 12,
  },
  tituloCard: {
    color: '#20394C',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
  textoCard: {
    color: '#667D8D',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 9,
  },
  link: {
    color: '#168FD0',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 5,
  },
  ajuda: {
    backgroundColor: '#EAF7FF',
    borderColor: '#D4EEFF',
    borderWidth: 1,
    borderRadius: 20,
    padding: 22,
    marginTop: 10,
  },
});
