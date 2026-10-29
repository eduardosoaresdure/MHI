
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';

const links = [
  { nome: 'Home', tela: 'Home', icone: '⌂' },
  { nome: 'Sentimentos', tela: 'Sentimentos', icone: '♡' },
  { nome: 'Transtornos', tela: 'Transtornos', icone: '✚' },
  { nome: 'Localização', tela: 'Localidades', icone: '⌖' },
];

export default function MHIHeader({ navigation, ativa }) {
  return (
    <View style={styles.header}>
      <Pressable
        style={styles.marca}
        onPress={() => navigation.navigate('Home')}
      >
        <View style={styles.logo}>
          <Text style={styles.logoTexto}>M</Text>
        </View>
        <View>
          <Text style={styles.nome}>MHI</Text>
          <Text style={styles.subnome}>Mental Health Informative</Text>
        </View>
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.menu}
      >
        {links.map((item) => {
          const selecionada = ativa === item.tela;

          return (
            <Pressable
              key={item.tela}
              onPress={() => navigation.navigate(item.tela)}
              style={[
                styles.link,
                selecionada && styles.linkAtivo,
              ]}
            >
              <Text
                style={[
                  styles.icone,
                  selecionada && styles.textoAtivo,
                ]}
              >
                {item.icone}
              </Text>
              <Text
                style={[
                  styles.linkTexto,
                  selecionada && styles.textoAtivo,
                ]}
              >
                {item.nome}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DCEAF3',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    zIndex: 1,
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#168BC3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 22,
  },
  nome: {
    color: '#123047',
    fontWeight: 'bold',
    fontSize: 17,
  },
  subnome: {
    color: '#587184',
    fontSize: 10,
  },
  menu: {
    alignItems: 'center',
    gap: 8,
    paddingBottom: 3,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F4FAFE',
  },
  linkAtivo: {
    backgroundColor: '#168BC3',
  },
  icone: {
    color: '#587184',
    fontSize: 16,
  },
  linkTexto: {
    color: '#123047',
    fontSize: 12,
    fontWeight: '600',
  },
  textoAtivo: {
    color: '#FFFFFF',
  },
});
