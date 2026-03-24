<?php
    require_once("conn.php");

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(!(isset($_POST['username']) && isset($_POST['password']))){
            die('dados não entregues');
        }
        $user = $_POST['username'];
        $password = $_POST['password'];

        $sql = "SELECT user_name, display_name, password_ as ps, clearance_level as cle FROM User_ WHERE user_name = '$user'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        sleep(1);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if(count($result) == 0){
            die('nenhum resultado do banco');
        }
        $real_password = $result[0]["ps"];
        if(password_verify($password, $real_password)){
            $retorno = array(
                'name' => $result[0]['user_name'],
                'display' => $result[0]['display_name'],
                'clearance' => $result[0]['cle']
            );
            echo json_encode($retorno);
        } else {
            die('senha não bate');
        }
    }
    $pdo = null;
?>