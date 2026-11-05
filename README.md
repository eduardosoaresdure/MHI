# MHI — Mental Health Informative

## 1. Planejamento inicial — Entrega 1

### 1.1 Problema atual

O acesso à informação sobre saúde mental ainda precisa ser ampliado. A falta de informações acessíveis e organizadas pode dificultar a compreensão dos sentimentos, dos transtornos mentais e dos locais onde buscar atendimento e apoio.

### 1.2 Contexto e público afetado

O MHI é destinado à população em geral, com atenção especial a adolescentes, adultos e pessoas em situação de vulnerabilidade que buscam informações sobre saúde mental e serviços de apoio.

### 1.3 Justificativa

O desenvolvimento do MHI se justifica pela importância de facilitar o acesso a informações sobre saúde mental em um ambiente digital organizado e acessível. A aplicação pretende contribuir para a compreensão dos sentimentos e dos transtornos mentais, além de facilitar a localização de serviços de atendimento. Dessa forma, o projeto se relaciona ao Objetivo de Desenvolvimento Sustentável 3 (ODS 3), que trata de Saúde e Bem-Estar.

### 1.4 Proposta de solução

Desenvolver uma aplicação informativa sobre saúde mental, organizada em telas de início, sentimentos, transtornos e localização de serviços. A plataforma permitirá consultar conteúdos e obter informações sobre serviços de atendimento, incluindo Centros de Atenção Psicossocial (CAPS) em Santa Cruz do Sul.

### 1.5 Nome da aplicação

**MHI — Mental Health Informative.**

O nome representa a proposta de disponibilizar informações sobre saúde mental por meio de uma plataforma digital.

### 1.6 Tipos de usuário

A aplicação contará inicialmente com dois níveis de usuário:

- **Usuário padrão:** pessoa que utiliza a plataforma para consultar informações e acessar os recursos disponíveis.
- **Administrador:** usuário responsável pelo gerenciamento dos conteúdos informativos sobre sentimentos e transtornos mentais.

### 1.7 Permissões iniciais

**Usuário padrão:**
- Navegar pelas telas da aplicação.
- Consultar e pesquisar informações sobre sentimentos e transtornos mentais.
- Acessar a tela de localização e consultar serviços de atendimento.
- Utilizar os recursos de contato disponibilizados pela plataforma.

**Administrador:**
- Consultar os conteúdos cadastrados.
- Adicionar novos conteúdos sobre sentimentos e transtornos mentais.
- Editar informações existentes.
- Excluir conteúdos que não devam mais ser exibidos.

As permissões serão aplicadas de acordo com o nível de usuário. As operações administrativas deverão ser restritas aos usuários autorizados.

### 1.8 Principais funcionalidades previstas

- Apresentação inicial do projeto na tela Home.
- Consulta e pesquisa de informações sobre sentimentos.
- Consulta e pesquisa de informações sobre transtornos mentais.
- Localização e consulta de serviços de saúde mental, com foco inicial nos CAPS de Santa Cruz do Sul.
- Gerenciamento de conteúdos pelo administrador, incluindo cadastro, consulta, edição e exclusão.
- Cadastro e autenticação de usuários, previstos para as etapas posteriores do desenvolvimento.

### 1.9 Telas previstas

**Home:** tela inicial da aplicação, responsável por apresentar o projeto e permitir o acesso às demais áreas.

**Sentimentos:** tela dedicada à consulta e à pesquisa de informações sobre sentimentos.

**Transtornos:** tela destinada à consulta e à pesquisa de informações sobre transtornos mentais.

**Localização:** tela voltada à consulta de serviços de saúde mental, com previsão de exibir um mapa e informações sobre os CAPS de Santa Cruz do Sul.

Novas telas poderão ser adicionadas conforme as necessidades identificadas durante o desenvolvimento.

### 1.10 Fluxo inicial de navegação

A aplicação é aberta inicialmente na tela Home. A partir dela, o usuário pode acessar as telas Sentimentos, Transtornos e Localização por meio dos elementos de navegação da interface.

O fluxo inicial é:

- Home → Sentimentos
- Home → Transtornos
- Home → Localização

A navegação é implementada com React Navigation, permitindo a transição entre as telas. A estrutura poderá ser ampliada posteriormente para incluir outras telas e funcionalidades.

---

## 2. Modelagem e planejamento técnico — Entrega 2

### 2.1 Requisitos funcionais atualizados

A segunda etapa do desenvolvimento amplia as funcionalidades previstas na primeira entrega, introduzindo o armazenamento de dados por meio de um banco de dados MySQL e uma API REST.

Os principais requisitos funcionais são:

- Consultar informações cadastradas sobre sentimentos.
- Consultar informações cadastradas sobre transtornos mentais.
- Consultar serviços de atendimento em saúde mental.
- Permitir o cadastro de novos conteúdos por meio da API.
- Integrar o aplicativo à API para consultar e enviar dados.
- Preparar a estrutura para cadastro e autenticação de usuários nas próximas etapas.

A pesquisa de conteúdos, o gerenciamento completo e o controle de permissões permanecem previstos para etapas posteriores.

### 2.2 Telas e fluxos atualizados

O aplicativo mantém as quatro telas principais:

- **Home:** apresentação e acesso às funcionalidades.
- **Sentimentos:** consulta de informações sobre sentimentos.
- **Transtornos:** consulta de informações sobre transtornos mentais.
- **Localização:** consulta de serviços de atendimento em saúde mental.

As telas Sentimentos, Transtornos e Localização foram integradas à API, permitindo que os conteúdos sejam carregados dinamicamente a partir do banco de dados.

Também estão previstas melhorias futuras, como pesquisa de conteúdos e implementação de um mapa interativo na seção de localização.

### 2.3 Arquitetura e tecnologias

O projeto utiliza uma arquitetura dividida em três partes principais:

- **Frontend:** React Native com Expo, responsável pela interface e interação com os usuários.
- **Backend:** Node.js com Express, responsável pelo processamento das requisições e pela comunicação com o banco de dados.
- **Banco de dados:** MySQL, responsável pelo armazenamento e organização das informações.

A comunicação entre o aplicativo e o servidor é realizada por meio de requisições HTTP utilizando `fetch()` e uma API REST.

### 2.4 Modelagem do banco de dados

O banco de dados MySQL foi estruturado para armazenar as informações necessárias ao funcionamento da aplicação.

Foram definidas quatro entidades principais:

- **Usuários:** armazenamento das informações das contas e seus respectivos níveis de acesso.
- **Sentimentos:** armazenamento dos conteúdos informativos sobre sentimentos.
- **Transtornos:** armazenamento dos conteúdos informativos sobre transtornos mentais.
- **Localidades:** armazenamento das informações sobre serviços de atendimento em saúde mental.

### 2.5 Entidades e campos

**Usuários:**
- id
- nome
- email
- senha_hash
- nivel_usuario

**Sentimentos:**
- id
- nome
- descricao
- orientacoes

**Transtornos:**
- id
- nome
- descricao
- sintomas
- informacoes_adicionais

**Localidades:**
- id
- nome
- tipo_servico
- endereco
- telefone
- latitude
- longitude

A estrutura foi definida no arquivo `backend/database/schema.sql`.

### 2.6 Rotas implementadas da API

A API REST disponibiliza rotas para consulta e cadastro de informações.

| Método | Rota | Finalidade |
|---|---|---|
| GET | /sentimentos | Consultar sentimentos |
| POST | /sentimentos | Cadastrar sentimento |
| GET | /transtornos | Consultar transtornos |
| POST | /transtornos | Cadastrar transtorno |
| GET | /localidades | Consultar serviços |
| POST | /localidades | Cadastrar localidade |

As operações de edição e exclusão, assim como a autenticação e o controle de permissões, serão desenvolvidas nas próximas etapas.

### 2.7 Níveis de usuário e permissões

O sistema mantém os dois níveis definidos na primeira entrega:

**Usuário padrão:**
- Consultar conteúdos informativos.
- Consultar sentimentos e transtornos.
- Consultar serviços de atendimento.

**Administrador:**
- Consultar os conteúdos cadastrados.
- Cadastrar novos conteúdos.
- Editar informações existentes.
- Excluir conteúdos.

A estrutura do banco de dados já contempla o campo `nivel_usuario`. Entretanto, o controle efetivo de permissões e a autenticação serão implementados em etapas posteriores.

### 2.8 Organização do backend

O backend foi organizado para separar as responsabilidades da aplicação, facilitando a manutenção e a evolução do código.

A estrutura principal é:

```text
backend/
├── server.js
├── database/
│   └── schema.sql
└── src/
    ├── config/
    │   └── database.js
    ├── controllers/
    │   ├── sentimentosController.js
    │   ├── transtornosController.js
    │   └── localidadesController.js
    └── routes/
        ├── sentimentos.js
        ├── transtornos.js
        └── localidades.js
```

- **server.js:** configura o servidor Express, os middlewares e as rotas principais.
- **config/database.js:** estabelece a conexão com o MySQL.
- **controllers/:** contém a lógica de consulta, validação e cadastro dos dados.
- **routes/:** define os caminhos HTTP e direciona as requisições para os respectivos controllers.
- **database/schema.sql:** contém a estrutura de criação das tabelas do banco de dados.

### 2.9 Integração entre aplicativo, API e banco de dados

A integração foi realizada utilizando requisições HTTP com `fetch()`.

As telas do aplicativo consultam os dados disponibilizados pela API, que realiza as operações necessárias no MySQL e retorna as informações em formato JSON.

Foram integradas as seguintes telas:

- **Sentimentos:** consulta os registros cadastrados na tabela `sentimentos`.
- **Transtornos:** consulta os registros cadastrados na tabela `transtornos`.
- **Localização:** consulta os registros cadastrados na tabela `localidades`.

As telas também apresentam estados de carregamento e tratamento de erros durante a comunicação com a API.

### 2.10 Implementações e testes realizados

Durante a segunda etapa, foram realizadas as seguintes atividades:

1. Criação e configuração do banco de dados MySQL.
2. Criação das tabelas necessárias para o armazenamento dos dados.
3. Implementação do servidor utilizando Node.js e Express.
4. Configuração da conexão entre a API e o banco de dados.
5. Implementação das rotas GET e POST para sentimentos, transtornos e localidades.
6. Organização do backend em rotas, controllers e configuração de banco de dados.
7. Integração das três telas principais com a API utilizando `fetch()`.
8. Testes de comunicação entre servidor, banco de dados e aplicativo.
9. Verificação da exibição dos registros cadastrados nas três telas.

As operações de consulta e cadastro foram implementadas na API, e a integração das consultas foi testada no aplicativo.

---

## 3. Próximas etapas do desenvolvimento

As próximas etapas do MHI incluem:

- Implementação das operações de edição e exclusão de registros.
- Desenvolvimento do cadastro e autenticação de usuários.
- Implementação de criptografia de senhas e autenticação por token JWT.
- Controle de acesso de acordo com o nível de usuário.
- Desenvolvimento das funcionalidades administrativas.
- Melhorias na pesquisa de conteúdos.
- Implementação do mapa interativo para consulta de serviços de saúde mental.
- Ampliação dos testes e da documentação do projeto.

O desenvolvimento continuará de forma progressiva, priorizando a organização do código, a integração entre as tecnologias e a evolução das funcionalidades.