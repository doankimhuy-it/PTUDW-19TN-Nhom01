const createAdminBtn = document.getElementById("create-account-btn");

createAdminBtn.onclick = (e) => {
    console.log("CALLED");
    const idNumber = document.getElementById("id-number").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const fullname = document.getElementById("full-name").value;
    const phoneNumber = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const data = {
        idNumber: idNumber,
        username: username,
        password: password,
        fullname: fullname,
        phoneNumber: phoneNumber,
        email: email
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/authorization/createAdmin");
    xhr.onreadystatechange = function () { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.responseText);
            const res = JSON.parse(this.responseText);
            if (res.code == 0) {
                localStorage.setItem("token", res.data);
                localStorage.setItem("pageLoadTime", "loaded");
                console.log(localStorage.getItem("token"));
                document.location.href = "login.html"
            }
            else {
                document.getElementById("error-notification").innerHTML = res.message;
            }
        }
    }
    xhr.setRequestHeader("Content-type", "application/json");
    console.log(data);
    console.log(JSON.stringify(data))
    xhr.send(JSON.stringify(data));
}