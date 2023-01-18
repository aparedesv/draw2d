<?php
header('Content-Type: application/json');
$files = scandir('../draws');
echo json_encode($files);