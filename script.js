const items = {
    "computer": ["Ordinateur", 5, 35],
    "iphone13": ["IPhone 13", 999999, 15],
    "axel": ["Axel Ga&euml;tan Robert Sevenet", 1000, 0],
    "cristian": ["Cristian", 10, 75],
    "quentin": ["Quentin Dofus", 50, 5],
    "guillaume": ["Guillaume", 2, 0]
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

function setItemPrice(itemName, itemPrice, itemDiscount){ 
    let cartItem = document.getElementById(`${itemName}--cart`);
    
    if (localStorage.getItem(itemName) == null){
        localStorage.setItem(itemName, 0);
    }
    const itemQuantity = localStorage.getItem(itemName);
    const totalPrice = itemPrice * itemQuantity;
    const finalPrice = totalPrice - (totalPrice * itemDiscount / 100);

    console.log(itemName, itemQuantity, totalPrice);

    cartItem.querySelector(".item-price").innerHTML = `${itemPrice}&euro; * ${itemQuantity}`;
    cartItem.querySelector(".item-total").innerHTML = `${totalPrice}&euro; - ${itemDiscount}% = ${finalPrice}&euro;`;

    if (itemQuantity == 0){
        cartItem.style.display = "none";
    }else{
        cartItem.style.display = "";
    }

    return finalPrice;
}
function setAllItemPrices(){
    let total = 0;
    for (let itemName in items){
        const itemPrice = items[itemName][1];
        const itemDiscount = items[itemName][2];

        total += setItemPrice(itemName, itemPrice, itemDiscount);
    }
    document.getElementById('total-price').innerHTML = `Prix Total : ${total}&euro;`;
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
        const properName = items[itemName][0];
        const itemPrice = items[itemName][1];
        let itemTemplate = shopTemplate.cloneNode(true);
        itemTemplate.id = `${itemName}--shop`;
        itemTemplate.style = "";
        itemTemplate.innerHTML = itemTemplate.innerHTML.replaceAll("TEMPLATE", itemName);
        itemTemplate.innerHTML = itemTemplate.innerHTML.replaceAll("NAME", properName);
        itemTemplate.querySelectorAll(".item-price")[0].innerHTML = `${itemPrice}&euro;`;
        shopList.appendChild(itemTemplate);
    }
    shopTemplate.remove();

    let cartList = document.getElementById("cart-list");
    const cartTemplate = document.getElementById("TEMPLATE--cart");
    for (let itemName in items){
        const properName = items[itemName][0];
        let itemTemplate = cartTemplate.cloneNode(true);
        itemTemplate.id = `${itemName}--cart`;
        itemTemplate.style = "";
        itemTemplate.innerHTML = itemTemplate.innerHTML.replaceAll("TEMPLATE", itemName);
        itemTemplate.innerHTML = itemTemplate.innerHTML.replaceAll("NAME", properName);
        cartList.appendChild(itemTemplate);
    }
    cartTemplate.remove();
    
    let empty = document.getElementById("empty");
    empty.style.display = "none";

} );