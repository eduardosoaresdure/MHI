# MHI — Mental Health Informative

## 1. Planejamento inicial — Entrega 1

### 1.1 Problema atual

O acesso à informação sobre saúde mental ainda precisa ser ampliado. A falta de informações acessíveis e organizadas pode dificultar a compreensão dos sentimentos, dos transtornos mentais e dos locais onde buscar atendimento e apoio.

### 1.2 Contexto e público afetado

O MHI é destinado à população em geral, com atenção especial a adolescentes, adultos e pessoas em situação de vulnerabilidade que buscam informações sobre saúde mental e serviços de apoio.

### 1.3 Justificativa

O desenvolvimento do MHI se justifica pela importância de facilitar o acesso a informações sobre saúde mental em um ambiente digital organizado e acessível. A aplicação pretende contribuir para a compreensão dos sentimentos e dos transtornos mentais, além de facilitar a localização de serviços de atendimento. Dessa forma, o projeto se relaciona ao Objetivo de Desenvolvimento Sustentável 3 (ODS 3), que trata de Saúde e Bem-Estar.

### 1.4 Proposta de solução

Desenvolver uma aplicação informativa sobre saúde mental, inicialmente organizada em telas de início, sentimentos, transtornos e localização de serviços. A plataforma permitirá consultar e pesquisar conteúdos e localizar serviços de atendimento, incluindo Centros de Atenção Psicossocial (CAPS) em Santa Cruz do Sul.

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

A aplicação será aberta inicialmente na tela Home. A partir dela, o usuário poderá acessar as telas Sentimentos, Transtornos e Localização por meio dos elementos de navegação da interface.

O fluxo inicial será:

**Home → Sentimentos**

**Home → Transtornos**

**Home → Localização**

A navegação será implementada com React Navigation, permitindo a transição entre as telas. A estrutura poderá ser ampliada posteriormente para incluir outras telas e funcionalidades.

## 2. Modelagem e planejamento técnico — Entrega 2

### 2.1 Requisitos funcionais atualizados

A segunda etapa do desenvolvimento amplia as funcionalidades previstas na primeira entrega, iniciando a organização e o armazenamento de dados por meio de um banco de dados MySQL e uma API REST.

Os principais requisitos funcionais são:

- Consultar informações cadastradas sobre sentimentos.
- Consultar informações cadastradas sobre transtornos mentais.
- Pesquisar conteúdos informativos.
- Consultar serviços de atendimento em saúde mental.
- Permitir que administradores gerenciem os conteúdos da aplicação.
- Preparar a estrutura para cadastro e autenticação de usuários nas próximas etapas.
- Integrar o aplicativo mobile à API para consultar e enviar dados.

### 2.2 Telas e fluxos atualizados

O aplicativo mantém as quatro telas principais desenvolvidas na primeira entrega:

- **Home:** apresentação e acesso às funcionalidades.
- **Sentimentos:** consulta e pesquisa de informações sobre sentimentos.
- **Transtornos:** consulta e pesquisa de informações sobre transtornos mentais.
- **Localização:** consulta de serviços de atendimento em saúde mental.

A evolução prevê a integração dessas telas com a API, permitindo que os conteúdos sejam obtidos dinamicamente a partir do banco de dados.

Também está prevista a implementação de pesquisa de conteúdos e de um mapa interativo na seção de localização.

### 2.3 Arquitetura e tecnologias

O projeto utilizará uma arquitetura dividida em três partes principais:

- **Frontend:** React Native com Expo, responsável pela interface e interação com os usuários.
- **Backend:** Node.js com Express, responsável pelo processamento das requisições e pelas regras de negócio.
- **Banco de dados:** MySQL, responsável pelo armazenamento e organização das informações.

A comunicação entre o aplicativo e o servidor será realizada por meio de requisições HTTP utilizando `fetch()` e uma API REST.

### 2.4 Modelagem do banco de dados

O banco de dados será estruturado para armazenar as informações necessárias ao funcionamento da aplicação.

Inicialmente, estão previstas quatro entidades principais:

- **Usuários:** armazenamento das informações das contas e seus respectivos níveis de acesso.
- **Sentimentos:** armazenamento dos conteúdos informativos sobre sentimentos.
- **Transtornos:** armazenamento dos conteúdos informativos sobre transtornos mentais.
- **Localidades:** armazenamento das informações sobre serviços de atendimento em saúde mental.

A modelagem deverá permitir a consulta e o gerenciamento organizado dessas informações, mantendo a relação entre os dados e as funcionalidades da aplicação.

### 2.5 Entidades e campos previstos

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

Os campos e relacionamentos poderão ser ajustados durante a implementação da estrutura do banco de dados.

### 2.6 Rotas previstas da API

A API REST será organizada para disponibilizar os dados necessários ao aplicativo.

Inicialmente, estão previstas as seguintes rotas:

| Método | Rota | Finalidade |
|---|---|---|
| GET | /sentimentos | Consultar sentimentos |
| GET | /transtornos | Consultar transtornos |
| GET | /localidades | Consultar serviços |
| POST | /sentimentos | Cadastrar sentimento |
| POST | /transtornos | Cadastrar transtorno |
| POST | /localidades | Cadastrar localidade |

As rotas de gerenciamento serão utilizadas futuramente em conjunto com o sistema de autenticação e controle de permissões.

### 2.7 Níveis de usuário e permissões

O sistema manterá os dois níveis definidos na primeira entrega:

**Usuário padrão:**
- Consultar conteúdos informativos.
- Pesquisar sentimentos e transtornos.
- Consultar serviços de atendimento.

**Administrador:**
- Consultar os conteúdos cadastrados.
- Cadastrar novos conteúdos.
- Editar informações existentes.
- Excluir conteúdos.

O controle de permissões será implementado no backend, garantindo que as operações administrativas sejam realizadas apenas por usuários autorizados.

### 2.8 Integração e desenvolvimento

A integração será desenvolvida progressivamente, seguindo esta estrutura:

1. Criação e configuração do banco de dados MySQL.
2. Implementação da API utilizando Node.js e Express.
3. Configuração da conexão entre a API e o banco de dados.
4. Criação das primeiras rotas para consulta e cadastro de informações.
5. Integração do React Native com a API utilizando `fetch()`.
6. Testes das operações de consulta e cadastro.
7. Atualização da documentação e do repositório GitHub.

A implementação será realizada gradualmente, permitindo que o aplicativo passe a utilizar dados armazenados no banco de dados em vez de depender exclusivamente de conteúdos definidos diretamente nas telas.