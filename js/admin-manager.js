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
  console.log(data);
  console.log(JSON.stringify(data))
  xhr.send(JSON.stringify(data));
}

lockBtn = document.getElementById("lock-btn");
lockBtn.onclick = function() {
  // check which rows have been selected
  $("#admin-table > tbody > tr").each(function() {
    if ($(this).find(".checkbox").is(":checked")) {
      $(this).find(".account-status").text("Đã khóa");
      let username = $(this).find(".username").text();
      setAccountStatus(username, "locked");
    }
  });
}

unlockBtn = document.getElementById("unlock-btn");
unlockBtn.onclick = () => {
  // check which rows have been selected
  $("table > tbody > tr").each(function () {
    if ($(this).find(".checkbox").is(":checked")) {
      $(this).find(".account-status").text("Đang mở");
      let username = $(this).find(".username").text();
      setAccountStatus(username, "open");
    }
  });
}