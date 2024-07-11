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
        fetchAssignments($conn);
        break;
    case "POST":
        createAssignment($conn);
        break;
    default:
        echo json_encode(["error" => "Unsupported HTTP method"]);
        break;
}

function fetchAssignments($conn) {
    $sql = "SELECT * FROM assignments";
    $result = mysqli_query($conn, $sql);

    if ($result) {
        $assignments = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($assignments);
    } else {
        echo json_encode(["error" => "Error fetching assignments: " . mysqli_error($conn)]);
    }
}

function createAssignment($conn) {
    if (isset($_FILES['attachment'])) {
        $user_id = intval($_POST['user_id']);
        $for = mysqli_real_escape_string($conn, $_POST['for']);
        $due = mysqli_real_escape_string($conn, $_POST['due']);
        $title = mysqli_real_escape_string($conn, $_POST['title']);
        $instruction = mysqli_real_escape_string($conn, $_POST['instruction']);

        // Handle file upload
        $attachment = $_FILES['attachment']['name'];
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($attachment);
        
        if (move_uploaded_file($_FILES['attachment']['tmp_name'], $target_file)) {
            $attachment_path = $target_file;
        } else {
            echo json_encode(["error" => "Error uploading the file"]);
            return;
        }

        $sql = "INSERT INTO assignments (user_id, for_whom, due, title, instruction, attachment) 
                VALUES ('$user_id', '$for', '$due', '$title', '$instruction', '$attachment_path')";

        if (mysqli_query($conn, $sql)) {
            echo json_encode(["success" => "Task/Assignment Created Successfully"]);
        } else {
            echo json_encode(["error" => "Error in Creating Task/Assignment: " . mysqli_error($conn)]);
        }
    } else {
        echo json_encode(["error" => "No attachment found"]);
    }
}

?>
