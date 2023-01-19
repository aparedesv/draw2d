<?php
header('Content-Type: application/json');
$file_path = file_get_contents('php://input');
echo $file_path;