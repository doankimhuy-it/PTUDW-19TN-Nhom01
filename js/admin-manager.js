//const users = require("../BE/models/user");

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

lockBtn = document.getElementById("lock-btn");
lockBtn.onclick = function() {
  // check which rows have been selected
  $("#admin-table > tbody > tr").each(function() {
    if ($(this).find(".checkbox").is(":checked")) {
      alert("HI");
      $(this).find(".account-status").text("Đã khóa");
      let username = $(this).find(".username").text();
      user = users.findOne({ username: username });
      if (user) {
        user.accountStatus = "locked";
      }
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
      alert(username);
      user = users.findOne({ username: username });
      if (user) {
        user.accountStatus = "open";
      }
    }
  });
}