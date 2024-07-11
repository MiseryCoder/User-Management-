<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

include 'dbconnect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[4]) && is_numeric($path[4])){
            $json_array = array();
            $id = $path[4];
            $getuserRow = mysqli_query($conn, "SELECT * FROM users WHERE id = '$id'");
            $rowUserdata = array();
            while($userRow= mysqli_fetch_array( $getuserRow)){
                $rowUserdata = array('id'=>$userRow['id'], 'username'=>$userRow['username'], 'email'=>$userRow['email'], 'status'=>$userRow['status'], 'password'=>$userRow['password'], 'role_type'=>$userRow['role_type']);
            }
            echo json_encode($rowUserdata);
            return;
        } else {

            $alluser = mysqli_query($conn, "SELECT * FROM users");
            if (mysqli_num_rows($alluser) > 0) {
                while ($row = mysqli_fetch_array($alluser)) {
                    $json_array['userdata'][] = array('id' => $row['id'], 'username' => $row['username'], 'email' => $row['email'], 'status' => $row['status'], 'password' => $row['password'], 'role_type'=>$row['role_type']);
                }
                echo json_encode($json_array['userdata']);
                return;
            } else {
                echo json_encode(['result' => 'Please Check the Data']);
                return;
            }

         }
        break;

        case "POST":
        $userpostdata = json_decode(file_get_contents("php://input"));
        $username = $userpostdata->username;
        $useremail = $userpostdata->email;
        $password = $userpostdata->password;
        //$role_type = $userpostdata->role_type;
        $status = $userpostdata->status;

        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $result = mysqli_query($conn, "INSERT INTO users(username, email, password, status) VALUES('$username', '$useremail', '$hashedPassword', '$status')");

        if($result){
            echo json_encode(["success" => "User Added Successfully"]);
            return;
        }else{
            echo json_encode(["error" => "Error in Adding User"]);
            return;
        }
        break;
}
?>
