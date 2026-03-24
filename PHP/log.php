<?php
    require_once("conn.php");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(!(isset($_POST['username']) && isset($_POST['accessname']) && isset($_POST['text']))){
            exit(-1);
        }
        $user = $_POST['username'];
        $access = $_POST['accessname'];
        $text = $_POST['text'];

        $sql = "INSERT INTO Log (access_name, user_name, texto) VALUE ('$access', '$user', '$text')";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    }
    $pdo = null;
?>