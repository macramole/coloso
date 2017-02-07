<?php
include("./constants.php");

foreach ( scandir( $DONE_PATH ) as $file ) {
    if ( substr($file, strrpos($file, ".") + 1) == "json" ) {
        rename( $DONE_PATH . $file, $UPLOAD_PATH . $file );
    }
}

echo "ok";
