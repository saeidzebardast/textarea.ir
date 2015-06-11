<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $exportType = $_POST['export-type'];
    $content = $_POST['textarea-editor'];

    header('Content-disposition: attachment; filename=textarea.ir.txt');
    header('Content-type: text/plain');

    echo $content;
}