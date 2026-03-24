<?php
    require_once("conn.php");

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(!(isset($_POST['username']) && isset($_POST['userpassword']))){
            exit(-1);
        }
        $user = $_POST['username'];
        $password = $_POST['password'];

        $sql = "SELECT user_name, display_name, password_ as ps, clearance_level as cle FROM User WHERE user_name = $user";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        sleep(1);
        $result = $stmt->fetchAll(PDO::FETCH_DEFAULT);
        if(count($result) == 0){
            exit(-1);
        }
        $real_password = $result["ps"];
        if(password_verify($real_password, $password)){
            $retorno = array(
                'name' => $result['user_name'],
                'display' => $result['display_name'],
                'clearance' => $result['cle']
            );
            echo json_encode($retorno);
        } else {
            exit(-1);
        }
    }
    $pdo = null;
?>