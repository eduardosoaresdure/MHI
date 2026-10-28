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