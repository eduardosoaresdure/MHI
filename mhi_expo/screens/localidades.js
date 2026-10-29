
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MHIHeader from '../components/header-temp';

const servicos = [
  {
    nome: 'CAPS',
    descricao: 'Centro de Atenção Psicossocial.',
    detalhe: 'Consulte a rede municipal de saúde para confirmar endereço, horários e formas de atendimento.',
  },
  {
    nome: 'Unidades Básicas de Saúde (UBS)',
    descricao: 'Porta de entrada para diversos serviços do SUS.',
    detalhe: 'Uma UBS pode orientar sobre os serviços de saúde mental disponíveis na região.',
  },
];

export default function LocalizacaoScreen({ navigation }) {
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
          <Text style={styles.emoji}>📍</Text>
          <Text style={styles.nomeMapa}>Mapa dos serviços</Text>
          <Text style={styles.texto}>
            A visualização interativa do mapa será adicionada
            em uma próxima etapa do projeto.
          </Text>
        </View>

        {servicos.map((servico) => (
          <View key={servico.nome} style={styles.card}>
            <Text style={styles.nome}>{servico.nome}</Text>
            <Text style={styles.texto}>{servico.descricao}</Text>
            <Text style={styles.texto}>{servico.detalhe}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: '#F4FAFE' },
  conteudo: { padding: 16, paddingBottom: 30 },
  categoria: { color: '#168BC3', fontSize: 11, marginBottom: 8 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#102D42', marginBottom: 8 },
  descricao: { color: '#587184', lineHeight: 21, marginBottom: 18 },
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
  emoji: { fontSize: 32, marginBottom: 8 },
  nomeMapa: { fontSize: 18, fontWeight: 'bold', color: '#123047', marginBottom: 8 },
  texto: { color: '#587184', lineHeight: 21, marginBottom: 8 },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C8DDED',
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
    marginBottom: 13,
  },
  nome: { color: '#168BC3', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
});
