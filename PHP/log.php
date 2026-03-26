<?php
    require_once("conn.php");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(!(isset($_POST['username']) && isset($_POST['accessname']) && isset($_POST['text']))){
            echo json_encode(['status' => 'error', 'msg' => 'Dados não entregues']);
            $pdo = null;
            exit;
        }
        $user = $_POST['username'];
        $access = $_POST['accessname'];
        $text = $_POST['text'];

        $sql = "INSERT INTO Log (access_name, user_name, texto) VALUE ('$access', '$user', '$text')";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        echo json_encode(["status"=> "success","msg"=> ""]);
    }
    $pdo = null;
    exit;
?>