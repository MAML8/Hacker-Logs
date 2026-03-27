<?php
    require_once("conn.php");

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(!(isset($_POST['username']) && isset($_POST['password']))){
            echo json_encode(['status'=> 'error','msg'=> 'dados não entregues']);
            $pdo = null;
            exit;
        }
        $user = $_POST['username'];
        $password = $_POST['password'];
        $clearance = 0;
        if(isset($_POST['clearance']))
            $clearance = intval($_POST['clearance']);
        $display = $user;
        if(isset($_POST['displayname']))
            $display = $_POST['displayname'];

        $dica = 'NULL';
        if(isset($_POST['dica']))
            $dica = "'" . $_POST['dica'] . "'";
        $password = password_hash($password, PASSWORD_DEFAULT);


        $sql = "INSERT IGNORE INTO User_ VALUE ('$user', '$display', '$password', $clearance, $dica)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        echo json_encode(["status"=> "success","msg"=> ""]);
    }
    $pdo = null;
    exit;
?>