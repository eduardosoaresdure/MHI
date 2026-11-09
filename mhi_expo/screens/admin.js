
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000';

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

    if (campos.some((campo) => !String(formulario[campo] ?? '').trim())) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
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
        <Text style={styles.logo}>MHI</Text>
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
  fundo: { flex: 1, backgroundColor: '#F4FAFE' },
  conteudo: { padding: 18, paddingBottom: 35 },
  logo: { color: '#168BC3', fontSize: 30, fontWeight: 'bold', textAlign: 'center' },
  titulo: { color: '#102D42', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 10 },
  descricao: { color: '#587184', textAlign: 'center', marginVertical: 12 },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 15 },
  botaoCategoria: { padding: 12, borderRadius: 20, backgroundColor: '#E8F4FE' },
  categoriaAtiva: { backgroundColor: '#168BC3' },
  textoCategoria: { color: '#123047', fontWeight: 'bold' },
  textoAtivo: { color: '#FFFFFF', fontWeight: 'bold' },
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#C8DDED', borderRadius: 16, padding: 18 },
  tituloCard: { color: '#123047', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: { backgroundColor: '#F4FAFE', borderWidth: 1, borderColor: '#C8DDED', borderRadius: 10, padding: 12, marginBottom: 10, minHeight: 45 },
  botao: { backgroundColor: '#168BC3', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 5 },
  textoBotao: { color: '#FFFFFF', fontWeight: 'bold' },
  botaoCancelar: { padding: 12, alignItems: 'center' },
  textoCancelar: { color: '#587184', fontWeight: 'bold' },
  tituloLista: { color: '#102D42', fontSize: 20, fontWeight: 'bold', marginTop: 25, marginBottom: 12 },
  item: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#C8DDED', borderRadius: 12, padding: 15, marginBottom: 10 },
  nomeItem: { color: '#123047', fontWeight: 'bold', fontSize: 16, marginBottom: 12 },
  acoes: { flexDirection: 'row', gap: 10 },
  botaoEditar: { backgroundColor: '#168BC3', padding: 10, borderRadius: 8 },
  botaoExcluir: { backgroundColor: '#B93B3B', padding: 10, borderRadius: 8 },
  textoAcao: { color: '#FFFFFF', fontWeight: 'bold' },
  vazio: { color: '#587184', textAlign: 'center', padding: 20 },
  botaoSair: { backgroundColor: '#587184', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 25 },
  voltar: { color: '#168BC3', textAlign: 'center', marginTop: 18 },
  confirmacao: {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#C8DDED',
  borderRadius: 16,
  padding: 20,
  marginTop: 15,
},
tituloConfirmacao: {
  color: '#102D42',
  fontSize: 19,
  fontWeight: 'bold',
  marginBottom: 10,
},
textoConfirmacao: {
  color: '#587184',
  marginBottom: 18,
},
botaoCancelar: {
  backgroundColor: '#E8F4FE',
  padding: 10,
  borderRadius: 8,
},
textoCancelar: {
  color: '#123047',
  fontWeight: 'bold',
},
});
