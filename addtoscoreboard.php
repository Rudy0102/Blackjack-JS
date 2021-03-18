<?php
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'tablica_wynikow';

$mysqli=new mysqli($host,$username,$password,$dbname);

$nick=$_GET['nick'];
$wynik=$_GET['wynik'];

$query = "INSERT INTO wyniki VALUES (NULL,'$nick','$wynik')";
$mysqli->query($query);
?>