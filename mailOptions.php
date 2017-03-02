<?php
require 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;


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

// $mail->addAddress('ellen@example.com');               // Name is optional
// $mail->addReplyTo('info@example.com', 'Information');
// $mail->addCC('cc@example.com');
// $mail->addBCC('bcc@example.com');

// $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Coloso app // Horario de exhibición de tu animación';
