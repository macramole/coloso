<?php
require 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;

$jsonData = json_decode($json);
$nombre = $jsonData->nombre;
$email = $jsonData->email;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->CharSet = 'UTF-8';

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'ssl://mail.parleboo.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'localhost@parleboo.com';                 // SMTP username
$mail->Password = '111asd222';                           // SMTP password
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to

$mail->setFrom('localhost@parleboo.com', 'Coloso');
$mail->addAddress($email, $nombre);     // Add a recipient

// $mail->addAddress('ellen@example.com');               // Name is optional
// $mail->addReplyTo('info@example.com', 'Information');
// $mail->addCC('cc@example.com');
// $mail->addBCC('bcc@example.com');

// $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Coloso app // Horario de exhibición de tu animación';

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
