<?php
include("./constants.php");
include("./cuantoFalta.php");

$ok = false;

date_default_timezone_set("America/Argentina/Buenos_Aires");

$json = file_get_contents('php://input');

//TODO: aca habría que agregarle seguridad, el usuario puede subir lo que quiera

$file = null;

if ( $json ) {
    $file = date('Ymd-His') . ".json";
    $fileWithPath = $UPLOAD_PATH . $file;
    file_put_contents($fileWithPath, $json);
    $ok = true;
} else {
    echo "error";
    exit();
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
    $arrResult["processing"] = cuandoSeExhibe($file);
}

include("./sendPrimerMail.php");

echo json_encode( $arrResult );
// {"ok":true,"processing":{"horario":"09:43","minutos":18.483333333333,"hoy":false}} //
