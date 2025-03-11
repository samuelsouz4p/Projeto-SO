document.addEventListener('DOMContentLoaded', function () {
    const formPartida = document.getElementById('formPartida');
    const listaPartidas = document.getElementById('listaPartidas');

    const configurarDataHoraMinima = () => {
        const dataHoraInput = document.getElementById('dataHora');
    
        // Obtém a data e hora atuais
        const agora = new Date();
        agora.setMinutes(0);
        agora.setSeconds(0);
    
        // Se a hora atual for antes das 7h, define como 7h
        if (agora.getHours() < 7) {
            agora.setHours(7);
        }
    
        // Se já passou das 21h, avança para o dia seguinte às 07h
        if (agora.getHours() >= 21) {
            agora.setDate(agora.getDate() + 1);
            agora.setHours(7);
        }
    
        // Converte para o formato YYYY-MM-DDTHH:MM
        const ano = agora.getFullYear();
        const mes = String(agora.getMonth() + 1).padStart(2, '0');
        const dia = String(agora.getDate()).padStart(2, '0');
        const hora = String(agora.getHours()).padStart(2, '0');
    
        const dataHoraMinima = `${ano}-${mes}-${dia}T${hora}:00`;
    
        // Define o valor mínimo no input
        dataHoraInput.setAttribute('min', dataHoraMinima);
        dataHoraInput.setAttribute('step', '3600'); // Passo de 1 hora (3600 segundos)
    
        // Adiciona um evento para impedir horários fora do intervalo
        dataHoraInput.addEventListener('input', (event) => {
            const dataSelecionada = new Date(event.target.value);
            const horaSelecionada = dataSelecionada.getHours();
    
            if (horaSelecionada < 7 || horaSelecionada >= 21) {
                alert("Selecione um horário entre 07:00 e 21:00.");
                event.target.value = ""; // Limpa o input se horário for inválido
            }
        });
    };
    
    // Configurar a data mínima ao carregar a página
    configurarDataHoraMinima();


    // Função para carregar partidas
    const carregarPartidas = async () => {
        try {
            const response = await fetch('http://localhost:3000/partidas');
            const partidas = await response.json();

            listaPartidas.innerHTML = ''; // Limpa a lista antes de renderizar

            partidas.forEach(partida => {
                const card = document.createElement('div');
                card.classList.add('card', 'mb-3', 'shadow-sm'); // Card com uma sombra para destacar
                card.classList.add('card-verde'); // Exemplo: usando 'card-verde'
                card.innerHTML = `
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h4 class="card-title">${partida.nome}</h4>
                        <button class="btn btn-danger btn-sm remover-partida" data-id="${partida.id}">
                            Remover Partida
                        </button>
                    </div>

                    <div class="card-body">
                        <p><strong>Quadra:</strong> ${partida.quadra}</p>
                        <p><strong>Data e Hora:</strong> ${new Date(partida.data).toLocaleString()}</p>

                        <!-- Botão para abrir o formulário -->
                        <button class="btn btn-success btn-sm mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#formJogador_${partida.id}">
                            Adicionar Jogador
                        </button>

                        <!-- Formulário dentro do collapse -->
                        <div class="collapse mt-2" id="formJogador_${partida.id}">
                            <div class="card card-body">
                                <form id="formAdicionarJogador_${partida.id}">
                                    <input type="text" id="nomeJogador_${partida.id}" class="form-control mb-2" placeholder="Nome do Jogador" required>
                                    <input type="text" id="telefoneJogador_${partida.id}" class="form-control mb-2" placeholder="Telefone (--) - ---- ----" required>
                                    <button type="submit" class="btn btn-success">Salvar</button>
                                </form>
                            </div>
                        </div>

                        <!-- Lista de jogadores -->
                        <ul class="list-group list-group-flush mt-2" id="listaJogadores_${partida.id}">
                            ${partida.jogadores.length > 0
                            ? partida.jogadores.map(jogador => ` 
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <span>${jogador.nome} - ${jogador.telefone}</span>
                                        <button class="btn btn-danger btn-sm remover-jogador" data-id="${partida.id}" data-telefone="${jogador.telefone}">
                                            X
                                        </button>
                                    </li>
                                `).join('') 
                            : '<li class="list-group-item text-muted">Nenhum jogador cadastrado</li>'}
                        </ul>
                    </div>
                `;

                listaPartidas.appendChild(card);

                // Evento para adicionar jogador
                document.getElementById(`formAdicionarJogador_${partida.id}`).addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const nomeJogador = document.getElementById(`nomeJogador_${partida.id}`).value;
                    const telefoneJogador = document.getElementById(`telefoneJogador_${partida.id}`).value;

                    const novoJogador = { nome: nomeJogador, telefone: telefoneJogador };

                    try {
                        const response = await fetch(`http://localhost:3000/partidas/${partida.id}/jogador`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(novoJogador),
                        });

                        if (response.ok) {
                            carregarPartidas(); // Atualiza a lista após adicionar jogador
                        } else {
                            alert('Erro ao adicionar jogador');
                        }
                    } catch (err) {
                        console.error('Erro ao adicionar jogador:', err);
                    }
                });

                // Adicionando evento para remover partida
                card.querySelector('.remover-partida').addEventListener('click', async () => {
                    const partidaId = partida.id;

                    try {
                        const response = await fetch(`http://localhost:3000/partidas/${partidaId}`, {
                            method: 'DELETE',
                        });

                        if (response.ok) {
                            carregarPartidas(); // Atualiza a lista após remover partida
                        } else {
                            alert('Erro ao remover partida');
                        }
                    } catch (err) {
                        console.error('Erro ao remover partida:', err);
                    }
                });

                // Adicionando eventos para remover jogadores
                card.querySelectorAll('.remover-jogador').forEach(botao => {
                    botao.addEventListener('click', async () => {
                        const partidaId = botao.getAttribute('data-id');
                        const telefoneJogador = botao.getAttribute('data-telefone');

                        try {
                            const response = await fetch(`http://localhost:3000/partidas/${partidaId}/jogador/${telefoneJogador}`, {
                                method: 'DELETE',
                            });

                            if (response.ok) {
                                carregarPartidas(); // Atualiza a lista após remover jogador
                            } else {
                                alert('Erro ao remover jogador');
                            }
                        } catch (err) {
                            console.error('Erro ao remover jogador:', err);
                        }
                    });
                });
            });
        } catch (err) {
            console.error('Erro ao carregar partidas:', err);
        }
    };

    // Função para verificar se a quadra está ocupada
    const verificarQuadraOcupada = (quadra, dataHora) => {
        return fetch('http://localhost:3000/partidas')
            .then(response => response.json())
            .then(partidas => {
                // Verificar se já existe uma partida para a mesma quadra e data
                const partidaOcupada = partidas.some(partida =>
                    partida.quadra === quadra &&
                    partida.data === dataHora
                );

                return partidaOcupada;
            })
            .catch(err => {
                console.error('Erro ao verificar a quadra:', err);
                return false;  // Se houver erro, assumimos que não está ocupada
            });
    };

    // Função para manipular o envio do formulário
    formPartida.addEventListener('submit', async (e) => {
        e.preventDefault();  // Previne o envio do formulário enquanto verificamos a disponibilidade

        const quadra = document.getElementById('quadra').value;
        const dataHora = document.getElementById('dataHora').value;

        // Verificar se a quadra já está ocupada
        const quadraOcupada = await verificarQuadraOcupada(quadra, dataHora);

        if (quadraOcupada) {
            alert('A quadra selecionada já está ocupada nesse horário. Por favor, escolha outro horário ou quadra.');
        } else {
            // Se a quadra não estiver ocupada, enviar a requisição para criar a partida
            const novaPartida = {
                nome: document.getElementById('titulo').value,
                quadra: quadra,
                data: dataHora,
                email: document.getElementById('email').value,
                jogadores: []  // Começa com uma lista vazia de jogadores
            };

            try {
                const response = await fetch('http://localhost:3000/partidas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(novaPartida)
                });

                if (response.ok) {
                    alert('Partida agendada com sucesso!');
                    carregarPartidas();  // Atualiza a lista de partidas após a criação
                } else {
                    alert('Erro ao criar partida');
                }
            } catch (err) {
                console.error('Erro ao criar partida:', err);
            }
        }
    });

    // Carregar as partidas ao iniciar
    carregarPartidas();
});
