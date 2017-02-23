<?php

function cuandoSeExhibe($filename) {
    global $UPLOAD_PATH, $MINUTOS_POR_ANIMACION, $HORA_DE_APERTURA, $HORA_DE_CIERRE;

    $dateHoraApertura = new DateTime();
    $dateHoraCierre = new DateTime();

    $dateHoraApertura->add( new DateInterval("P1D") );
    $dateHoraApertura->setTime($HORA_DE_APERTURA, 0);
    $dateHoraCierre->setTime($HORA_DE_CIERRE, 0);

    // $sumBytes = 0;
    //
    // foreach ( scandir( $UPLOAD_PATH ) as $file ) {
    //     if ( substr($file, strrpos($file, ".") + 1) == "json" ) {
    //         $sumBytes += filesize( $UPLOAD_PATH . $file );
    //     }
    //     // echo $file . "<br>";
    // }
    //
    // $sumKB = $sumBytes / 1024;
    // $sumSeconds = floor($sumKB * $SECONDS_PER_KB);

    $sumMinutos = 0;

    foreach ( scandir( $UPLOAD_PATH ) as $file ) {
        if ( substr($file, strrpos($file, ".") + 1) == "json" ) {
            if ( $file != $filename ) {
                // echo $file . "<br>";
                $sumMinutos += $MINUTOS_POR_ANIMACION;
            } else {
                // echo "basta";
                break;
            }
        }
        // echo $file . "<br>";
    }

    $sumSeconds = $sumMinutos * 60;

    $horario = new DateTime();
    $horario->add(new DateInterval("PT{$sumSeconds}S"));

    $hoyOManiana = true; //true es hoy;

    if ( $horario >= $dateHoraCierre ) {
        $hoyOManiana = false;
        $diff = $dateHoraCierre->diff($horario, true);
        $horario = $dateHoraApertura;
        $horario->add( $diff );
    }

    return array(
        "horario" => $horario->format('H:i'),
        "minutos" => $sumSeconds / 60,
        "hoy" => $hoyOManiana
    );
}

function getCuando($arrResult) {
    $cuando = "en breve";

    if ( is_array( $arrResult ) ) {
        $cuando = "HOY a las ";

        if ( !$arrResult["hoy"] ) {
            $cuando = "MAÑANA a las ";
        }

        $cuando .= "<strong>";
        $cuando .= $arrResult["horario"];
        $cuando .= "</strong>";
    }

    return $cuando;
}
