
import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const links = [
  { nome: 'Início', tela: 'Home', icone: 'home' },
  { nome: 'Sentimentos', tela: 'Sentimentos', icone: 'heart' },
  { nome: 'Transtornos', tela: 'Transtornos', icone: 'activity' },
  { nome: 'Localização', tela: 'Localidades', icone: 'map-pin' },
];

export default function MHIHeader({ navigation, ativa }) {
  const [usuario, setUsuario] = useState(null);
  const [recolhida, setRecolhida] = useState(false);

  const larguraSidebar = useRef(new Animated.Value(250)).current;

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

  function alternarSidebar() {
    const novoEstado = !recolhida;

    setRecolhida(novoEstado);

    Animated.timing(larguraSidebar, {
      toValue: novoEstado ? 78 : 250,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }

  const linksVisiveis = [...links];

  if (!usuario) {
    linksVisiveis.push({
      nome: 'Entrar',
      tela: 'Login',
      icone: 'log-in',
    });
  }

  if (usuario?.nivel_usuario === 'admin') {
    linksVisiveis.push({
      nome: 'Painel administrativo',
      tela: 'Admin',
      icone: 'settings',
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
        styles.sidebar,
        { width: larguraSidebar },
      ]}
    >
      {/* IDENTIDADE DO MHI */}
      <View
        style={[
          styles.areaMarca,
          recolhida && styles.areaMarcaRecolhida,
        ]}
      >
        <Pressable
          style={[
            styles.marca,
            recolhida && styles.marcaRecolhida,
          ]}
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            source={require('../assets/MHI logo.png')}
            style={[
              styles.logo,
              recolhida && styles.logoRecolhida,
            ]}
            resizeMode="contain"
          />

          {!recolhida && (
            <View style={styles.identidade}>
              <Text style={styles.nome}>MHI</Text>
              <Text style={styles.subnome}>
                Mental Health Informative
              </Text>
            </View>
          )}
        </Pressable>

        <Pressable
          onPress={alternarSidebar}
          style={[
            styles.botaoRecolher,
            recolhida && styles.botaoRecolherCompacto,
          ]}
        >
          <Feather
            name={recolhida ? 'chevron-right' : 'chevron-left'}
            size={19}
            color="#168FD0"
          />
        </Pressable>
      </View>

      <View style={styles.divisor} />

      {/* NAVEGAÇÃO */}
      {!recolhida && (
        <Text style={styles.tituloMenu}>
          MENU PRINCIPAL
        </Text>
      )}

      <ScrollView
        style={styles.menuContainer}
        showsVerticalScrollIndicator={false}
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
                recolhida && styles.linkRecolhido,
                selecionada && styles.linkAtivo,
                pressed && styles.linkPressionado,
              ]}
            >
              <View style={styles.iconeContainer}>
                <Feather
                  name={item.icone}
                  size={19}
                  color={selecionada ? '#087DBB' : '#168FD0'}
                />
              </View>

              {!recolhida && (
                <Text
                  style={[
                    styles.linkTexto,
                    selecionada && styles.linkTextoAtivo,
                  ]}
                >
                  {item.nome}
                </Text>
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      {/* PERFIL E LOGOUT */}
      {usuario && (
        <View
          style={[
            styles.areaUsuario,
            recolhida && styles.areaUsuarioRecolhida,
          ]}
        >
          <View
            style={[
              styles.perfil,
              recolhida && styles.perfilRecolhido,
            ]}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarTexto}>
                {usuario.nome?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>

            {!recolhida && (
              <View style={styles.dadosUsuario}>
                <Text style={styles.rotuloPerfil}>
                  CONECTADO COMO
                </Text>

                <Text style={styles.nomeUsuario}>
                  {usuario.nome}
                </Text>
              </View>
            )}
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.botaoSair,
              recolhida && styles.botaoSairRecolhido,
              pressed && styles.botaoSairPressionado,
            ]}
            onPress={sair}
          >
            <Feather
              name="log-out"
              size={17}
              color="#168FD0"
            />

            {!recolhida && (
              <Text style={styles.textoSair}>
                Sair da conta
              </Text>
            )}
          </Pressable>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 17,
    paddingTop: 28,
    paddingBottom: 18,
    zIndex: 10,
    elevation: 5,
    shadowColor: '#173B53',
    shadowOffset: { width: 3, height: 0 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    overflow: 'hidden',
  },

  // IDENTIDADE
  areaMarca: {
    position: 'relative',
    minHeight: 70,
    justifyContent: 'center',
  },

  areaMarcaRecolhida: {
    minHeight: 85,
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },

  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 8,
    marginBottom: 22,
  },

  marcaRecolhida: {
    justifyContent: 'center',
    paddingHorizontal: 0,
    marginBottom: 0,
  },

  logo: {
    width: 53,
    height: 53,
    marginRight: 11,
  },

  logoRecolhida: {
    width: 40,
    height: 40,
    marginRight: 0,
  },

  identidade: {
    flex: 1,
  },

  nome: {
    color: '#168FD0',
    fontWeight: 'bold',
    fontSize: 23,
    letterSpacing: 1,
  },

  subnome: {
    color: '#168FD0',
    fontSize: 9,
    marginTop: 3,
  },

  botaoRecolher: {
    position: 'absolute',
    right: 0,
    top: 10,
    width: 27,
    height: 27,
    borderRadius: 8,
    backgroundColor: '#EAF7FF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  botaoRecolherCompacto: {
    top: 0,
    right: 8,
  },

  divisor: {
    height: 1,
    backgroundColor: '#E3EDF3',
    marginBottom: 25,
  },

  // MENU
  tituloMenu: {
    color: '#168FD0',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 13,
    marginLeft: 10,
  },

  menuContainer: {
    flex: 1,
  },

  menu: {
    gap: 8,
    paddingBottom: 15,
  },

  link: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 13,
    borderRadius: 11,
    gap: 12,
  },

  linkRecolhido: {
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: 13,
  },

  linkAtivo: {
    backgroundColor: '#EAF7FF',
  },

  linkPressionado: {
    backgroundColor: '#D9F0FF',
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },

  iconeContainer: {
    width: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },

  linkTexto: {
    color: '#168FD0',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },

  linkTextoAtivo: {
    color: '#087DBB',
    fontWeight: 'bold',
  },

  // PERFIL
  areaUsuario: {
    borderTopWidth: 1,
    borderTopColor: '#E3EDF3',
    paddingTop: 17,
    marginTop: 12,
  },

  areaUsuarioRecolhida: {
    alignItems: 'center',
  },

  perfil: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 15,
    gap: 10,
  },

  perfilRecolhido: {
    justifyContent: 'center',
    paddingHorizontal: 0,
  },

  avatar: {
    width: 37,
    height: 37,
    borderRadius: 19,
    backgroundColor: '#EAF7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarTexto: {
    color: '#168FD0',
    fontSize: 16,
    fontWeight: 'bold',
  },

  dadosUsuario: {
    flex: 1,
  },

  rotuloPerfil: {
    color: '#168FD0',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.8,
    marginBottom: 4,
  },

  nomeUsuario: {
    color: '#087DBB',
    fontSize: 13,
    fontWeight: 'bold',
    flexShrink: 1,
  },

  // BOTÃO SAIR
  botaoSair: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF7FF',
    borderWidth: 1,
    borderColor: '#D5ECFA',
    paddingVertical: 11,
    borderRadius: 10,
    gap: 9,
  },

  botaoSairRecolhido: {
    width: 43,
    height: 43,
    paddingVertical: 0,
  },

  botaoSairPressionado: {
    backgroundColor: '#D9F0FF',
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },

  textoSair: {
    color: '#168FD0',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
