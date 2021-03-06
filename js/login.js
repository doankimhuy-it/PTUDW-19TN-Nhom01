

let roleDropDown = document.getElementById("role");
/* let loginBtn = document.getElementById("submit-login");

loginBtn.onclick = () => {
    let dest = "";

    let role = roleDropDown.value;

    switch (role) {
        case "admin":
            dest = "admin-manager.html";
            break;
        case "manager":
            dest = "manager-patient.html";
            break;
        case "user":
            dest = "user-info.html";
            break;
    }

    document.location.href = dest;
} */

const submitLogin = document.getElementById("submit-login");

submitLogin.onclick = function (e) {
    console.log("CALLED");
    const idNumber = document.getElementById("id-number").value;

    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const data = {
        idNumber: idNumber,
        password: password,
        role: role
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/authorization/login");
    xhr.onreadystatechange = function () { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.responseText);
            const res = JSON.parse(this.responseText);
            if (res.code == 0) {
                // localStorage.put("token", res.data);
                localStorage.setItem("token", res.data);
                console.log(localStorage.getItem("token"));
                let dest = "";

                let role = roleDropDown.value;
                switch (role) {
                    case "admin":
                        dest = "admin-manager.html";
                        break;
                    case "manager":
                        dest = "manager-patient.html";
                        break;
                    case "user":
                        dest = "user-info.html";
                        break;
                }
                document.location.href = dest;
            }
            else {
                document.getElementById("error-notification").innerHTML = res.message;
            }

        }
    }
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-type", "application/json");
    // xhr.setRequestHeader("authorization", ("Bearer "+token))
    console.log(data);
    console.log(JSON.stringify(data))
    xhr.send(JSON.stringify(data));
}
