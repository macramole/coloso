<?php

function cuandoSeExhibe($filename) {
    global $UPLOAD_PATH, $MINUTOS_POR_ANIMACION, $HORA_DE_APERTURA, $HORA_DE_CIERRE;

    $ahora = new DateTime();
    $dateHoraApertura = new DateTime();
    $dateHoraCierre = new DateTime();

    // $dateHoraApertura->add( new DateInterval("P1D") );
    $dateHoraApertura->setTime($HORA_DE_APERTURA, 0);
    $dateHoraCierre->setTime($HORA_DE_CIERRE, 0);

    // print_r($dateHoraApertura);
    // print_r($dateHoraCierre);

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
                print_r($file);
                print_r("\n");
                $sumMinutos += $MINUTOS_POR_ANIMACION;
            } else {

                break;
            }
        }
    }

    $sumSeconds = $sumMinutos * 60;

    $horario = new DateTime();
    $horario->add(new DateInterval("PT{$sumSeconds}S"));

    $hoyOManiana = true; //true es hoy;

    // print_r($horario);

    if ( $horario < $dateHoraApertura ) {
        if ( $horario >= $dateHoraCierre ) {

            $diff = null;
            if ( $ahora < $dateHoraCierre ) {
                $diff = $dateHoraCierre->diff($horario, true);
            } else {
                $diff = $ahora->diff($horario, true);
            }

            $horario = $dateHoraApertura;
            $horario->add( $diff );

            $dateHoraCierre->add( new DateInterval("P1D") );

            //aca puede pasar que quede fuera del horario de cierre...
            if ( $horario > $dateHoraCierre ) {
                $diff = $dateHoraCierre->diff($horario, true);
                $dateHoraApertura->add( new DateInterval("P1D") );
                $horario = $dateHoraApertura;
                $horario->add($diff);
                $hoyOManiana = false;
            } else {
                $hora = intval( $horario->format("H") );
                if ( $hora < $HORA_DE_CIERRE ) {
                    $hoyOManiana = false;
                }
            }
        }
    } else {
        $dateHoraCierre->add( new DateInterval("P1D") );

        if ( $horario >= $dateHoraCierre ) {
            $diff = $dateHoraCierre->diff($horario, true);
            $dateHoraApertura->add( new DateInterval("P1D") );
            $horario = $dateHoraApertura;
            $horario->add($diff);
            $hoyOManiana = false;
        } else {
            $hora = intval( $horario->format("H") );
            if ( $hora < $HORA_DE_CIERRE ) {
                $hoyOManiana = false;
            }
        }
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
