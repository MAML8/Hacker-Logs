<?php
    require_once("conn.php");

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        if(!(isset($_POST['access']))){
            die('dados não entregues');
        }
        $access = $_POST['access'];
        $display = $access;
        if(isset($_POST['display']))
            $display = $_POST['display'];
        $clearance = 0;
        if(isset($_POST['clearance']))
            $clearance = intval($_POST['clearance']);

        $sql = "INSERT INTO Study VALUE ('$access', '$display', $clearance)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    } else if($_SERVER['REQUEST_METHOD'] == "GET"){
        if(!(isset($_GET["access"])))
            die('dados não entregues');

        $access = $_GET["access"];
        $clearance = 0;
        if(isset($_GET["clearanceABALOROTAXIQUINICKLICKclearanceABALOROTAXIQUINICKLICKclearanceABALOROTAXIQUINICKLICK"]))
            $clearance = intval($_GET["clearanceABALOROTAXIQUINICKLICKclearanceABALOROTAXIQUINICKLICKclearanceABALOROTAXIQUINICKLICK"]);

        $sql = "SELECT clearance_level_to_access as clearance, access_name as access, display_name as display FROM Study WHERE access_name = '$access'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        sleep(1);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if(count($result) == 0 || $clearance < $result[0]['clearance']){
            die('Clearence insuficiente para acesso do estudo');
        }

        $sql = "SELECT U.display_name as display, L.hora, L.texto FROM User_ U NATURAL JOIN Log L WHERE L.access_name = '$access'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        sleep(1);
        $retorno = array(
            'display' => $result[0]['display'],
            'access' => $result[0]['access'],
            'logs' => $stmt->fetchAll(PDO::FETCH_ASSOC));
        echo json_encode($retorno);
    }
    $pdo = null;
?>