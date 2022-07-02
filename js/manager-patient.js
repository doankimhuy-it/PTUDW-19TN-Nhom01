let findPeopleBtn = document.getElementById("find-people-btn")
let findPeopleInp = document.getElementById("find-people-inp")

findPeopleBtn.onclick = () => {
    if (findPeopleInp.hasAttribute("hidden")) {
        findPeopleBtn.setAttribute("hidden", "");
        findPeopleInp.removeAttribute("hidden");
    }
}

const relatingPeople=[];
const history=[];

let addRelatingPeople=document.getElementById("submit-add-more-related-people-btn");

const relatingPeopleDiv=document.getElementById("relatingPeople");

addRelatingPeople.onclick=function(){
    const name=document.getElementById("related-people-name").value;
    relatingPeople.push(name);
    const textNode=document.createTextNode(name);
    const node=document.createElement("div");
    node.className="relating-person";
    node.appendChild(textNode);
    relatingPeopleDiv.appendChild(node);
}