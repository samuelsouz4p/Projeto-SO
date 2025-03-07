document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("error-message");

    if (email === "admin@example.com" && password === "123456") {
        window.location.href = "index.html";
    } else {
        errorMessage.textContent = "E-mail ou senha incorretos!";
    }
});
