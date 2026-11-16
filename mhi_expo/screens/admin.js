
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
import { Feather } from '@expo/vector-icons';
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

  const icones = {
    Sentimentos: 'heart',
    Transtornos: 'activity',
    Localidades: 'map-pin',
  };

  return (
    <View style={styles.fundo}>
      <View style={styles.layout}>

        {/* SIDEBAR */}
        <View style={styles.sidebar}>
          <View style={styles.logoArea}>
            <View style={styles.logoIcone}>
              <Feather name="activity" size={23} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.logoTexto}>MHI</Text>
              <Text style={styles.logoSubtexto}>ADMINISTRAÇÃO</Text>
            </View>
          </View>

          <Text style={styles.menuTitulo}>GERENCIAMENTO</Text>

          {Object.keys(categorias).map((item) => (
            <Pressable
              key={item}
              style={[
                styles.menuItem,
                categoria === item && styles.menuItemAtivo,
              ]}
              onPress={() => {
                setCategoria(item);
                setFormulario({});
                setEditando(null);
              }}
            >
              <Feather
                name={icones[item]}
                size={18}
                color={categoria === item ? '#FFFFFF' : '#A8B7C7'}
              />
              <Text
                style={[
                  styles.menuTexto,
                  categoria === item && styles.menuTextoAtivo,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}

          <View style={styles.sidebarRodape}>
            <View style={styles.adminInfo}>
              <View style={styles.avatar}>
                <Feather name="user" size={18} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.adminNome}>Administrador</Text>
                <Text style={styles.adminCargo}>Painel MHI</Text>
              </View>
            </View>

            <Pressable style={styles.sairMenu} onPress={sair}>
              <Feather name="log-out" size={17} color="#E58A8A" />
              <Text style={styles.sairTexto}>Sair da conta</Text>
            </Pressable>
          </View>
        </View>

        {/* ÁREA PRINCIPAL */}
        <View style={styles.areaPrincipal}>
          <View style={styles.topbar}>
            <View>
              <Text style={styles.topbarTitulo}>Painel administrativo</Text>
              <Text style={styles.topbarDescricao}>
                Gerencie os conteúdos disponíveis na plataforma.
              </Text>
            </View>

            <View style={styles.topbarSelo}>
              <Feather name="shield" size={15} color="#168FD0" />
              <Text style={styles.topbarSeloTexto}>Admin</Text>
            </View>
          </View>

          <ScrollView
            style={styles.scrollPrincipal}
            contentContainerStyle={styles.conteudo}
            showsVerticalScrollIndicator={false}
          >
            {/* CABEÇALHO DA CATEGORIA */}
            <View style={styles.cabecalhoSecao}>
              <View>
                <Text style={styles.breadcrumb}>GERENCIAMENTO / {categoria.toUpperCase()}</Text>
                <Text style={styles.tituloSecao}>{categoria}</Text>
                <Text style={styles.subtituloSecao}>
                  Gerencie os registros de {categoria.toLowerCase()}.
                </Text>
              </View>

              <View style={styles.contador}>
                <Feather name="layers" size={17} color="#168FD0" />
                <Text style={styles.contadorTexto}>
                  {lista.length} registros
                </Text>
              </View>
            </View>

            {/* CATEGORIAS */}
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
                  <Feather
                    name={icones[item]}
                    size={16}
                    color={categoria === item ? '#FFFFFF' : '#637789'}
                  />
                  <Text
                    style={[
                      styles.textoCategoria,
                      categoria === item && styles.textoAtivo,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* FORMULÁRIO */}
            <View style={styles.card}>
              <View style={styles.cardCabecalho}>
                <View style={styles.cardIcone}>
                  <Feather
                    name={editando ? 'edit-3' : 'plus'}
                    size={19}
                    color="#168FD0"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.tituloCard}>
                    {editando ? 'Editar conteúdo' : 'Novo conteúdo'}
                  </Text>
                  <Text style={styles.descricaoCard}>
                    {editando
                      ? 'Atualize as informações deste registro.'
                      : `Adicione um novo registro em ${categoria}.`}
                  </Text>
                </View>

                {editando && (
                  <View style={styles.editandoSelo}>
                    <Text style={styles.editandoTexto}>EDITANDO</Text>
                  </View>
                )}
              </View>

              <View style={styles.divisor} />

              {categorias[categoria].map((campo) => {
                const multiline = [
                  'descricao',
                  'orientacoes',
                  'sintomas',
                  'informacoes_adicionais',
                ].includes(campo);

                return (
                  <View key={campo} style={styles.campoContainer}>
                    <Text style={styles.labelCampo}>
                      {campo.replaceAll('_', ' ').replace(/^./, (letra) => letra.toUpperCase())}
                    </Text>

                    <TextInput
                      style={[
                        styles.input,
                        multiline && styles.inputMultiline,
                      ]}
                      placeholder={`Digite ${campo.replaceAll('_', ' ')}`}
                      placeholderTextColor="#94A3B3"
                      value={String(formulario[campo] ?? '')}
                      onChangeText={(valor) => atualizarCampo(campo, valor)}
                      multiline={multiline}
                      keyboardType={['latitude', 'longitude'].includes(campo) ? 'numeric' : 'default'}
                    />
                  </View>
                );
              })}

              <Pressable
                style={({ pressed }) => [
                  styles.botaoSalvar,
                  pressed && styles.botaoSalvarPressionado,
                ]}
                onPress={salvar}
              >
                <Feather
                  name={editando ? 'save' : 'plus-circle'}
                  size={17}
                  color="#FFFFFF"
                />
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

            {/* LISTAGEM */}
            <View style={styles.listaCabecalho}>
              <View>
                <Text style={styles.tituloLista}>Conteúdos cadastrados</Text>
                <Text style={styles.subtituloLista}>
                  Registros disponíveis nesta categoria.
                </Text>
              </View>
              <View style={styles.listaIcone}>
                <Feather name="list" size={19} color="#168FD0" />
              </View>
            </View>

            <View style={styles.listaContainer}>
              <View style={styles.listaTopo}>
                <Text style={styles.listaTopoTexto}>NOME DO CONTEÚDO</Text>
                <Text style={styles.listaTopoTexto}>AÇÕES</Text>
              </View>

              {lista.map((item) => (
                <View key={item.id} style={styles.item}>
                  <View style={styles.itemInfo}>
                    <View style={styles.itemIcone}>
                      <Feather
                        name={icones[categoria]}
                        size={17}
                        color="#168FD0"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.nomeItem}>{item.nome}</Text>
                      <Text style={styles.idItem}>Registro #{item.id}</Text>
                    </View>
                  </View>

                  <View style={styles.acoes}>
                    <Pressable
                      style={styles.botaoEditar}
                      onPress={() => prepararEdicao(item)}
                    >
                      <Feather name="edit-2" size={14} color="#168FD0" />
                      <Text style={styles.textoEditar}>Editar</Text>
                    </Pressable>

                    <Pressable
                      style={styles.botaoExcluir}
                      onPress={() => setItemParaExcluir(item)}
                    >
                      <Feather name="trash-2" size={14} color="#D95353" />
                      <Text style={styles.textoExcluir}>Excluir</Text>
                    </Pressable>
                  </View>
                </View>
              ))}

              {lista.length === 0 && (
                <View style={styles.vazioContainer}>
                  <View style={styles.vazioIcone}>
                    <Feather name="inbox" size={28} color="#8BA4B6" />
                  </View>
                  <Text style={styles.vazioTitulo}>Nenhum conteúdo encontrado</Text>
                  <Text style={styles.vazio}>
                    Os registros desta categoria aparecerão aqui.
                  </Text>
                </View>
              )}
            </View>

            {/* CONFIRMAÇÃO DE EXCLUSÃO */}
            {itemParaExcluir && (
              <View style={styles.confirmacao}>
                <View style={styles.confirmacaoIcone}>
                  <Feather name="alert-triangle" size={22} color="#D95353" />
                </View>

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
                    style={styles.botaoExcluirConfirmacao}
                    onPress={() => excluir(itemParaExcluir.id)}
                  >
                    <Feather name="trash-2" size={15} color="#FFFFFF" />
                    <Text style={styles.textoAcaoExcluir}>Confirmar exclusão</Text>
                  </Pressable>
                </View>
              </View>
            )}

            <View style={styles.rodape}>
              <Text style={styles.rodapeTexto}>
                MHI — Mental Health Informative
              </Text>
              <Pressable onPress={() => navigation.replace('Home')}>
                <Text style={styles.voltar}>Voltar ao início</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#F3F7FB',
  },

  layout: {
    flex: 1,
    flexDirection: 'row',
  },

  /* SIDEBAR */

  sidebar: {
    width: 225,
    backgroundColor: '#172331',
    paddingHorizontal: 17,
    paddingTop: 28,
    paddingBottom: 18,
  },

  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingHorizontal: 5,
    marginBottom: 55,
  },

  logoIcone: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: '#168FD0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoTexto: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  logoSubtexto: {
    color: '#8192A5',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginTop: 2,
  },

  menuTitulo: {
    color: '#718398',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 15,
    marginLeft: 8,
  },

  menuItem: {
    height: 45,
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 12,
    marginBottom: 7,
  },

  menuItemAtivo: {
    backgroundColor: '#168FD0',
  },

  menuTexto: {
    color: '#A8B7C7',
    fontSize: 13,
    fontWeight: '600',
  },

  menuTextoAtivo: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  sidebarRodape: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#2B3948',
    paddingTop: 20,
  },

  adminInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 22,
    paddingHorizontal: 3,
  },

  avatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#34475B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  adminNome: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  adminCargo: {
    color: '#8192A5',
    fontSize: 10,
    marginTop: 3,
  },

  sairMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingHorizontal: 9,
    paddingVertical: 10,
  },

  sairTexto: {
    color: '#E58A8A',
    fontSize: 12,
    fontWeight: '600',
  },

  /* ÁREA PRINCIPAL */

  areaPrincipal: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#F4F7FA',
  },

  topbar: {
    minHeight: 82,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5EBF0',
    paddingHorizontal: 30,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  topbarTitulo: {
    color: '#24384A',
    fontSize: 18,
    fontWeight: '700',
  },

  topbarDescricao: {
    color: '#8494A3',
    fontSize: 11,
    marginTop: 5,
  },

  topbarSelo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#EAF7FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  topbarSeloTexto: {
    color: '#087DBB',
    fontSize: 11,
    fontWeight: '700',
  },

  scrollPrincipal: {
    flex: 1,
  },

  conteudo: {
    padding: 30,
    paddingBottom: 45,
    width: '100%',
    maxWidth: 1150,
    alignSelf: 'center',
  },

  /* CABEÇALHO DA CATEGORIA */

  cabecalhoSecao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 25,
  },

  breadcrumb: {
    color: '#168FD0',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 9,
  },

  tituloSecao: {
    color: '#24384A',
    fontSize: 27,
    fontWeight: '800',
  },

  subtituloSecao: {
    color: '#8796A5',
    fontSize: 12,
    marginTop: 6,
  },

  contador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4ECF2',
    borderRadius: 9,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },

  contadorTexto: {
    color: '#53697C',
    fontSize: 12,
    fontWeight: '700',
  },

  /* CATEGORIAS */

  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
    marginBottom: 22,
  },

  botaoCategoria: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1EAF1',
  },

  categoriaAtiva: {
    backgroundColor: '#168FD0',
    borderColor: '#168FD0',
  },

  textoCategoria: {
    color: '#637789',
    fontWeight: '600',
    fontSize: 12,
  },

  textoAtivo: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  /* FORMULÁRIO */

  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EBF0',
    borderRadius: 12,
    padding: 23,
    marginBottom: 28,
    shadowColor: '#193B52',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.035,
    shadowRadius: 8,
    elevation: 1,
  },

  cardCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 19,
  },

  cardIcone: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EAF7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tituloCard: {
    color: '#263B4D',
    fontSize: 17,
    fontWeight: '700',
  },

  descricaoCard: {
    color: '#8A99A7',
    fontSize: 11,
    marginTop: 4,
  },

  editandoSelo: {
    backgroundColor: '#FFF4DC',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 6,
  },

  editandoTexto: {
    color: '#B68128',
    fontSize: 9,
    fontWeight: '800',
  },

  divisor: {
    height: 1,
    backgroundColor: '#EDF1F4',
    marginBottom: 20,
  },

  campoContainer: {
    marginBottom: 14,
  },

  labelCampo: {
    color: '#526779',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 7,
  },

  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E0E8EF',
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 12,
    minHeight: 44,
    color: '#344B5D',
    fontSize: 13,
  },

  inputMultiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  botaoSalvar: {
    backgroundColor: '#168FD0',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 9,
    marginTop: 7,
  },

  botaoSalvarPressionado: {
    backgroundColor: '#087DBB',
    opacity: 0.9,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },

  botaoCancelar: {
    backgroundColor: '#EDF2F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  textoCancelar: {
    color: '#637789',
    fontWeight: '700',
    fontSize: 12,
  },

  /* LISTAGEM */

  listaCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  tituloLista: {
    color: '#263B4D',
    fontSize: 19,
    fontWeight: '800',
  },

  subtituloLista: {
    color: '#8A99A7',
    fontSize: 11,
    marginTop: 5,
  },

  listaIcone: {
    width: 38,
    height: 38,
    borderRadius: 9,
    backgroundColor: '#EAF7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listaContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EBF0',
    borderRadius: 11,
    overflow: 'hidden',
  },

  listaTopo: {
    backgroundColor: '#F7F9FB',
    paddingHorizontal: 17,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E9EEF2',
  },

  listaTopoTexto: {
    color: '#8494A3',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
  },

  item: {
    paddingHorizontal: 17,
    paddingVertical: 14,
    minHeight: 72,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },

  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    flex: 1,
    minWidth: 130,
  },

  itemIcone: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#EAF7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nomeItem: {
    color: '#344B5D',
    fontWeight: '700',
    fontSize: 13,
  },

  idItem: {
    color: '#98A6B2',
    fontSize: 10,
    marginTop: 4,
  },

  acoes: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  botaoEditar: {
    backgroundColor: '#EAF7FF',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  textoEditar: {
    color: '#087DBB',
    fontWeight: '700',
    fontSize: 11,
  },

  botaoExcluir: {
    backgroundColor: '#FFF0F0',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  textoExcluir: {
    color: '#D95353',
    fontWeight: '700',
    fontSize: 11,
  },

  vazioContainer: {
    alignItems: 'center',
    paddingVertical: 42,
    paddingHorizontal: 15,
  },

  vazioIcone: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#F0F5F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },

  vazioTitulo: {
    color: '#526779',
    fontWeight: '700',
    fontSize: 13,
  },

  vazio: {
    color: '#94A3B3',
    textAlign: 'center',
    paddingTop: 7,
    fontSize: 11,
  },

  /* CONFIRMAÇÃO */

  confirmacao: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0DADA',
    borderRadius: 12,
    padding: 22,
    marginTop: 20,
  },

  confirmacaoIcone: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },

  tituloConfirmacao: {
    color: '#263B4D',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 9,
  },

  textoConfirmacao: {
    color: '#7B8D9D',
    marginBottom: 18,
    lineHeight: 21,
    fontSize: 12,
  },

  botaoExcluirConfirmacao: {
    backgroundColor: '#D95353',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  textoAcaoExcluir: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },

  /* RODAPÉ */

  rodape: {
    borderTopWidth: 1,
    borderTopColor: '#E2EAF0',
    marginTop: 35,
    paddingTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },

  rodapeTexto: {
    color: '#98A6B2',
    fontSize: 10,
  },

  voltar: {
    color: '#168FD0',
    fontSize: 11,
    fontWeight: '700',
  },
});
