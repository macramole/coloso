<?php
include_once("mailOptions.php"); //crea $mail;

$ENVIAR_EMAIL = false;

if ( !$ENVIAR_EMAIL ) {
    exit();
}

$jsonData = json_decode(file_get_contents($UPLOAD_PATH . $fileToMail));
$nombre = $jsonData->nombre;
$email = $jsonData->email;

$mail->addAddress($email, $nombre);     // Add a recipient

$minutos = ($CANT_FILES_UNTIL_MAIL * $MINUTOS_POR_ANIMACION) . '';

$link = $SERVER . "checkHorario.php?id=" . base64_encode($file);

$mail->Body = "
    <a href='http://doma.tv'><img src='http://www.doma.tv/wp-content/uploads/2016/06/logo-doma-60.png'></a>
    <h1>Hola $nombre!</h1>
    <p>Tu animación será exhibida en $minutos minutos.</p>
    <p>Podés revisar el horario cuando quieras desde <a href='$link'>este link</a></p>
";

// if ( $email != "asd@asd.com") {
    $mail->send();
    // echo "sent to $email";

// }



// if(!$mail->send()) {
//     echo 'Message could not be sent.';
//     echo 'Mailer Error: ' . $mail->ErrorInfo;
// } else {
//     echo 'Message has been sent';
// }
