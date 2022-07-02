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

$("form-login").submit(function(e){
    e.preventDefault();
    var form = $(this);
    const username=document.getElementById("username").value;

    const password=document.getElementById("password").value;
    const role=document.getElementById("role").value;
    const data={
        username: username,
        password: password,
        role: role
    }
    console.log(data);
    $.ajax({ 
         url   : "localhost:8080/api/authorization/login",
         type  : "POST",
         data  : JSON.stringify(data), // data to be submitted
         success: function(response){
            alert(response); // do what you like with the response
         }
    });
    return false;
 });
