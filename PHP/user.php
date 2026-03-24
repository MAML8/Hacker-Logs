<?php
    require_once("conn.php");

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(!(isset($_POST['username']) && isset($_POST['password']))){
            exit(-1);
        }
        $user = $_POST['username'];
        $password = $_POST['password'];
        $clearance = 0;
        if(isset($_POST['clearance']))
            $clearance = intval($_POST['clearance']);
        $display = $user;
        if(isset($_POST['displayname']))
            $display = $_POST['displayname'];
        $password = password_hash($password, PASSWORD_DEFAULT);


        $sql = "INSERT IGNORE INTO User VALUE ('$user', '$display', '$password', $clearance)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    }
    $pdo = null;
?>