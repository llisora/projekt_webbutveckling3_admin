<?php
/* 
Code by Malin Larsson, Mittuniversitetet
Email: malin.larsson@miun.se
*/
?>
<?php
//aktivera sessioner
session_start();

$devmode = true;

if ($devmode) {
    // Aktivera felrapportering
    error_reporting(-1);
    ini_set("display_errors", 1);
}