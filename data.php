<?php
include("./constants.php");
$PROCESSING_THRESHOLD = 1; //en minutos

$SECONDS_PER_KB = 60; //cada K a cuantos minutos equivale

$ok = false;

$json = file_get_contents('php://input');

if ( $json ) {
    $file = $UPLOAD_PATH .  date('Ymd-His') . ".json";
    file_put_contents($file, $json);
    $ok = true;
}


$arrResult = array("ok" => $ok, "processing" => false);

if (file_exists($PROCESSING_FILE)) {
    $processing_date = DateTime::createFromFormat( 'U', filemtime($PROCESSING_FILE) );
    $hoy_date = DateTime::createFromFormat( 'U', date("U") );

    $diferencia_date = $processing_date->diff($hoy_date);
    $diferencia_minutos =  $diferencia_date->i;

    // echo "minutos de diferencia: " . $diferencia_date->i . "<br>";
    // echo "$PROCESSING_FILE was last modified: " . $processing_date->format("H:i:s");

    if ( $diferencia_minutos <= $PROCESSING_THRESHOLD ) {
        $arrResult["processing"] = true;
    }
}

if ( $ok && $arrResult["processing"] ) {
    $sumBytes = 0;

    foreach ( scandir( $UPLOAD_PATH ) as $file ) {
        if ( substr($file, strrpos($file, ".") + 1) == "json" ) {
            $sumBytes += filesize( $UPLOAD_PATH . $file );
        }
        // echo $file . "<br>";
    }

    $sumKB = $sumBytes / 1024;
    $countdown = gmdate("H:i:s", $sumKB * $SECONDS_PER_KB);
    $arrCountdown = split( ":", $countdown );
    $arrResult["processing"] = array(
        "hour" => $arrCountdown[0],
        "min" => $arrCountdown[1],
        "sec" => $arrCountdown[2]
    );

}


echo json_encode( $arrResult );
// {
//     "ok":true,
//     "processing":{"hour":"00","min":"02","sec":"43"} or false
// }
