const ul = document.querySelector("#cart-items");
const span = document.querySelector("#total");

let count = 0;
let total_pris = 0;

function add_to_cart(namn, pris){
    console.log("namn: " + namn + "\npris: " + pris)
    let li = document.createElement("li");
    li.textContent= namn + " Pris: " + pris + "kr";
    let removeBtn = document.createElement("button");   
    removeBtn.textContent = "Ta bort";
    removeBtn.addEventListener("click", function() {
        remove_from_cart(li);
    });
    li.appendChild(removeBtn);
    ul.appendChild(li);
    count++;

    total_pris += pris;

    let fält=[];
    let json = window.localStorage.getItem("product");
    if (json){
        fält = JSON.parse(json)
    }

    let obj = {
        namn: namn,
        pris: pris,
    }
    fält.push(obj);
    json = JSON.stringify(fält);
    window.localStorage.setItem("product",json);

    
    span.textContent = total_pris.toFixed(2);
    


}

function remove_from_cart(li) {
    if (li && li.parentNode === ul) {
        ul.removeChild(li);
        
        total_pris -= pris;
        let fält = [];
        let json = window.localStorage.getItem("product");
        span.textContent = total_pris.toFixed(2);
        if (json) {
            fält = JSON.parse(json)
        }
    }
    let index = Array.from(ul.children).indexOf(li);
    if (index >= 0 && index < fält.length) {
        fält.splice(index, 1); 
        json = JSON.stringify(fält);
        window.localStorage.setItem("product", json);


    }

}   


