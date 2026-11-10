
import React, { useEffect, useState, useRef } from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const links = [
  { nome: 'Início', tela: 'Home', icone: '⌂' },
  { nome: 'Sentimentos', tela: 'Sentimentos', icone: '♡' },
  { nome: 'Transtornos', tela: 'Transtornos', icone: '✚' },
  { nome: 'Localização', tela: 'Localidades', icone: '⌖' },
];

export default function MHIHeader({ navigation, ativa }) {
  const [usuario, setUsuario] = useState(null);

  const animacao = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animacao, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    async function verificarSessao() {
      try {
        const token = await AsyncStorage.getItem('token');
        const usuarioSalvo = await AsyncStorage.getItem('usuario');

        if (token && usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo));
        } else {
          setUsuario(null);
        }
      } catch (erro) {
        setUsuario(null);
      }
    }

    verificarSessao();

    const unsubscribe = navigation.addListener(
      'focus',
      verificarSessao
    );

    return unsubscribe;
  }, [navigation]);

  const linksVisiveis = [...links];

  if (!usuario) {
    linksVisiveis.push({
      nome: 'Entrar',
      tela: 'Login',
      icone: '♙',
    });
  }

  if (usuario?.nivel_usuario === 'admin') {
    linksVisiveis.push({
      nome: 'Painel administrativo',
      tela: 'Admin',
      icone: '⚙',
    });
  }

  async function sair() {
    await AsyncStorage.multiRemove(['token', 'usuario']);
    setUsuario(null);
    navigation.navigate('Home');
  }

  return (
    <Animated.View
      style={[
        styles.header,
        {
          opacity: animacao,
          transform: [
            {
              translateY: animacao.interpolate({
                inputRange: [0, 1],
                outputRange: [-18, 0],
              }),
            },
          ],
        },
      ]}
    >
      {/* IDENTIDADE DO MHI */}
      <Pressable
        style={styles.marca}
        onPress={() => navigation.navigate('Home')}
      >
        <View style={styles.logo}>
          <Image
  source={require('../assets/MHI logo.png')}
  style={styles.logo}
  resizeMode="contain"
/>
        </View>

        <View>
          <Text style={styles.nome}>MHI</Text>
          <Text style={styles.subnome}>
            Mental Health Informative
          </Text>
        </View>
      </Pressable>

      {/* MENU E USUÁRIO */}
      <View style={styles.menuContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.menu}
        >
          {linksVisiveis.map((item) => {
            const selecionada = ativa === item.tela;

            return (
              <Pressable
                key={item.tela}
                onPress={() => navigation.navigate(item.tela)}
                style={({ pressed }) => [
                  styles.link,
                  selecionada && styles.linkAtivo,
                  pressed && styles.linkPressionado,
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

        {usuario && (
          <View style={styles.areaUsuario}>
            <Text style={styles.nomeUsuario} numberOfLines={1}>
              {usuario.nome}
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.botaoSair,
                pressed && styles.botaoSairPressionado,
              ]}
              onPress={sair}
            >
              <Text style={styles.textoSair}>Sair</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E3EDF4',
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'center',
    zIndex: 1,

    shadowColor: '#173B53',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  // MARCA
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#168BC3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

 logo: {
  width: 65,
  height: 65,
  resizeMode: 'contain',
  marginRight: 12,
},

  nome: {
    color: '#123047',
    fontWeight: 'bold',
    fontSize: 21,
    letterSpacing: 1,
  },

  subnome: {
    color: '#758B9B',
    fontSize: 11,
    marginTop: 2,
  },

  // MENU
  menuContainer: {
    width: '100%',
    maxWidth: 1100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },

  menu: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 4,
    flexGrow: 1,
  },

  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F3F8FC',
    borderWidth: 1,
    borderColor: '#EDF2F6',
  },

  linkAtivo: {
    backgroundColor: '#168BC3',
    borderColor: '#168BC3',
  },

  linkPressionado: {
    backgroundColor: '#DCEFFA',
    transform: [{ scale: 0.96 }],
  },

  icone: {
    color: '#587184',
    fontSize: 17,
  },

  linkTexto: {
    color: '#345469',
    fontSize: 13,
    fontWeight: '600',
  },

  textoAtivo: {
    color: '#FFFFFF',
  },

  // USUÁRIO
  areaUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingLeft: 12,
  },

  nomeUsuario: {
    color: '#24465B',
    fontSize: 13,
    fontWeight: 'bold',
    maxWidth: 130,
  },

  botaoSair: {
    backgroundColor: '#FCEEEE',
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  botaoSairPressionado: {
    backgroundColor: '#F5DADA',
    transform: [{ scale: 0.95 }],
  },

  textoSair: {
    color: '#C44747',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
