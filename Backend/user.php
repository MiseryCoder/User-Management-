<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

include 'dbconnect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    // Retrieve data
    case "GET":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[4]) && is_numeric($path[4])) {
            $id = intval($path[4]);
            $getUserRow = mysqli_query($conn, "SELECT * FROM users WHERE id = '$id'");
            $rowUserData = array();
            if ($userRow = mysqli_fetch_assoc($getUserRow)) {
                $rowUserData = array(
                    'id' => $userRow['id'], 
                    'username' => $userRow['username'], 
                    'email' => $userRow['email'], 
                    'status' => $userRow['status'], 
                    'role_type' => $userRow['role_type']
                    // No need to return the password
                );
            }
            echo json_encode($rowUserData);
        } else {
            $allUser = mysqli_query($conn, "SELECT * FROM users");
            $json_array = array();
            while ($row = mysqli_fetch_assoc($allUser)) {
                $json_array['userdata'][] = array(
                    'id' => $row['id'], 
                    'username' => $row['username'], 
                    'email' => $row['email'], 
                    'status' => $row['status'], 
                    'role_type' => $row['role_type']
                    // No need to return the password
                );
            }
            echo json_encode($json_array['userdata']);
        }
        break;

    // Add user
    case "POST":
        $userpostdata = json_decode(file_get_contents("php://input"));
        $username = mysqli_real_escape_string($conn, $userpostdata->username);
        $useremail = mysqli_real_escape_string($conn, $userpostdata->email);
        $password = mysqli_real_escape_string($conn, $userpostdata->password);
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $result = mysqli_query($conn, "INSERT INTO users (username, email, password) VALUES ('$username', '$useremail', '$hashedPassword')");

        if ($result) {
            echo json_encode(["success" => "User Added Successfully"]);
        } else {
            echo json_encode(["error" => "Error in Adding User: " . mysqli_error($conn)]);
        }
        break;

    // Edit user
    case "PUT":
        $userUpdate = json_decode(file_get_contents("php://input"));

        $id = intval($userUpdate->id);
        $username = mysqli_real_escape_string($conn, $userUpdate->username);
        $useremail = mysqli_real_escape_string($conn, $userUpdate->email);
        $status = mysqli_real_escape_string($conn, $userUpdate->status);
        $role_type = mysqli_real_escape_string($conn, $userUpdate->role_type);

        $updateQuery = "UPDATE users SET 
                        username = '$username', 
                        email = '$useremail', 
                        status = '$status', 
                        role_type = '$role_type'";

        if (!empty($userUpdate->password)) {
            $password = mysqli_real_escape_string($conn, $userUpdate->password);
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $updateQuery .= ", password = '$hashedPassword'";
        }

        $updateQuery .= " WHERE id = '$id'";

        if (mysqli_query($conn, $updateQuery)) {
            echo json_encode(["success" => "User Updated Successfully"]);
        } else {
            echo json_encode(["error" => "Error updating user: " . mysqli_error($conn)]);
        }
        break;

    // Delete user
    case "DELETE":
        $path = explode('/', $_SERVER["REQUEST_URI"]);
        if (isset($path[4]) && is_numeric($path[4])) {
            $id = intval($path[4]);
            $result = mysqli_query($conn, "DELETE FROM users WHERE id = '$id'");
            if ($result) {
                echo json_encode(["success" => "Deleted Successfully!"]);
            } else {
                echo json_encode(["error" => "Error deleting user: " . mysqli_error($conn)]);
            }
        } else {
            echo json_encode(["error" => "Invalid ID"]);
        }
        break;

    default:
        echo json_encode(["error" => "Unsupported HTTP method"]);
        break;
}
?>