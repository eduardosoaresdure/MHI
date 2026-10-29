
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MHIHeader from '../components/header-temp';

const transtornos = [
  ['Depressão', 'Pode envolver tristeza persistente, perda de interesse e alterações no sono, na energia ou na concentração.'],
  ['Transtorno de Ansiedade Generalizada', 'Envolve preocupação excessiva e persistente, que pode ser difícil de controlar.'],
  ['Transtorno do Pânico', 'Pode envolver episódios de medo intenso acompanhados de sintomas físicos.'],
  ['Transtorno Bipolar', 'Envolve episódios de alterações importantes do humor e da energia.'],
  ['Transtorno Obsessivo-Compulsivo (TOC)', 'Pode envolver pensamentos intrusivos e comportamentos repetitivos.'],
  ['Transtorno de Estresse Pós-Traumático', 'Pode surgir após experiências traumáticas e afetar o bem-estar cotidiano.'],
  ['TDAH', 'Pode envolver dificuldades persistentes de atenção, organização ou controle dos impulsos.'],
  ['Transtornos Alimentares', 'Afetam a relação com a alimentação e podem comprometer a saúde física e emocional.'],
  ['Esquizofrenia', 'Pode afetar a percepção, o pensamento e a interpretação da realidade.'],
  ['Transtorno de Personalidade Borderline', 'Pode envolver dificuldades na regulação emocional e nos relacionamentos.'],
];

export default function TranstornosScreen({ navigation }) {
  return (
    <View style={styles.fundo}>
      <MHIHeader navigation={navigation} ativa="Transtornos" />

      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>Transtornos mentais</Text>
        <Text style={styles.descricao}>
          Conheça informações introdutórias sobre saúde mental.
          O conteúdo é educativo e não substitui avaliação profissional.
        </Text>

        {transtornos.map(([nome, descricao]) => (
          <View key={nome} style={styles.card}>
            <Text style={styles.categoria}>SAÚDE MENTAL</Text>
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.texto}>{descricao}</Text>
            <Text style={styles.subtitulo}>Cuidados e tratamento</Text>
            <Text style={styles.texto}>
              As opções de cuidado dependem de cada pessoa e devem ser
              discutidas com profissionais de saúde qualificados.
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
  categoria: { color: '#168BC3', fontSize: 11, marginBottom: 7 },
  nome: { color: '#123047', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  texto: { color: '#587184', lineHeight: 21, marginBottom: 10 },
  subtitulo: { color: '#168BC3', fontWeight: 'bold', marginBottom: 5 },
});
