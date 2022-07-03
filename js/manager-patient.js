let findPeopleBtn = document.getElementById("find-people-btn")
let findPeopleInp = document.getElementById("find-people-inp")

findPeopleBtn.onclick = () => {
    if (findPeopleInp.hasAttribute("hidden")) {
        findPeopleBtn.setAttribute("hidden", "");
        findPeopleInp.removeAttribute("hidden");
    }
}

const relatingPeople = [];
const history = [];

let addRelatingPeople = document.getElementById("submit-add-more-related-people-btn");

const relatingPeopleDiv = document.getElementById("relatingPeople");

addRelatingPeople.onclick = function () {
    const name = document.getElementById("related-people-name").value;
    relatingPeople.push(name);
    const textNode = document.createTextNode(name);
    const node = document.createElement("div");
    node.className = "relating-person";
    node.appendChild(textNode);
    relatingPeopleDiv.appendChild(node);
}

let addTreatmentHistory = document.getElementById("add-treatment-history-btn");

const historyTreatmentDiv = document.getElementById("treatmentHistories");

const today = new Date();
var month = "" + (today.getMonth() + 1);
if (month.length == 1) {
    month = "0" + month;
}

var day = "" + today.getDate();
if (day.length == 1) {
    day = "0" + day;
}
const todayString = today.getFullYear() + '-' + month + '-' + day;
console.log(todayString);
document.getElementById("add-treatment-history-date").value = todayString;

addTreatmentHistory.onclick = function () {
    console.log("called");
    createTreatmentHistoryRecord();
    // document.getElementById("add-treatment-history-date").value;
    document.getElementById("add-treatment-history-status").value = "f0";
    document.getElementById("add-treatment-history-place").value = "q1";
}

function createTreatmentHistoryRecord() {
    const time = document.getElementById("add-treatment-history-date").value;
    console.log(time);
    console.log(document.getElementById("add-treatment-history-date"));

    const status = document.getElementById("add-treatment-history-status").value;
    console.log(status);
    const place = document.getElementById("add-treatment-history-place").value;
    console.log(place);

    if (!time || !status || !place) {
        return;
    }
    const status2 = status.replace("f", "F");
    const container = document.createElement("div");
    const textNode = document.createTextNode(time + " " + status + " " + place);
    container.appendChild(textNode);
    historyTreatmentDiv.appendChild(container);

    const dayElements = time.split("-");
    const data = {
        status: status2,
        medicalCenter: place,
        time: {
            day: dayElements[2],
            month: dayElements[1],
            year: dayElements[0]
        }
    };

    history.push(data);
}

const addPeopleSubmit = document.getElementById("submit-add-people");

addPeopleSubmit.onclick = function () {
    const idNumber = document.getElementById("add-people-id").value;
    const fullname = document.getElementById("add-people-name").value;
    const password = "123";
    const role = "user";
    const dayOfBirth = document.getElementById("add-people-birthday").value;
    const dayOfBirthElements = dayOfBirth.split("-");
    const gender = (document.getElementById("add-people-gender").value === "1" ? "MALE" : "FEMALE");
    const status = document.getElementById("add-people-status").value;
    const status2 = status.replace("f", "F");
    const address = document.getElementById("add-people-address").value;
    const medicalCenter = document.getElementById("add-people-treatment-place").value;
    const data = {
        fullname: fullname,
        idNumber: idNumber,
        password: password,
        role: role,
        dayOfBirth: {
            day: dayOfBirthElements[2],
            month: dayOfBirthElements[1],
            year: dayOfBirthElements[0],
        },
        gender: gender,
        status: status2,
        address: address,
        medicalCenter: medicalCenter,
        history: history,
        // relatingPeople: relatingPeople
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/authorization/register");
    xhr.onreadystatechange = function () { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.responseText);
            const res = JSON.parse(this.responseText);
            if (res.code == 0) {
                location.reload();
            }
            else {
                // document.getElementById("error-notification").innerHTML=res.message;
                alert(res.message);
            }

        }
    }
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xhr.setRequestHeader("Content-type", "application/json");
    // const token=localStorage.getItem("token");
    // xhr.setRequestHeader("authorization", ("Bearer "+token));

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("authorization", "Bearer " + localStorage.getItem("token"));

    console.log(data);
    console.log(JSON.stringify(data))
    xhr.send(JSON.stringify(data));
}

document.addEventListener('readystatechange', event => {

    // When HTML/DOM elements are ready:
    if (event.target.readyState === "interactive") {   //does same as:  ..addEventListener("DOMContentLoaded"..
        // alert("hi 1");
    }

    // When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
    if (event.target.readyState === "complete") {
        // alert("hi 2");

        console.log("LOADED");
        // console.log(document.cookie);
        getAdminMngrInfo();
    }
});

function getAdminMngrInfo() {
    const peopleField = document.getElementById("people-field");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/api/authorization/patientsInformation");
    xhr.onreadystatechange = function () { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.responseText);
            const res = JSON.parse(this.responseText);
            if (res.code == 0) {

                for (let i = 0; i < res.data.length; i++) {
                    console.log(res.data[i]);
                    const data = res.data[i];
                    render(data, i, peopleField);
                }
            }
            else {
                // document.getElementById("error-notification").innerHTML=res.message;
                alert(res.message);
            }

        }
    }
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("authorization", "Bearer " + localStorage.getItem("token"));
    xhr.send();
}

function render(data, i, peopleField) {
    const container = document.createElement("tr");

    const stt = document.createElement("th");
    stt.scope = "row";
    const sttNode = document.createTextNode(i);
    stt.appendChild(sttNode);

    const name = document.createElement("td");
    const ava = document.createElement("img");
    ava.src = "img/avatar.png";
    ava.alt = "Avatar";
    ava.width = "30";
    ava.height = "30";
    ava.className = "rounded-pill me-2";
    const user = document.createElement("a");
    user.className = "name";
    // user.data-bs-toggle="modal";
    // user.data-bs-target="#add-people-modal";
    const username = document.createTextNode(data.fullname);
    user.appendChild(username);
    name.appendChild(ava);
    name.appendChild(user);

    const year = document.createElement("td");
    const yearString = data.dayOfBirth ? data.dayOfBirth.year : "N/A";

    const yearOfBirth = document.createTextNode(yearString);
    year.appendChild(yearOfBirth);

    const status = document.createElement("td");
    const statusText = document.createTextNode(data.status);
    status.appendChild(statusText);

    const medicalCenter = document.createElement("td");
    const medicalString = data.medicalCenter ? data.medicalCenter.replace("q", "TTYT Quận ") : "N/A";
    const medicalCenterText = document.createTextNode(medicalString);
    medicalCenter.appendChild(medicalCenterText);

    container.appendChild(stt);
    container.appendChild(name);
    container.appendChild(year);
    container.appendChild(status);
    container.appendChild(medicalCenter);

    peopleField.appendChild(container);
}