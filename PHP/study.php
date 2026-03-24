<?php
    require_once("conn.php");

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        if(!(isset($_POST['access']))){
            exit(-1);
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
            exit(-1);

        $access = $_GET["access"];
        $clearance = 0;
        if(isset($_GET["clearanceABALOROTAXIQUINICKLICKclearanceABALOROTAXIQUINICKLICKclearanceABALOROTAXIQUINICKLICK"]))
            $clearance = intval($_GET["clearanceABALOROTAXIQUINICKLICKclearanceABALOROTAXIQUINICKLICKclearanceABALOROTAXIQUINICKLICK"]);

        $sql = "SELECT clearance_level_to_access as clearance, access_name as access, display_name as display FROM Study WHERE access_name = '$access'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        sleep(1);
        $result = $stmt->fetch(PDO::FETCH_DEFAULT);
        if(count($result) == 0 || $clearance < $result['clearance']){
            exit(-1);
        }

        $sql = "SELECT U.display_name as display, L.hora, L.texto FROM User U NATURAL JOIN Log L NATURAL JOIN Study S WHERE S.access_name = '$access'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        sleep(1);
        $retorno = array(
            'display' => $result['display'],
            'access' => $result['access'],
            'logs' => $stmt->fetchAll(PDO::FETCH_ASSOC));
        echo json_encode($retorno);
    }
    $pdo = null;
?>