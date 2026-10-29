
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
  hero: {
    backgroundColor: '#D5ECF6',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  selo: {
    color: '#168BC3',
    fontSize: 11,
    marginBottom: 12,
  },
  titulo: {
    color: '#102D42',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  descricao: {
    color: '#587184',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 18,
  },
  botao: {
    backgroundColor: '#168BC3',
    borderRadius: 24,
    padding: 14,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tituloSecao: {
    color: '#102D42',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C8DDED',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  icone: {
    color: '#168BC3',
    fontSize: 25,
    marginBottom: 8,
  },
  tituloCard: {
    color: '#123047',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  textoCard: {
    color: '#587184',
    lineHeight: 21,
    marginBottom: 8,
  },
  link: {
    color: '#168BC3',
    fontWeight: 'bold',
    marginTop: 4,
  },
  ajuda: {
    backgroundColor: '#E8F4FE',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
});
