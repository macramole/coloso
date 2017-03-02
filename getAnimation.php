<?php
include("./constants.php");

$fileToOpen = null;
$fileToMail = null;
$CANT_FILES_UNTIL_MAIL = 2;
$cantFilesUntilMail = $CANT_FILES_UNTIL_MAIL;

foreach ( scandir( $UPLOAD_PATH ) as $file ) {
    if ( substr($file, strrpos($file, ".") + 1) == "json" ) {
        // echo $file . "<br>";
        $cantFilesUntilMail--;

        if ( $fileToOpen == null ) {
            $fileToOpen = $file;
        }
        if ( $cantFilesUntilMail == 0 ) {
            $fileToMail = $file;
            break;
        }
    }
}

if ( $fileToOpen != null ) {
    echo file_get_contents($UPLOAD_PATH . $fileToOpen);
    rename( $UPLOAD_PATH . $fileToOpen, $DONE_PATH . $fileToOpen );

    if ( $fileToMail != null ) {
        include("sendSegundoMail.php");
    }

} else {
    echo "nada";
}
