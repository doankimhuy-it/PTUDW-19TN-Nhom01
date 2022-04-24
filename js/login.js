let roleDropDown = document.getElementById("role");
let loginBtn = document.getElementById("submit-login");

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
}