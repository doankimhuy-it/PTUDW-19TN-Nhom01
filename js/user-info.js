var fullname="NOT-INFORMATION";
var password="NOT-INFORMATION";
var email="NOT-INFORMATION";
var phoneNumber="NOT-INFORMATION";
var address="NOT-INFORMATION";
var day="N/A";
var month="N/A";
var year="N/A";
var balance="NOT-INFORMATION";
var paymentHistory="NOT-INFORMATION";
var gender="N/A";


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
        getUserInformation();
    }
});

function getUserInformation(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/api/authorization/userInformation"); 
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.responseText); 
            const res=JSON.parse(this.responseText);
            if(res.code==0){
                const data=JSON.parse(res.data);
                fullname=(data.fullname ? data.fullname : fullname);
                password=(data.password ? data.password : password);
                email=(data.email ? data.email : email);
                phoneNumber=(data.phoneNumber ? data.phoneNumber : phoneNumber);
                address=(data.address ? data.address : address);
                day=(data.day ? data.day : day);
                month=(data.month ? data.month : month);
                year=(data.year ? data.year : year);
                render();
            }
            else{
                // document.getElementById("error-notification").innerHTML=res.message;
            }
            
        }
    }
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("authorization", "Bearer "+localStorage.getItem("token"));
    xhr.send(); 
}

function render(){
    document.getElementById("name").innerHTML=fullname;
    document.getElementById("gender").innerHTML=gender;
    document.getElementById("pass").innerHTML=password;
    document.getElementById("email").innerHTML=email;
    document.getElementById("phoneNumber").innerHTML=phoneNumber;
    document.getElementById("address").innerHTML=address;
    document.getElementById("day").innerHTML=day;
    document.getElementById("month").innerHTML=month;
    document.getElementById("year").innerHTML=year;
    document.getElementById("balance").innerHTML=balance;
}