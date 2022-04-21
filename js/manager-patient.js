let findPeopleBtn = document.getElementById("find-people-btn")
let findPeopleInp = document.getElementById("find-people-inp")

findPeopleBtn.onclick = () => {
    if (findPeopleInp.hasAttribute("hidden")) {
        findPeopleBtn.setAttribute("hidden", "");
        findPeopleInp.removeAttribute("hidden");
    }
}