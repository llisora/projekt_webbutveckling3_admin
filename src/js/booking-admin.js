
/* 
Code by Lisa Bäcklin, Mittuniversitetet
Email: liba2103@student.miun.se
*/

"use strict";

let url = "https://studenter.miun.se/~liba2103/writeable/webb3/projekt/webservice/bookingapi.php";
const nameInput = document.getElementById("name");
const timeInput = document.getElementById("time");
const dateInput = document.getElementById("date");
const quantityInput = document.getElementById("quantity");
const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", createBooking);
window.onload = init;

function init() {
    //Läsa in kurser
    getReservation();
}

//Läsa in kurser från webtjänst
function getReservation() {
    fetch(url)

        .then(response => response.json())
        .then(data => writeBooking(data))
        .catch(err => console.log(err))

}

//Skriv ut kurser till DOM
function writeBooking(bookings) {
    const bookingEl = document.getElementById("bookinglist");
    bookingEl.innerHTML = "";

    //Skriver ut till tabellen och använder contenteditable för att kunna ändra dessa
    bookings.forEach(booking => {
        bookingEl.innerHTML +=
            `<tr><td id="name${booking.id}" contenteditable>${booking.name}</td> 
        <td id="time${booking.id}" contenteditable>${booking.time} </td>
        <td id="date${booking.id}" contenteditable>${booking.date} </td> 
        <td id="quantity${booking.id}" contenteditable>${booking.quantity}</a></td>
        <td><button data-id="${booking.id}" class="update">Ändra</button></td>
        <td><button data-id="${booking.id}" class="delete">Radera</button></td></tr>`
    });

    //Variabler för att hämta in knapparna för delete och update
    let deleteEl = document.getElementsByClassName("delete");
    let updateEl = document.getElementsByClassName("update");

    //Loopar igenom dessa och lägger på en eventlyssnare som vid klick anropar funktionerna
    //Deletecourse och updatecourse.
    for (let i = 0; i < deleteEl.length; i++) {
        deleteEl[i].addEventListener("click", deleteReservation);
        updateEl[i].addEventListener("click", updateReservation);
    }
}

//Radera kurs
function deleteReservation(event) {
    //Hämtar id
    let id = event.target.dataset.id;
    //Lägger på det id:et i urlen för att veta vilken som ska raderas
    fetch(url + "?id=" + id, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => getReservation())
        .catch(err => console.log(err))
}


//Uppdatera kurs
function updateReservation(event) {
    //hämtar id
    let id = event.target.dataset.id;
    //Läser in elementen för de olika värdena 
    let name = document.getElementById("name" + id).innerHTML;
    let time = document.getElementById("time" + id).innerHTML;
    let date = document.getElementById("date" + id).innerHTML;
    let quantity = document.getElementById("quantity" + id).innerHTML;

    //Skapar en json textsträng
    let jsonStr = JSON.stringify({
        id: id,
        name: name,
        time: time,
        date: date,
        quantity: quantity
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
            messageEl.innerHTML = "Bokning ändrad!";
            getReservation()
        })
        .catch(err => console.log(err))
}

//Lägg till kurs
function createBooking(event) {
    event.preventDefault();

    //Sparar värdena för de olika "inputs" som görs när man skapar en kurs
    let name = nameInput.value;
    let time = timeInput.value;
    let date = dateInput.value;
    let quantity = quantityInput.value;

    //Variabel som hämtar in elementet "message"
    let messageEl = document.getElementById("message");

    //Kontrollerar om det är tillräckligt med tecken, annars kommer felmeddelandet upp
    if (name.length > 0 && time.length > 0 && date.length > 0 && quantity.length > 0) {
        messageEl.innerHTML = "";


        //Skapar en json textsträng
        let jsonStr = JSON.stringify({
            name: name,
            time: time,
            date: date,
            quantity: quantity
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

//Rensa formulär 
function clearForm() {
    nameInput.value = "";
    timeInput.value = "";
    dateInput.value = "";
    quantityInput.value = "";

    getReservation();

}
