const ul = document.querySelector("#cart-items");
const span = document.querySelector("#total");

let count = 0;
let total_pris = 0;
let cartItems = loadCartFromStorage(); 


function loadCartFromStorage() {
    let storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
}

function saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(cartItems));
}


cartItems.forEach(function(item) {
    add_to_cart(item.namn, item.pris, false); 
});

function isProductInCart(namn, pris) {
    return cartItems.some(function(item) {
        return item.namn === namn && item.pris === pris;
    });
}

function add_to_cart(namn, pris, saveToStorage = true) {
    console.log("namn: " + namn + "\npris: " + pris);
    let li = document.createElement("li");
    li.textContent = namn + " Pris: " + pris + "kr";
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Ta bort";
    removeBtn.addEventListener("click", function() {
        remove_from_cart(li, pris);
    });
    li.appendChild(removeBtn);
    ul.appendChild(li);
    count++;

    total_pris += pris;
    updateTotalPrice(); 

    cartItems.push({ namn: namn, pris: pris });

    if (saveToStorage) {
        saveCartToStorage(); 
    }
}


function remove_from_cart(li, pris) {
    if (li && li.parentNode === ul) {
        ul.removeChild(li);

        total_pris -= pris; 
        updateTotalPrice(); 

        
        cartItems = cartItems.filter(function(item) {
            return item.pris !== pris;
        });
        saveCartToStorage(); 
    }
}


function updateTotalPrice() {
    span.textContent = total_pris.toFixed(2); 
}
