<?php
include("./constants.php");

$fileToOpen = null;

foreach ( scandir( $UPLOAD_PATH ) as $file ) {
    if ( substr($file, strrpos($file, ".") + 1) == "json" ) {
        // echo $file . "<br>";
        $fileToOpen = $file;
        break;
    }
}

if ( $fileToOpen != null ) {
    echo file_get_contents($UPLOAD_PATH . $fileToOpen);
    rename( $UPLOAD_PATH . $fileToOpen, $DONE_PATH . $fileToOpen );
    
    // if ( isset($_GET['do']) ) {
    //     // print "doing...";
    // }


} else {
    echo "nada";
}
