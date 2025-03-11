const express = require('express');
const fs = require('fs');
const cors = require('cors');  // Importando o middleware CORS
const app = express();
const path = require('path');
const PORT = 3000;
const DATA_FILE = 'partidas.json';
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const dotenv = require('dotenv').config()

app.use(cors());  // Permite requisições de qualquer origem
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Função para ler o arquivo JSON
const lerPartidas = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Função para escrever no arquivo JSON
const salvarPartidas = (partidas) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(partidas, null, 2), 'utf8');
};

// Rota para listar todas as partidas
app.get('/partidas', (req, res) => {
    const partidas = lerPartidas();
    res.json(partidas);
});

// Rota para criar uma nova partida
app.post('/partidas', (req, res) => {
    const partidas = lerPartidas();
    const novaPartida = { 
        id: Date.now(), 
        ...req.body, 
        jogadores: [] 
    };
    const { email } = req.body
    const passLength = 3
    
    //Criando senha para passar para o email
    const passwordAccess = crypto.randomBytes(passLength).toString('hex').slice(0, 5)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    })
    
    transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject: `Dados para acesso à quadra`,
        html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #28a745; color: rgb(255, 255, 255);">
                    <h1 style="color: rgb(255, 255, 255);">Obrigado por usar nossos serviços!</h1> <hr>
                    <h3>Olá!! essa é a sua senha de acesso à quadra <i style="text-decoration: underline;">${passwordAccess}</i>, o acesso só será liberado com a senha!</h3>
                    <div style="display: flex; justify-content: center; align-items: center; font-size: 2vw;">
                        <img src="https://cdn-icons-png.flaticon.com/128/190/190411.png" alt="Logo" width="150" style="display: block; margin: auto; border-radius: 5px;">
                    </div>
                </div>`,
    })
    .then(() => {
        partidas.push(novaPartida);
        salvarPartidas(partidas);

        res.status(201).json(novaPartida);
    })
    .catch((err) => {
        console.log(err)
    }) 
});

// Rota para adicionar um jogador a uma partida
app.post('/partidas/:id/jogador', (req, res) => {
    const { id } = req.params;
    const { nome, telefone } = req.body;

    let partidas = lerPartidas();
    const partida = partidas.find(p => p.id == id);

    if (!partida) {
        return res.status(404).json({ message: 'Partida não encontrada' });
    }

    const novoJogador = { nome, telefone };
    partida.jogadores.push(novoJogador);

    salvarPartidas(partidas);
    res.status(201).json(novoJogador);
});

// Rota para remover um jogador de uma partida
app.delete('/partidas/:id/jogador/:telefone', (req, res) => {
    const { id, telefone } = req.params;

    let partidas = lerPartidas();
    const partida = partidas.find(p => p.id == id);

    if (!partida) {
        return res.status(404).json({ message: 'Partida não encontrada' });
    }

    const jogadorIndex = partida.jogadores.findIndex(j => j.telefone === telefone);
    
    if (jogadorIndex === -1) {
        return res.status(404).json({ message: 'Jogador não encontrado' });
    }

    partida.jogadores.splice(jogadorIndex, 1);
    salvarPartidas(partidas);
    res.status(200).json({ message: 'Jogador removido com sucesso' });
});

// Rota para remover uma partida pelo ID
app.delete('/partidas/:id', (req, res) => {
    let partidas = lerPartidas();
    const { id } = req.params;
    const index = partidas.findIndex(p => p.id == id);

    if (index !== -1) {
        partidas.splice(index, 1); // Remove a partida do array
        salvarPartidas(partidas); // Salva as alterações no arquivo JSON
        res.status(200).json({ message: "Partida removida com sucesso" });
    } else {
        res.status(404).json({ message: "Partida não encontrada" });
    }
});

//Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')))

//Configuração de rota principal
app.get('/', (req, res) => {
    res.sendFile('index.html')
})


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
