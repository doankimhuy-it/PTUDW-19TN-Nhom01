

function switchGroupToProduct() {
    var GroupIDBtn = document.getElementById("sp-left-group-btn")
    var ProductIDBtn = document.getElementById("sp-left-product-btn")
    var groupTable = document.getElementById("necessaries-group")
    var productTable = document.getElementById("necessaries-product")
    GroupIDBtn.style.display = 'none';
    groupTable.style.display = 'none';
    ProductIDBtn.style.display = 'block';
    productTable.style.display = 'block';
}

function switchProductToGroup() {
    var ProductIDBtn = document.getElementById("sp-left-product-btn")
    var GroupIDBtn = document.getElementById("sp-left-group-btn")
    var groupTable = document.getElementById("necessaries-group")
    var productTable = document.getElementById("necessaries-product")
    GroupIDBtn.style.display = 'block';
    groupTable.style.display = 'block';
    ProductIDBtn.style.display = 'none';
    productTable.style.display = 'none';
}

function increaseNumberInProductTable() {
    var productNumber = document.getElementById("product-number")
    productNumber.setAttribute('value', productNumber.getAttribute('value') - 0 + 1)
}

function decreaseNumberInProductTable() {
    var productNumber = document.getElementById("product-number")
    if (productNumber.getAttribute('value') > 0) {
        productNumber.setAttribute('value', productNumber.getAttribute('value') - 1)
    }
}

let findPeopleBtn = document.getElementById("find-btn")
let findPeopleInp = document.getElementById("find-inp")

findPeopleBtn.onclick = () => {
    if (findPeopleInp.hasAttribute("hidden")) {
        findPeopleBtn.setAttribute("hidden", "");
        findPeopleInp.removeAttribute("hidden");
    }
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
        getNecessariesInformation();
    }
});

function getNecessariesInformation(){
    const rows=document.getElementById("necessaries-group");
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:8080/api/necessary/getAllNecessaries"); 
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.responseText); 
            const res=JSON.parse(this.responseText);
            if(res.code==0){
                var currentAdd=null;
                for(let i=0;i<res.data.length;i++){
                    if(i%3==0){
                        currentAdd=createNewRow(rows);
                    }
                    console.log(res.data[i]);
                    const data=res.data[i];
                    render(data, currentAdd);
                }
            }
            else{
                // document.getElementById("error-notification").innerHTML=res.message;
                alert(res.message);
            }
            
        }
    }
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("authorization", "Bearer "+localStorage.getItem("token"));
    xhr.send();
}

function createNewRow(rows){
    const row=document.createElement("div");
    row.className="flex-row d-flex justify-content-around py-5";
    rows.appendChild(row);
    return row;
}

function render(data, row){
    const container=document.createElement("div");
    container.className="group-items";
    container.id=data._id;

    const btn=document.createElement("button");
    btn.className="border border-1  btn btn-link";

    // console.log(btn.attributes);
    btn.click=function(){
        $('#fix-group-modal').modal({
            show: true
        });
    }
    console.log(document.getElementById("fix-group-modal"));
    btn.dataBsToggle="modal";
    btn.dataBsTarget="#fix-group-modal";
    btn["data-bs-toggle"]="modal";
    btn["data-bs-target"]="#fix-group-modal";

    const img=document.createElement("img");
    img.src="./img/product.png";
    img.alt="product";
    img.width="200";
    img.height="200";

    const description=document.createElement("div");
    description.className="group-items-description";
    
    const p1=document.createElement("p");
    const name=data.necessaryName ? data.necessaryName : "N/A";
    p1.appendChild(document.createTextNode(name));

    const p2=document.createElement("p");
    const price=data.price ? data.price : "N/A";
    p2.appendChild(document.createTextNode(price));

    description.appendChild(p1);
    description.appendChild(p2);

    btn.appendChild(img);
    btn.appendChild(description);

    container.appendChild(btn);
    row.appendChild(container);
}

const btnAddProduct=document.getElementById("add-product");

btnAddProduct.onclick=function(){
    const necessaryName=document.getElementById("product-name").value;
    const price=document.getElementById("product-price").value;
    const quantity=document.getElementById("numberOfThisProduct").placeholder;
    const unit="Cái";
    const description="OK";
    const data={
        necessaryName: necessaryName,
        price: price,
        quantity: quantity,
        unit: unit,
        description: description
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/necessary/addNecessary"); 
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.responseText); 
            const res=JSON.parse(this.responseText);
            if(res.code==0){
               location.reload();
            }
            else{
                // document.getElementById("error-notification").innerHTML=res.message;
                console.log(res.message);
                alert(res.message);
            }
            
        }
    }
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xhr.setRequestHeader("Content-type", "application/json");
    // const token=localStorage.getItem("token");
    // xhr.setRequestHeader("authorization", ("Bearer "+token));
    console.log(data);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("authorization", "Bearer "+localStorage.getItem("token"));
    xhr.send(JSON.stringify(data)); 
}