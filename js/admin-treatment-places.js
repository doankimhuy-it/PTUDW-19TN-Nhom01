const addLocationSubmit = document.getElementById("submit-add-location");

addLocationSubmit.onclick = function () {
  const name = document.getElementById("add-location-name").value;
  const capacity = Number.parseInt(document.getElementById("add-location-capacity").value);
  const currentAllocation = Number.parseInt(document.getElementById("add-location-current-allocation").value);
  const data = {
    name: name,
    capacity: capacity,
    currentAllocation: currentAllocation
  }
  console.log(data)
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/api/location/addLocation");
  xhr.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const res = JSON.parse(this.responseText);
      if (res.code == 0) {
        location.reload();
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

document.addEventListener('readystatechange', event => {
  // When window loaded (external resources are loaded too: `css`,`src`, etc...) 
  if (event.target.readyState === "complete") {
    console.log("LOADED");
    getLocationInfo();
  }
});

function getLocationInfo() {
  tableBody = document.getElementById("table-body");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/api/location/getLocationInfo");
  xhr.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log(this.responseText);
      const res = JSON.parse(this.responseText);
      if (res.code == 0) {
        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data[i]);
          const data = res.data[i];
          render(data, tableBody);
        }
      }
      else {
        alert(res.message);
      }
    }
  }
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.setRequestHeader("authorization", "Bearer " + localStorage.getItem("token"));
  xhr.send();
}

const render = (data, tableBody) => {
  const container = document.createElement("tr");

  const name = document.createElement("td");
  name.setAttribute("class", "name");
  name.appendChild(document.createTextNode(data.name));

  const capacity = document.createElement("td");
  capacity.setAttribute("class", "capacity");
  capacity.appendChild(document.createTextNode(data.capacity));

  const currentAllocation = document.createElement("td");
  currentAllocation.setAttribute("class", "current-allocation");
  currentAllocation.appendChild(document.createTextNode(data.currentAllocation));

  container.appendChild(name);
  container.appendChild(capacity);
  container.appendChild(currentAllocation);

  tableBody.appendChild(container);
}