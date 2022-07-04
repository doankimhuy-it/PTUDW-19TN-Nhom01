function switchGroupToProduct() {
    var GroupIDBtn = document.getElementById("sp-left-group-btn")
    var ProductIDBtn = document.getElementById("sp-left-product-btn")
    var groupTable = document.getElementById("necessaries-group")
    var productTable = document.getElementById("necessaries-product")
    GroupIDBtn.style.display = 'none';
    groupTable.style.display = 'none';
    ProductIDBtn.style.display = 'block';
    productTable.style.display = 'block';
    getNecessariesInformation();
}
var groups=[];

function getGroupInformation(){
    console.log("getNecessaries called");
    const rows=document.getElementById("necessaries-group");
    var xhr = new XMLHttpRequest();
    console.log(rows);
    rows.innerHTML="";
    xhr.open("GET", "http://localhost:8080/api/necessary/getAllGroupNecessaries"); 
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.responseText); 
            const res=JSON.parse(this.responseText);
            if(res.code==0){
                var currentAdd=null;
                groups=res.data;
                for(let i=0;i<res.data.length;i++){
                    if(i%3==0){
                        currentAdd=createNewRow(rows);
                    }
                    
                    const data=res.data[i];
                    render(data, currentAdd, i);
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

function switchProductToGroup() {
    var ProductIDBtn = document.getElementById("sp-left-product-btn")
    var GroupIDBtn = document.getElementById("sp-left-group-btn")
    var groupTable = document.getElementById("necessaries-group")
    var productTable = document.getElementById("necessaries-product")
    GroupIDBtn.style.display = 'block';
    groupTable.style.display = 'block';
    ProductIDBtn.style.display = 'none';
    productTable.style.display = 'none';
    getGroupInformation();
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

var products=[];

$(document).ready(function(){
    getGroupInformation();
});

function getGroupInformation(){
    console.log("getGroups called");
    const rows=document.getElementById("necessaries-group");
    var xhr = new XMLHttpRequest();
    console.log(rows);
    rows.innerHTML="";
    xhr.open("GET", "http://localhost:8080/api/necessary/getAllGroupNecessaries"); 
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.responseText); 
            const res=JSON.parse(this.responseText);
            if(res.code==0){
                var currentAdd=null;
                products=res.data;
                for(let i=0;i<res.data.length;i++){
                    if(i%3==0){
                        currentAdd=createNewRow(rows);
                    }
                    
                    const data=res.data[i];
                    renderGroup(data, currentAdd);
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

function getNecessariesInformation(){
    console.log("getNecessaries called");
    const rows=document.getElementById("necessaries-product");
    var xhr = new XMLHttpRequest();
    console.log(rows);
    rows.innerHTML="";
    xhr.open("GET", "http://localhost:8080/api/necessary/getAllNecessaries"); 
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.responseText); 
            const res=JSON.parse(this.responseText);
            if(res.code==0){
                var currentAdd=null;
                products=res.data;
                for(let i=0;i<res.data.length;i++){
                    if(i%3==0){
                        currentAdd=createNewRow(rows);
                    }
                    
                    const data=res.data[i];
                    renderProduct(data, currentAdd);
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

function renderProduct(data, row){
    const container=document.createElement("div");
    container.className="product-items";

    const btn=document.createElement("button");
    btn.className="border border-1  btn btn-link";

    const dummyBtn=document.getElementById("dummy-btn-product");
    console.log(dummyBtn);
    btn.onclick=function(){
        document.getElementById("fix-product-name").innerHTML=data.necessaryName;
        document.getElementById("product-price-fix").value=data.price;
        document.getElementById("numberProduct").placeholder=data.quantity;
        console.log("CALLED");
        dummyBtn.click();
    }

    const img=document.createElement("img");
    img.src="./img/product.png";
    img.alt="product";
    img.width="200";
    img.height="200";

    const description=document.createElement("div");
    description.className="product-items-description";
    
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

function addNecessary(){
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
    console.log(data);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("authorization", "Bearer "+localStorage.getItem("token"));
    xhr.send(JSON.stringify(data)); 
}

var productInGroupAdd=[];

const btnAddNecessaryToGroup=document.getElementById("add-necessary-to-group");
console.log(btnAddNecessaryToGroup);

btnAddNecessaryToGroup.onclick=function(){
    console.log("CALLED 2");
    const necessaryId=document.getElementById("product-in-group-name").value;
    const quantity=document.getElementById("number-of-product-in-group").placeholder;
    if(!necessaryId || !quantity || !(necessaryId.length>0)){
        return;
    }
    productInGroupAdd.push({
        necessaryId: necessaryId,
        quantity: quantity
    });
    const container=document.getElementById("container-necessary-in-group");
    const textNode=document.createTextNode(necessaryId+" "+quantity);
    const item=document.createElement("div");
    item.appendChild(textNode);
    container.appendChild(item);
}

function addGroup(){
    const groupName=document.getElementById("group-name").value;
    const price=document.getElementById("group-price").value;
    const groupQuantity=document.getElementById("numberOfGroup").placeholder;
    const data={
        groupName: groupName,
        price: price,
        groupQuantity: groupQuantity,
        necessariesList: productInGroupAdd
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/necessary/addGroupNecessaries"); 
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

const btnAddProduct=document.getElementById("add-product");
const btnAddGroup=document.getElementById("add-group");

btnAddGroup.onclick=addGroup;
btnAddProduct.onclick=addNecessary;

var globalPlus;
var globalMinus;

function renderFixGroupNecessaries(item){
    const container=document.createElement("div");
    const insideContainer=document.createElement("div");
    insideContainer.className="row";
    const infoContainer=document.createElement("div");
    infoContainer.className="info";

    const plus=document.createElement("button");
    plus.className="adjust";
    plus.type="button";
    plus.id=("plus-"+item.necessaryId._id);
    
    const p1=document.createElement("p");
    p1.className="plus";
    p1.innerHTML="+";

    plus.appendChild(p1);
    

    const text=document.createElement("input");
    text.type="text";
    text.id=item.necessaryId._id;
    text.placeholder="2";
    text.size="2";
    text.className="form-control quantity";

    const minus=document.createElement("button");
    // minus.onclick=decrease(item.necessaryId);
    minus.className="adjust";
    minus.type="button";
    minus.id=("minus-"+item.necessaryId._id);
    const p2=document.createElement("p");
    p2.className="minus";
    p2.innerHTML="-";
    minus.appendChild(p2);

    infoContainer.appendChild(plus);
    infoContainer.appendChild(text);
    infoContainer.appendChild(minus);

    const name2=document.createElement("p");
    name2.className="name";
    name2.innerHTML=item.necessaryId.necessaryName;

    insideContainer.appendChild(infoContainer);
    insideContainer.appendChild(name2);

    container.appendChild(insideContainer);
    return container;
}

function increase(id) {
    console.log(id);
    var text;

    text = document.getElementById(id)
    console.log(text);
    text.placeholder = parseInt(text.placeholder) + 1
}

function decrease(id) {
    var text;
    text = document.getElementById(id)
    var res;
    res = parseInt(text.placeholder) - 1
    if (res < 0) return
    text.placeholder = parseInt(text.placeholder) - 1
}

function getGroupInformation2(id){
    const data={    
        groupId: id
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/necessary/getGroup"); 
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.responseText); 
            const res=JSON.parse(this.responseText);
            if(res.code==0){
               // location.reload();
               const groupName=res.data.groupName ? res.data.groupName : "N/A";
               document.getElementById("fix-group-name").innerHTML=groupName;

               const container=document.getElementById("container-222");
               for(let i=0;i<res.data.necessariesList.length;i++){
                    container.appendChild(renderFixGroupNecessaries(res.data.necessariesList[i]));
                    const id222=res.data.necessariesList[i].necessaryId._id;
                    document.getElementById("plus-"+id222).onclick=function(){increase(id222)};
                    document.getElementById("minus-"+id222).onclick=function(){decrease(id222)}; 
                }

            }
            else{
                // document.getElementById("error-notification").innerHTML=res.message;
                console.log(res.message);
                alert(res.message);
            }
            
        }
    }
    console.log(data);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("authorization", "Bearer "+localStorage.getItem("token"));
    xhr.send(JSON.stringify(data));
}

function renderGroup(data, row){
    const container=document.createElement("div");
    container.className="group-items";

    const btn=document.createElement("button");
    btn.className="border border-1  btn btn-link";

    const dummyBtn=document.getElementById("dummy-btn-group");
    btn.onclick=function(){
        getGroupInformation2(data._id);
        dummyBtn.click();
    }

    const img=document.createElement("img");
    img.src="./img/product.png";
    img.alt="product";
    img.width="200";
    img.height="200";

    const description=document.createElement("div");
    description.className="group-items-description";
    
    const p1=document.createElement("p");
    const name=data.groupName ? data.groupName : "N/A";
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