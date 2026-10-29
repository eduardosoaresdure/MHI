
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MHIHeader from '../components/header-temp';

const sentimentos = [
  ['💭', 'Tristeza', 'Pode surgir diante de perdas e frustrações. Respeite seu tempo e procure apoio quando precisar.'],
  ['🌀', 'Ansiedade', 'Pode aparecer diante de preocupações ou situações incertas.'],
  ['🔥', 'Raiva', 'Pode sinalizar que algo incomodou você ou ultrapassou um limite importante.'],
  ['🛡️', 'Medo', 'É uma resposta natural diante de situações percebidas como ameaçadoras.'],
  ['🌙', 'Solidão', 'Pode indicar a necessidade de conexão, companhia e apoio.'],
  ['⚖️', 'Culpa', 'Pode aparecer quando acreditamos ter agido contra nossos valores.'],
  ['🔋', 'Esgotamento', 'Pode estar relacionado ao acúmulo de demandas e à falta de descanso.'],
  ['🌱', 'Esperança', 'Pode ajudar a manter a motivação diante das dificuldades.'],
];

export default function SentimentosScreen({ navigation }) {
  return (
    <View style={styles.fundo}>
      <MHIHeader navigation={navigation} ativa="Sentimentos" />

      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>Seus sentimentos</Text>
        <Text style={styles.descricao}>
          Todo sentimento tem uma função. Reconhecer o que você sente
          pode ajudar a compreender suas necessidades.
        </Text>

        {sentimentos.map(([emoji, nome, descricao]) => (
          <View key={nome} style={styles.card}>
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.texto}>{descricao}</Text>
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
  fundo: { flex: 1, backgroundColor: '#F4FAFE' },
  conteudo: { padding: 16, paddingBottom: 30 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#102D42', marginBottom: 8 },
  descricao: { color: '#587184', lineHeight: 21, marginBottom: 18 },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C8DDED',
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
    marginBottom: 13,
  },
  emoji: { fontSize: 25, marginBottom: 8 },
  nome: { color: '#123047', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  texto: { color: '#587184', lineHeight: 21, marginBottom: 10 },
  subtitulo: { color: '#168BC3', fontSize: 13, fontWeight: 'bold', marginBottom: 5 },
});
