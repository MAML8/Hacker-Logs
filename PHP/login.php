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

        $sql = "SELECT dica_senha, user_name, display_name, password_ as ps, clearance_level as cle FROM User_ WHERE user_name = '$user'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        sleep(1);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if(count($result) == 0){
            echo json_encode(["status"=> "error","msg"=> "Nenhum usuário encontrado, certifique-se que o nome de usuário está correto."]);
            $pdo = null;
            exit;
        }
        $real_password = $result[0]["ps"];
        if(password_verify($password, $real_password)){
            $retorno = [
                'status' => 'success',
                'msg' => [
                    'name' => $result[0]['user_name'],
                    'display' => $result[0]['display_name'],
                    'clearance' => $result[0]['cle']
                ]
            ];
            echo json_encode($retorno);
        } else {
            $msg = 'Senha incorreta';
            if(isset($result[0]['dica_senha']))
                $msg .= '</p> <p>Dica: ' . $result[0]['dica_senha'];
            echo json_encode(['status'=> 'error','msg'=> $msg]);
        }
    }
    $pdo = null;
    exit;
?>