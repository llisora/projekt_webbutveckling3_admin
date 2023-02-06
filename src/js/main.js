
/* 
Code by Lisa Bäcklin, Mittuniversitetet
Email: liba2103@student.miun.se
*/

"use strict";

let url = "https://studenter.miun.se/~liba2103/writeable/webb3/projekt/webservice/menyapi.php";
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const categoryInput = document.getElementById("category");
const submitBtn = document.getElementById("submit");

window.onload = init;

submitBtn.addEventListener("click", createFood);


function init() {
    //Läsa in kurser
    getFood();
}

//Läsa in kurser från webtjänst
function getFood() {
    fetch(url)

        .then(response => response.json())
        .then(data => writeMenu(data))
        .catch(err => console.log(err))
}


//Skriv ut kurser till DOM
function writeMenu(foods) {
    //Sparar alla olika element i variabler för att kunna skriva ut dessa på rätt ställe

    const starterEl = document.getElementById("starter");
    starterEl.innerHTML = "";
    const mainEl = document.getElementById("main");
    mainEl.innerHTML = "";
    const dessertEl = document.getElementById("dessert");
    dessertEl.innerHTML = "";
    const sodaEl = document.getElementById("soda");
    sodaEl.innerHTML = "";
    const beerEl = document.getElementById("beer");
    beerEl.innerHTML = "";
    const wineEl = document.getElementById("wine");
    wineEl.innerHTML = "";

    //Loopar igenom och kollar vilken kategori det är och skriver ut den på rätt ställe 
    //Contenteditable används för att kunna ändra
    foods.forEach(food => {
        if (`${food.category}` == "Förrätt") {
            starterEl.innerHTML +=
                `<tr><td id="name${food.id}" contenteditable>${food.name}</td> 
        <td id="description${food.id}" contenteditable>${food.description} </td>
        <td id="price${food.id}" contenteditable>${food.price} </td> 
        <td id="category${food.id}" contenteditable>${food.category}</a></td>
        <td><button data-id="${food.id}" class="update">Ändra</button></td>
        <td><button data-id="${food.id}" class="delete">Radera</button></td></tr>`
        } if (`${food.category}` == "Varmrätt") {
            mainEl.innerHTML +=
                `<tr><td id="name${food.id}" contenteditable>${food.name}</td> 
        <td id="description${food.id}" contenteditable>${food.description} </td>
        <td id="price${food.id}" contenteditable>${food.price} </td> 
        <td id="category${food.id}" contenteditable>${food.category}</a></td>
        <td><button data-id="${food.id}" class="update">Ändra</button></td>
        <td><button data-id="${food.id}" class="delete">Radera</button></td></tr>`
        }
        if (`${food.category}` == "Efterrätt") {
            dessertEl.innerHTML +=
                `<tr><td id="name${food.id}" contenteditable>${food.name}</td> 
        <td id="description${food.id}" contenteditable>${food.description} </td>
        <td id="price${food.id}" contenteditable>${food.price} </td> 
        <td id="category${food.id}" contenteditable>${food.category}</a></td>
        <td><button data-id="${food.id}" class="update">Ändra</button></td>
        <td><button data-id="${food.id}" class="delete">Radera</button></td></tr>`
        }
        if (`${food.category}` == "Alkoholfritt") {
            sodaEl.innerHTML +=
                `<tr><td id="name${food.id}" contenteditable>${food.name}</td> 
            <td id="description${food.id}" contenteditable>${food.description} </td>
            <td id="price${food.id}" contenteditable>${food.price} </td> 
            <td id="category${food.id}" contenteditable>${food.category}</a></td>
            <td><button data-id="${food.id}" class="update">Ändra</button></td>
            <td><button data-id="${food.id}" class="delete">Radera</button></td></tr>`
        }
        if (`${food.category}` == "Öl") {
            beerEl.innerHTML +=
                `<tr><td id="name${food.id}" contenteditable>${food.name}</td> 
            <td id="description${food.id}" contenteditable>${food.description} </td>
            <td id="price${food.id}" contenteditable>${food.price} </td> 
            <td id="category${food.id}" contenteditable>${food.category}</a></td>
            <td><button data-id="${food.id}" class="update">Ändra</button></td>
            <td><button data-id="${food.id}" class="delete">Radera</button></td></tr>`
        } if (`${food.category}` == "Vin") {
            wineEl.innerHTML +=
                `<tr><td id="name${food.id}" contenteditable>${food.name}</td> 
            <td id="description${food.id}" contenteditable>${food.description} </td>
            <td id="price${food.id}" contenteditable>${food.price} </td> 
            <td id="category${food.id}" contenteditable>${food.category}</a></td>
            <td><button data-id="${food.id}" class="update">Ändra</button></td>
            <td><button data-id="${food.id}" class="delete">Radera</button></td></tr>`
        }
    });

    //Variabler för att hämta in knapparna för delete och update
    let deleteEl = document.getElementsByClassName("delete");
    let updateEl = document.getElementsByClassName("update");

    //Loopar igenom dessa och lägger på en eventlyssnare som vid klick anropar funktionerna
    //Deletecourse och updatecourse.
    for (let i = 0; i < deleteEl.length; i++) {
        deleteEl[i].addEventListener("click", deleteFood);
        updateEl[i].addEventListener("click", updateFood);
    }

}

//Radera kurs
function deleteFood(event) {
    //Hämtar id
    let id = event.target.dataset.id;

    //Lägger på det id:et i urlen för att veta vilken som ska raderas
    fetch(url + "?id=" + id, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => getFood())
        .catch(err => console.log(err))
}

//Lägg till kurs
function createFood(event) {
    event.preventDefault();

    //Sparar värdena för de olika "inputs" som görs när man skapar en kurs
    let name = nameInput.value;
    let description = descriptionInput.value;
    let price = priceInput.value;
    let category = categoryInput.value;

    //Variabel som hämtar in elementet "message"
    let messageEl = document.getElementById("message");


    //Kontrollerar om det är tillräckligt med tecken, annars kommer felmeddelandet upp
    if (name.length > 0 && description.length > 0 && price.length > 0 && category.length > 0) {
        messageEl.innerHTML = "";

        //Skapar en json textsträng
        let jsonStr = JSON.stringify({
            name: name,
            description: description,
            price: price,
            category: category
        });
        //Skickar fetch-anrop med post-metod
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            //Rensa formuläret
            .then(data => clearForm())
            .catch(err => console.log(err))
    } else {
        messageEl.innerHTML = "Du måste fylla i alla fält!";
    }
}

//Uppdatera kurs
function updateFood(event) {
    //hämtar id
    let id = event.target.dataset.id;
    //Läser in elementen för de olika värdena 
    let name = document.getElementById("name" + id).innerHTML;
    let description = document.getElementById("description" + id).innerHTML;
    let price = document.getElementById("price" + id).innerHTML;
    let category = document.getElementById("category" + id).innerHTML;

    //Skapar en json textsträng
    let jsonStr = JSON.stringify({
        id: id,
        name: name,
        description: description,
        price: price,
        category: category
    });


    //Skickar fetch-anrop med put-metod
    fetch(url, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: jsonStr
    })
        .then(response => response.json())
        .then(data => {
            //Vid lyckat anrop - skriv ut meddelande.
            let messageEl = document.getElementById("message");
            messageEl.innerHTML = "Meny uppdaterad!";
            getFood()
        })
        .catch(err => console.log(err))
}







//Rensa formulär 
function clearForm() {
    nameInput.value = "";
    descriptionInput.value = "";
    priceInput.value = "";
    categoryInput.value = "";

    getFood();

}

