<?php
include_once("mailOptions.php"); //crea $mail;

$jsonData = json_decode($json);
$nombre = $jsonData->nombre;
$email = $jsonData->email;

$mail->addAddress($email, $nombre);     // Add a recipient

$cuando = getCuando( $arrResult["processing"] );
$link = $SERVER . "checkHorario.php?id=" . base64_encode($file);

$mail->Body = "
    <a href='http://doma.tv'><img src='http://www.doma.tv/wp-content/uploads/2016/06/logo-doma-60.png'></a>
    <h1>Hola $nombre!</h1>
    <p>Tu animación será exhibida $cuando.</p>
    <p>Podés revisar el horario cuando quieras desde <a href='$link'>este link</a></p>
";

$mail->send();

// if(!$mail->send()) {
//     echo 'Message could not be sent.';
//     echo 'Mailer Error: ' . $mail->ErrorInfo;
// } else {
//     echo 'Message has been sent';
// }
