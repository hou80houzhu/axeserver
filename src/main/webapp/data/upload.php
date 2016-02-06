<?php

if ($_FILES["file"]["error"] > 0) {
    echo json_encode(array(
        "code" => "0"
    ));
} else {
    $sFileName = $_FILES["file"]["name"];
    move_uploaded_file($_FILES["file"]["tmp_name"], "upload/" . $sFileName);
    $array = array(
        "code" => "1"
    );
    echo json_encode($array);
}