
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import API_URL from '../config/api';

const categorias = {
  Sentimentos: ['nome', 'descricao', 'orientacoes'],
  Transtornos: ['nome', 'descricao', 'sintomas', 'informacoes_adicionais'],
  Localidades: ['nome', 'tipo_servico', 'endereco', 'telefone', 'latitude', 'longitude'],
};

export default function AdminScreen({ navigation }) {
  const [categoria, setCategoria] = useState('Sentimentos');
  const [lista, setLista] = useState([]);
  const [formulario, setFormulario] = useState({});
  const [editando, setEditando] = useState(null);
  const [token, setToken] = useState('');
  const [itemParaExcluir, setItemParaExcluir] = useState(null);

  useEffect(() => {
    async function iniciar() {
      const salvo = await AsyncStorage.getItem('token');
      const usuarioSalvo = await AsyncStorage.getItem('usuario');

      if (!salvo || !usuarioSalvo) {
        navigation.replace('Login');
        return;
      }

      const usuario = JSON.parse(usuarioSalvo);

      if (usuario.nivel_usuario !== 'admin') {
        Alert.alert('Acesso negado', 'Esta área é exclusiva para administradores.');
        navigation.replace('Home');
        return;
      }

      setToken(salvo);
    }

    iniciar();
  }, []);

  useEffect(() => {
    if (token) carregarDados();
  }, [categoria, token]);

  async function carregarDados() {
    try {
      const resposta = await fetch(`${API_URL}/${categoria.toLowerCase()}`);
      const dados = await resposta.json();

      if (!resposta.ok) {
        Alert.alert('Erro', 'Não foi possível carregar os conteúdos.');
        return;
      }

      setLista(Array.isArray(dados) ? dados : []);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  }

  function atualizarCampo(campo, valor) {
    setFormulario((atual) => ({ ...atual, [campo]: valor }));
  }

  async function salvar() {
    const campos = categorias[categoria];

const camposObrigatorios = categoria === 'Localidades'
  ? ['nome', 'tipo_servico', 'endereco']
  : campos;

if (camposObrigatorios.some(
  (campo) => !String(formulario[campo] ?? '').trim()
)) {
  console.log('Preencha os campos obrigatórios.');
  return;
}
    const metodo = editando ? 'PUT' : 'POST';
    const endereco = editando
      ? `${API_URL}/${categoria.toLowerCase()}/${editando}`
      : `${API_URL}/${categoria.toLowerCase()}`;

    try {
      const resposta = await fetch(endereco, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formulario),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        Alert.alert('Erro', dados.mensagem || 'Não foi possível salvar.');
        return;
      }

      Alert.alert('Sucesso', editando ? 'Conteúdo atualizado!' : 'Conteúdo cadastrado!');
      setFormulario({});
      setEditando(null);
      carregarDados();
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  }

  function prepararEdicao(item) {
    setFormulario(
      Object.fromEntries(
        categorias[categoria].map((campo) => [campo, String(item[campo] ?? '')])
      )
    );
    setEditando(item.id);
  }

  async function excluir(id) {
  try {
    const resposta = await fetch(
      `${API_URL}/${categoria.toLowerCase()}/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      setItemParaExcluir(null);
      console.log('Erro ao excluir:', dados);
      return;
    }

    setItemParaExcluir(null);
    carregarDados();
  } catch (erro) {
    console.log('Erro na exclusão:', erro);
  }
}

  async function sair() {
    await AsyncStorage.multiRemove(['token', 'usuario']);
    navigation.replace('Home');
  }

  return (
    <View style={styles.fundo}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Image
  source={require('../assets/MHI logo.png')}
  style={styles.logo}
  resizeMode="contain"
/>
        <Text style={styles.titulo}>Painel administrativo</Text>
        <Text style={styles.descricao}>
          Gerencie os conteúdos disponíveis na plataforma.
        </Text>

        <View style={styles.categorias}>
          {Object.keys(categorias).map((item) => (
            <Pressable
              key={item}
              style={[
                styles.botaoCategoria,
                categoria === item && styles.categoriaAtiva,
              ]}
              onPress={() => {
                setCategoria(item);
                setFormulario({});
                setEditando(null);
              }}
            >
              <Text style={categoria === item ? styles.textoAtivo : styles.textoCategoria}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.tituloCard}>
            {editando ? 'Editar conteúdo' : `Novo conteúdo: ${categoria}`}
          </Text>

          {categorias[categoria].map((campo) => (
            <TextInput
              key={campo}
              style={styles.input}
              placeholder={campo.replaceAll('_', ' ')}
              value={String(formulario[campo] ?? '')}
              onChangeText={(valor) => atualizarCampo(campo, valor)}
              multiline={['descricao', 'orientacoes', 'sintomas', 'informacoes_adicionais'].includes(campo)}
              keyboardType={['latitude', 'longitude'].includes(campo) ? 'numeric' : 'default'}
            />
          ))}

          <Pressable style={styles.botao} onPress={salvar}>
            <Text style={styles.textoBotao}>
              {editando ? 'Salvar alterações' : 'Cadastrar conteúdo'}
            </Text>
          </Pressable>

          {editando && (
            <Pressable
              style={styles.botaoCancelar}
              onPress={() => {
                setFormulario({});
                setEditando(null);
              }}
            >
              <Text style={styles.textoCancelar}>Cancelar edição</Text>
            </Pressable>
          )}
        </View>

        <Text style={styles.tituloLista}>Conteúdos cadastrados</Text>

        {lista.map((item) => (
          <View key={item.id} style={styles.item} >
            <Text style={styles.nomeItem}>{item.nome}</Text>

            <View style={styles.acoes}>
              <Pressable style={styles.botaoEditar} onPress={() => prepararEdicao(item)}>
                <Text style={styles.textoAcao}>Editar</Text>
              </Pressable>

                    <Pressable
        style={styles.botaoExcluir}
        onPress={() => setItemParaExcluir(item)}
        >
        <Text style={styles.textoAcao}>Excluir</Text>
        </Pressable>
            </View>
          </View>
        ))}

        {lista.length === 0 && (
          <Text style={styles.vazio}>Nenhum conteúdo encontrado.</Text>
        )}

        {itemParaExcluir && (
  <View style={styles.confirmacao}>
    <Text style={styles.tituloConfirmacao}>
      Confirmar exclusão
    </Text>

    <Text style={styles.textoConfirmacao}>
      Deseja realmente excluir "{itemParaExcluir.nome}"?
    </Text>

    <View style={styles.acoes}>
      <Pressable
        style={styles.botaoCancelar}
        onPress={() => setItemParaExcluir(null)}
      >
        <Text style={styles.textoCancelar}>Cancelar</Text>
      </Pressable>

      <Pressable
        style={styles.botaoExcluir}
        onPress={() => excluir(itemParaExcluir.id)}
      >
        <Text style={styles.textoAcao}>Confirmar</Text>
      </Pressable>
    </View>
  </View>
)}

        <Pressable style={styles.botaoSair} onPress={sair}>
          <Text style={styles.textoBotao}>Sair da conta</Text>
        </Pressable>

        <Pressable onPress={() => navigation.replace('Home')}>
          <Text style={styles.voltar}>Voltar ao início</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#F3F7FB',
  },

  conteudo: {
    padding: 24,
    paddingBottom: 45,
    width: '100%',
    maxWidth: 1000,
    alignSelf: 'center',
  },

  // CABEÇALHO E LOGO
  logo: {
    width: 160,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 12,
  },

  titulo: {
    color: '#173B53',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },

  descricao: {
    color: '#758B9B',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 12,
    lineHeight: 21,
  },

  // CATEGORIAS
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 22,
  },

  botaoCategoria: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1EAF1',
  },

  categoriaAtiva: {
    backgroundColor: '#168BC3',
    borderColor: '#168BC3',
  },

  textoCategoria: {
    color: '#526B7C',
    fontWeight: '600',
    fontSize: 14,
  },

  textoAtivo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  // CARTÕES
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6EDF3',
    borderRadius: 18,
    padding: 22,
    marginTop: 8,
    marginBottom: 20,
    shadowColor: '#193B52',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  tituloCard: {
    color: '#173B53',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  // CAMPOS
  input: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#DCE6ED',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginBottom: 13,
    minHeight: 48,
    color: '#24465B',
    fontSize: 14,
  },

  // BOTÕES
  botao: {
    backgroundColor: '#168BC3',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  botaoCancelar: {
    backgroundColor: '#EDF4F8',
    padding: 13,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  textoCancelar: {
    color: '#526B7C',
    fontWeight: 'bold',
  },

  // LISTAGEM
  tituloLista: {
    color: '#173B53',
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
  },

  item: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EDF3',
    borderRadius: 14,
    padding: 17,
    marginBottom: 12,
    shadowColor: '#193B52',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },

  nomeItem: {
    color: '#24465B',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 14,
  },

  acoes: {
    flexDirection: 'row',
    gap: 10,
  },

  botaoEditar: {
    backgroundColor: '#168BC3',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 9,
  },

  botaoExcluir: {
    backgroundColor: '#D95353',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 9,
  },

  textoAcao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  vazio: {
    color: '#8295A3',
    textAlign: 'center',
    padding: 22,
    fontSize: 14,
  },

  // RODAPÉ
  botaoSair: {
    backgroundColor: '#EAF1F6',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },

  textoBotaoSair: {
    color: '#526B7C',
    fontWeight: 'bold',
  },

  voltar: {
    color: '#168BC3',
    textAlign: 'center',
    marginTop: 18,
    fontWeight: '600',
  },

  // CONFIRMAÇÃO
  confirmacao: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1EAF1',
    borderRadius: 16,
    padding: 22,
    marginTop: 18,
  },

  tituloConfirmacao: {
    color: '#173B53',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  textoConfirmacao: {
    color: '#758B9B',
    marginBottom: 18,
    lineHeight: 21,
  },
});

