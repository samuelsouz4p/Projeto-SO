# FutStart - Gerenciamento de Partidas de Futebol

Este é um projeto de gerenciamento de partidas de futebol para uma arena esportiva. O sistema permite criar, listar, editar e remover partidas, além de permitir que os jogadores confirmem sua presença e adicionem seus dados (nome e telefone) para cada partida.

## Funcionalidades

- **Criar Partidas**: É possível criar novas partidas, especificando o título, quadra, data e horário da partida. Após a criação, o usuário recebe um código via e-mail para confirmação da marcação da partida.
  
- **Verificar Disponibilidade de Quadra**: O sistema verifica se a quadra selecionada já está ocupada naquele horário.
  
- **Listar Partidas**: Todas as partidas criadas são listadas na página principal, com detalhes como nome, quadra, data e hora.
  
- **Adicionar Jogadores**: Para cada partida, os organizadores podem adicionar jogadores, informando seus nomes e telefones.
  
- **Remover Partidas e Jogadores**: É possível remover partidas e jogadores de cada partida existente.
  
- **Horário de Jogo**: O sistema define um horário mínimo para as partidas (a partir das 7h) e permite selecionar horários em intervalos de 1 hora.

- **Página de Pagamento**: Leitura ou cópia de código QR para pagamento via Pix.

## Tecnologias Utilizadas

### Frontend
- **HTML**: Para a estrutura da página.
- **CSS**: Para estilização e layout.
- **JavaScript**: Para funcionalidades dinâmicas e manipulação do DOM.
- **Bootstrap**: Framework de CSS para componentes prontos e responsividade.

### Backend
- **Node.js**: Ambiente de execução de JavaScript no servidor.
- **Express**: Framework para criação de servidores HTTP.
- **Nodemailer**: Biblioteca para envio de e-mails, utilizada para enviar códigos de confirmação de partidas.
- **Handlebars**: Biblioteca para templating de e-mails (utilizada para enviar e-mails com conteúdo dinâmico).

### Banco de Dados
- **JSON**: Armazenamento de dados simples em formato JSON (para simplificação do projeto).

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (v12 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/samuelsouz4p/Projeto-SO.git

2. Navegue até o diretório do projeto:
  bash
  cd FutStart - SO
  
4. Instale as dependências:
  bash
  npm install

6. Inicie o servidor:
  bash
  npm start

Acesse o projeto em http://localhost:3000.

O sistema estará rodando localmente e você pode acessar através de um navegador.
