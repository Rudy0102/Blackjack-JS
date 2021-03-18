<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scoreboard</title>
    <style>
        body{
            background-color: #2a5421;
        }
        .centered{
            text-align: center;
            font-size: 100%;
        }
        .centered table{
            margin: 0 auto; 
            text-align: left;
            border: #000 solid 1px;
            background-color: #aaa;
        }
        th,td{
            border: #000 solid 1px;
            padding: 10px;
        }
    </style>
</head>
<body>

<div class="centered">
<?php
    $host = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = 'tablica_wynikow';

    $mysqli=new mysqli($host,$username,$password,$dbname);

    $query = "SELECT nick,wynik FROM wyniki ORDER BY wynik LIMIT 100"; //or die($mysqli->error);
    $result = $mysqli->query($query);
    // $row = $result->fetch_array(MYSQLI_NUM);
    $miejsce=1;
    echo "<table>";
    echo "<tr><th>Miejsce</th><th>Nick</th><th>Wynik</th></tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo ("<td>".$miejsce."</td>");
        echo ("<td>".$row['nick']."</td>");
        echo ("<td>".$row['wynik']."</td>");
        echo "</tr>";
        $miejsce++;
    }
    echo "</table>"
?>
</div>

</body>
</html>