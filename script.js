const items = {
    "computer": 5,
    "iphone13": 999999,
    "axel": 1000,
    "cristian": 10,
    "quentin": 50,
    "guillaume": 2
}
let shop;
let cart;

function toggleDisplay(element, baseDisplay) {
    if (element.style.display === "none") {
        element.style.display = baseDisplay;
    }else {
        element.style.display = "none";
    }
}

function addToCart(itemName){
    itemCount = localStorage.getItem(itemName);
    if (itemCount == null){
        itemCount = 0;
    }
    itemCount++;
    localStorage.setItem(itemName, itemCount);
    setAllItemPrices();
}
function removeFromCart(itemName){
    itemCount = localStorage.getItem(itemName);
    if (itemCount == null){
        itemCount = 0;
    }
    if (itemCount > 0){
        itemCount--;
    }
    localStorage.setItem(itemName, itemCount);
    setAllItemPrices();
}
function removeAllFromCart(){
    localStorage.clear();
    window.location.reload(true);
}

function setItemPrice(itemName, itemPrice){ 
    let cartItem = document.getElementById(`${itemName}--cart`);
    
    if (localStorage.getItem(itemName) == null){
        localStorage.setItem(itemName, 0);
    }
    const itemQuantity = localStorage.getItem(itemName);
    const totalPrice = itemPrice * itemQuantity;

    console.log(itemName, itemQuantity, totalPrice);

    cartItem.querySelectorAll(".item-price")[0].innerHTML = `${itemPrice}euros * ${itemQuantity}`;
    cartItem.querySelectorAll(".item-total")[0].innerHTML = `${totalPrice}euros`;

    if (itemQuantity == 0){
        cartItem.style.display = "none";
    }else{
        cartItem.style.display = "";
    }

    return totalPrice;
}
function setAllItemPrices(){
    let total = 0;
    for (let itemName in items){
        const itemPrice = items[itemName];

        total += setItemPrice(itemName, itemPrice);
    }
    document.getElementById('total-price').innerHTML = `Total des Achats en Cours vaut : ${total}euros`;
}
function toggleCart(){

    toggleDisplay( shop, "flex");
    toggleDisplay( cart, "flex");

    setAllItemPrices();    
    return true;
}


document.addEventListener("DOMContentLoaded", function() {   
    
    shop = document.getElementById("shop");
    cart = document.getElementById("cart");
    
    let shopList = document.getElementById("shop-list");
    const shopTemplate = document.getElementById("TEMPLATE--shop");
    for (let itemName in items){
        const itemPrice = items[itemName];
        let itemTemplate = shopTemplate.cloneNode(true);
        itemTemplate.id = `${itemName}--shop`;
        itemTemplate.style = "";
        itemTemplate.innerHTML = itemTemplate.innerHTML.replaceAll("TEMPLATE", itemName);
        itemTemplate.querySelectorAll(".item-price")[0].innerHTML = `${itemPrice}euros`;
        shopList.appendChild(itemTemplate);
    }
    shopTemplate.remove();

    let cartList = document.getElementById("cart-list");
    const cartTemplate = document.getElementById("TEMPLATE--cart");
    for (let itemName in items){
        let itemTemplate = cartTemplate.cloneNode(true);
        itemTemplate.id = `${itemName}--cart`;
        itemTemplate.style = "";
        itemTemplate.innerHTML = itemTemplate.innerHTML.replaceAll("TEMPLATE", itemName);
        cartList.appendChild(itemTemplate);
    }
    cartTemplate.remove();
    
    let empty = document.getElementById("empty");
    empty.style.display = "none";

} );