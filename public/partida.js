let timer;
let segundos = 0;
let minutos = 0;
let primeiroTempo = true;
let golsTime1 = 0;
let golsTime2 = 0;

function startTimer() {
    timer = setInterval(function () {
        segundos++;
        if (segundos == 60) {
            segundos = 0;
            minutos++;
        }

        document.getElementById('tempo').innerHTML = formatTime(minutos, segundos);
        updateProgressBar();
    }, 1000);

    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('resetBtn').disabled = false;
}

function pauseTimer() {
    clearInterval(timer);
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
}

function resetTimer() {
    clearInterval(timer);
    minutos = 0;
    segundos = 0;
    document.getElementById('tempo').innerHTML = "00:00";
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('resetBtn').disabled = true;
}

function mudarIntervalo() {
    if (primeiroTempo) {
        primeiroTempo = false;
        document.getElementById('intervalo').innerHTML = "Segundo Tempo";
        resetTimer();
    } else {
        primeiroTempo = true;
        document.getElementById('intervalo').innerHTML = "Primeiro Tempo";
        resetTimer();
    }
}

function formatTime(minutos, segundos) {
    return String(minutos).padStart(2, '0') + ':' + String(segundos).padStart(2, '0');
}

function updateProgressBar() {
    let totalTime = 1; 
    let currentTime = minutos + (segundos / 60);
    let progress = (currentTime / totalTime) * 100;
    document.getElementById('barraProgresso').style.width = progress + '%';
}

function incrementarGol(time) {
    if (time === 1) {
        golsTime1++;
    } else if (time === 2) {
        golsTime2++;
    }

    // Atualiza o placar no HTML
    document.getElementById("golsTime1").textContent = golsTime1;
    document.getElementById("golsTime2").textContent = golsTime2;
}