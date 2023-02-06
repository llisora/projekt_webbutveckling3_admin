<?php
/* 
Code by Lisa Bäcklin, Mittuniversitetet
Email: liba2103@student.miun.se
*/
?>
<?php
include("config.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <title>Admin - meny</title>
</head>

<?php
//Sessionsvariabel
if (!isset($_SESSION['username'])) {
    header("Location: index.php");
}
?>

<?php
//Om användaren klickat på logga ut 
if (isset($_GET["logout"])) {
    session_destroy();
    header("Location: index.php");
}
?>

<body>
    <header>
        <h1>Admin - Ändra meny</h1>
        <nav>
            <ul>
                <li><a href="admin.php">ÄNDRA MENYN</a></li>
                <li><a href="booking-admin.html">HANTERA BOKNINGAR</a></li>
                <li> <a href="admin.php?logout">LOGGA UT</a></li>
            </ul>
        </nav>
    </header>

    <div class="container">

        <h2>Meny för mat och dryck</h2>
        <p>Klicka i den kolumn du vill ändra för att ändra. Spara detta genom att klicka på "ändra"-knappen.</p>


        <!--Tabell för meny-->
        <div class="table">
            <h3>Mat</h3>
            <table>
                <thead>
                    <tr>
                        <th>Maträtt</th>
                        <th>Beskrivning</th>
                        <th>Pris</th>
                        <th>Kategori</th>
                        <th>Ändra</th>
                        <th>Radera</th>
                    </tr>
                </thead>
                <!--Här skrivs alla olika kategorier ut-->
                <tbody id="starter">



                </tbody>
                <tbody id="main">



                </tbody>
                <tbody id="dessert">


                </tbody>
            </table>

            <!--Tabell för dryck-->
            <h3>Dryck</h3>
            <table>
                <thead>
                    <tr>
                        <th>Dryck</th>
                        <th>Beskrivning</th>
                        <th>Pris</th>
                        <th>Kategori</th>
                        <th>Ändra</th>
                        <th>Radera</th>
                    </tr>
                </thead>
                <!--Här skrivs alla olika kategorier ut-->
                <tbody id="soda">


                </tbody>
                <tbody id="beer">


                </tbody>
                <tbody id="wine">


                </tbody>
            </table>
        </div>
        <h2>Lägg till i menyn</h2>
        <!--Skriver ut meddelande-->
        <div class="message">
            <span id="message"></span>
        </div>
        <!--Formulär för att lägga till kurs-->
        <div class="row">
            <div class="column">
                <form id="form">
                    <label for="name">Namn:</label>
                    <br>
                    <input type="text" name="name" id="name">
                    <br>
                    <label for="description">Beskrivning</label>
                    <br>
                    <input type="text" name="description" id="description">
                    <br>
                </form>
            </div>

            <div class="column">
                <label for="price">Pris</label>
                <br>
                <input type="number" name="price" id="price">
                <br>
                <label for="category">Kategori</label>
                <br>
                <select name="category" id="category">
                    <option value="Förrätt">Förrätt</option>
                    <option value="Varmrätt">Varmrätt</option>
                    <option value="Efterrätt">Efterrätt</option>
                    <option value="Alkoholfritt">Alkoholfritt</option>
                    <option value="Öl">Öl</option>
                    <option value="Vin">Vin</option>
                </select>
                <br>
            </div>
        </div>

        <div class="button">
            <input type="button" value="Lägg till i menyn" id="submit">
        </div>
    </div>

    <!--Container end-->
    <script src="js/main.js"></script>
</body>

</html>