<?
// echo ( json_encode([
//     "features" => $selectedFeatures,
//     "questions" => $selectedQuestions,
//     "video" => $selectedVideo
// ]));
$dir = "uploads/";
$json = file_get_contents('php://input');

$file = $dir .  date('Ymd-His') . ".json";

file_put_contents($file, $json);
echo "ok";


// $FILE = "results.json";
//
// $jsonResults = json_decode( file_get_contents($FILE), true );
// $jsonResults[] = $_GET;
// file_put_contents($FILE, json_encode($jsonResults));
