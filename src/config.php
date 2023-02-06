<?php
session_start();
$devmode = true;

if ($devmode) {
    // Aktivera felrapportering
    // Dessa ska tas bort om webbsidan ska läggas upp "på riktigt", men jag låter dessa vara kvar nu under inlämning.
    error_reporting(-1);
    ini_set("display_errors", 1);
}
?>