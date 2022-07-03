masterCheckbox = document.getElementById("master-checkbox");
masterCheckbox.onchange = () => {
  // get checked state of the "check all" box 
  let allChecked = masterCheckbox.checked;
  let aa = document.querySelectorAll("input[type=checkbox]:not(#master-checkbox)");
  for (let i = 0; i < aa.length; i++) {
    // set other checkboxes to same state as the "check all"
    aa[i].checked = allChecked;
  }
};

const setAccountStatus = (username, accountStatus) => {
  console.log("CALLED");
  const data = {
    username: username,
    accountStatus: accountStatus
  }
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/api/authorization/setAccountStatus");
  xhr.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log(this.responseText);
    }
  }
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.setRequestHeader("authorization", "Bearer " + localStorage.getItem("token"));
  xhr.send(JSON.stringify(data));
}

lockBtn = document.getElementById("lock-btn");
lockBtn.onclick = function () {
  // check which rows have been selected
  $("#admin-table > tbody > tr").each(function () {
    if ($(this).find(".checkbox").is(":checked")) {
      $(this).find(".account-status").text("Đã khóa");
      let username = $(this).find(".username").text();
      setAccountStatus(username, "locked");
    }
  });
}

unlockBtn = document.getElementById("unlock-btn");
unlockBtn.onclick = (e) => {
  // check which rows have been selected
  $("table > tbody > tr").each(function () {
    if ($(this).find(".checkbox").is(":checked")) {
      $(this).find(".account-status").text("Đang mở");
      let username = $(this).find(".username").text();
      setAccountStatus(username, "open");
    }
  });
}

const addPeopleSubmit = document.getElementById("submit-add-people");

addPeopleSubmit.onclick = function (e) {
  e.preventDefault();

  const idNumber = document.getElementById("add-people-id-number").value;
  const fullname = document.getElementById("add-people-fullname").value;
  const username = document.getElementById("add-people-username").value;
  const password = document.getElementById("add-people-password").value;
  let role;
  switch ($("#add-people-role").val()) {
    case "Full":
      role = "admin";
      break;
    case "Restricted":
      role = "manager";
      break;
    default:
      role = "user";
  }

  const data = {
    fullname: fullname,
    idNumber: idNumber,
    password: password,
    username: username,
    role: role,
    accountStatus: "open"
  }
  console.log(data)
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/api/authorization/createAdminOrMngr");
  xhr.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const res = JSON.parse(this.responseText);
      if (res.code == 0) {
        render(data);
      }
      else {
        alert(res.message);
      }

    }
  }

  xhr.setRequestHeader("Content-type", "application/json");
  xhr.setRequestHeader("authorization", "Bearer " + localStorage.getItem("token"));

  console.log(data);
  console.log(JSON.stringify(data))
  xhr.send(JSON.stringify(data));
}

tableBody = document.getElementById("table-body");

const render = (data) => {
  const container = document.createElement("tr");

  const checkboxContainer = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox");
  checkboxContainer.appendChild(checkbox);

  const fullnameContainer = document.createElement("td");
  fullnameContainer.setAttribute("class", "d-flex align-items-center");
  const ava = document.createElement("img");
  ava.setAttribute("src", "img/avatar.png");
  ava.setAttribute("alt", "Avatar");
  ava.setAttribute("width", "30");
  ava.setAttribute("height", "30");
  ava.setAttribute("class", "rounded-pill me-3");
  const fullname = document.createElement("span");
  fullname.setAttribute("class", "name");
  fullname.appendChild(document.createTextNode(data.fullname));
  fullnameContainer.appendChild(ava);
  fullnameContainer.appendChild(fullname);

  const username = document.createElement("td");
  username.setAttribute("class", "username");
  username.appendChild(document.createTextNode(data.username));

  const role = document.createElement("td");
  role.setAttribute("class", "role");
  role.appendChild(document.createTextNode($("#add-people-role").val()));

  const accountStatus = document.createElement("td");
  accountStatus.setAttribute("class", "accountStatus");
  accountStatus.appendChild(document.createTextNode("Đang mở"));

  container.appendChild(checkboxContainer);
  container.appendChild(fullnameContainer);
  container.appendChild(username);
  container.appendChild(role);
  container.appendChild(accountStatus);

  tableBody.appendChild(container);
}