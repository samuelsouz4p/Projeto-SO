// Função para copiar o código PIX
function copyPix() {
    const inputPix = document.getElementById("pixCode");
    inputPix.select();
    document.execCommand("copy");
    alert("Código PIX copiado!");
}

document.addEventListener("DOMContentLoaded", function () {
    const qrImage = document.querySelector(".qr-click");
    const overlay = document.getElementById("qr-overlay");

    qrImage.addEventListener("click", function () {
        overlay.classList.add("active");
    });

    overlay.addEventListener("click", function () {
        overlay.classList.remove("active");
    });
});