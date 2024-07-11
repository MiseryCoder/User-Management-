<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

include "dbconnect.php";

if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    $user = $dData['user'];
    $pass = $dData['pass'];
    $result = "";
    $role_type = ""; // Initialize role_type

    if ($user != "" and $pass != "") {
        $sql = "SELECT * FROM users WHERE username='$user';";
        $res = mysqli_query($conn, $sql);

        if (mysqli_num_rows($res) != 0) {
            $row = mysqli_fetch_array($res);
            // Verify the input password against the hashed password stored in the database
            if (password_verify($pass, $row['password'])) {
                $role_type = $row['role_type']; // Assign role_type
                $id = $row['id']; // Assign role_type
                $contact = $row['contact']; // Assign role_type
                $result = "Loggedin successfully! Redirecting...";
            } else {
                $result = "Invalid credentials";
            }
        } else {
            $result = "Invalid credentials";
        }
    } else {
        $result = "";
    }

    $conn->close();
    $response[] = array("result" => $result, "role_type" => $role_type, "contact" => $contact, "id" => $id); // Include role_type in the response
    echo json_encode($response);
}
