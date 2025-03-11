Projeto - FutStart

Este é um projeto de gerenciamento de partidas de futebol para uma arena esportiva. O sistema permite criar, listar, editar e remover partidas, além de permitir que os jogadores confirmem sua presença e adicionem seus dados (nome e telefone) para cada partida.

Funcionalidades:

Criar Partidas: É possível criar novas partidas, especificando o título, quadra, data e horário da partida (após a partida criada o usuário recebe um código via email para confirmação da marcação da partida).

Verificar Disponibilidade de Quadra: O sistema verifica se a quadra selecionada já está ocupada naquele horário.

Listar Partidas: Todas as partidas criadas são listadas na página principal, com detalhes como nome, quadra, data e hora.

Adicionar Jogadores: Para cada partida, os organizadores podem adicionar jogadores, informando seus nomes e telefones.

Remover Partidas e Jogadores: É possível remover partidas e jogadores de cada partida existente.

Horário de Jogo: O sistema define um horário mínimo para as partidas (a partir das 7h) e permite selecionar horários em intervalos de 1 hora.

Tecnologias Utilizadas:

Frontend: HTML, CSS, JavaScript.
Backend: Node.js, Express.
Banco de Dados: Armazenamento em JSON (para simplificação do projeto).

Bibliotecas:
Frontend: Bootstrap (para estilização e componentes prontos).
Backend: Nodemailer (usada para enviar e-mails a partir de uma aplicação back-end);
Handlebars (permite que você crie templates de e-mail);

Como Rodar o Projeto:

Pré-requisitos
Node.js (v12 ou superior);
npm (gerenciador de pacotes do Node.js).
