<?php
include("./constants.php");
$PROCESSING_THRESHOLD = 5; //en minutos

$SECONDS_PER_KB = 60; //cada K a cuantos minutos equivale

$HORA_DE_APERTURA = 9;
$HORA_DE_CIERRE = 16;

$dateHoraApertura = new DateTime();
$dateHoraCierre = new DateTime();

$dateHoraApertura->add( new DateInterval("P1D") );
$dateHoraApertura->setTime($HORA_DE_APERTURA, 0);
$dateHoraCierre->setTime($HORA_DE_CIERRE, 0);

$ok = false;

date_default_timezone_set("America/Argentina/Buenos_Aires");

$json = file_get_contents('php://input');

//TODO: aca habría que agregarle seguridad, el usuario puede subir lo que quiera

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
    $sumSeconds = floor($sumKB * $SECONDS_PER_KB);
    $horario = new DateTime();
    $horario->add(new DateInterval("PT{$sumSeconds}S"));

    $hoyOManiana = true; //true es hoy;

    if ( $horario >= $dateHoraCierre ) {
        $hoyOManiana = false;
        $diff = $dateHoraCierre->diff($horario, true);
        $horario = $dateHoraApertura;
        $horario->add( $diff );
    }

    $arrResult["processing"] = array(
        "horario" => $horario->format('H:i'),
        "minutos" => $sumSeconds / 60,
        "hoy" => $hoyOManiana
    );
}


echo json_encode( $arrResult );
// {"ok":true,"processing":{"horario":"09:43","minutos":18.483333333333,"hoy":false}} //
