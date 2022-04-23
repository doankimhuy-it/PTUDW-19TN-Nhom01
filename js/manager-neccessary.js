function switchGroupToProduct() {
    var GroupIDBtn = document.getElementById("sp-left-group-btn")
    var ProductIDBtn = document.getElementById("sp-left-product-btn")
    var groupTable = document.getElementById("neccessary-group")
    var productTable = document.getElementById("neccessary-product")
    GroupIDBtn.style.display = 'none';
    groupTable.style.display = 'none';
    ProductIDBtn.style.display = 'block';
    productTable.style.display = 'block';
}

function switchProductToGroup() {
    var ProductIDBtn = document.getElementById("sp-left-product-btn")
    var GroupIDBtn = document.getElementById("sp-left-group-btn")
    var groupTable = document.getElementById("neccessary-group")
    var productTable = document.getElementById("neccessary-product")
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