function login() {
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var message = document.getElementById("message");

    if (user === "admin" && pass === "1234") {
        message.innerHTML = "Login successful!";
        message.style.color = "green";
        document.body.style.backgroundColor = "lightgreen";
    } else {
        message.innerHTML = "Wrong username or password";
        message.style.color = "red";
        document.body.style.backgroundColor = "lightcoral";
    }

    // clear inputs after login
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function resetForm() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("message").innerHTML = "";

    // reset background color
    document.body.style.backgroundColor = "lightblue";
}