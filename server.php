<?php
$_POST = json_decode(file_get_contents("php://input"), true);
// Получаем данные с кодеровкой JSON
echo var_dump($_POST);