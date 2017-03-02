<?php
include("./constants.php");
include("./cuantoFalta.php");

$file = base64_decode($_GET["id"]);
$horarios = cuandoSeExhibe($file);
$cuando = getCuando($horarios);

$data = file_get_contents($UPLOAD_PATH . $file);
$data = json_decode($data);
?><!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Coloso</title>
        <link rel="stylesheet" href="css/coloso.css" media="screen">
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:600,700" rel="stylesheet">
        <meta name="viewport" content="user-scalable=no" />
        <style>
            body {
                margin-top: 1em;
            }
            h1 {
                font-weight: normal;
                letter-spacing: 1px;
            }
        </style>
    </head>
    <body>
        <div id="mainWrapper">
            <div id="content">
                <h1>Hola <?= $data->nombre ?>,</h1>
                <p>Tu animación se exhibirá <?= $cuando ?><p>
            </div>
        </div>
    </body>
</html>
