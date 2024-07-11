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
            $getDepartmentRow = mysqli_query($conn, "SELECT * FROM department WHERE id = '$id'");
            $rowDepartmentData = array();
            if ($departmentRow = mysqli_fetch_assoc($getDepartmentRow)) {
                $rowDepartmentData = array(
                    'id' => $departmentRow['id'], 
                    'department' => $departmentRow['department']
                );
            }
            echo json_encode($rowDepartmentData);
        } else {
            $allDepartments = mysqli_query($conn, "SELECT * FROM department");
            $json_array = array('departmentdata' => array());
            while ($row = mysqli_fetch_assoc($allDepartments)) {
                $json_array['departmentdata'][] = array(
                    'id' => $row['id'], 
                    'department' => $row['department']
                );
            }
            echo json_encode($json_array['departmentdata']);
        }
        break;

    // Add department
    case "POST":
        $departmentPostData = json_decode(file_get_contents("php://input"));
        $departmentName = mysqli_real_escape_string($conn, $departmentPostData->department);

        $result = mysqli_query($conn, "INSERT INTO department (department) VALUES ('$departmentName')");

        if ($result) {
            echo json_encode(["success" => "Department Added Successfully"]);
        } else {
            echo json_encode(["error" => "Error in Adding Department: " . mysqli_error($conn)]);
        }
        break;

    // Edit department
    case "PUT":
        $departmentUpdate = json_decode(file_get_contents("php://input"));

        if (isset($departmentUpdate->id)) {
            $id = intval($departmentUpdate->id);
            $departmentName = mysqli_real_escape_string($conn, $departmentUpdate->department);

            $updateQuery = "UPDATE department SET 
                            department = '$departmentName'
                            WHERE id = '$id'";

            if (mysqli_query($conn, $updateQuery)) {
                echo json_encode(["success" => "Department Updated Successfully"]);
            } else {
                echo json_encode(["error" => "Error updating department: " . mysqli_error($conn)]);
            }
        } else {
            echo json_encode(["error" => "Missing or invalid ID"]);
        }
        break;

    // Delete department
    case "DELETE":
        $path = explode('/', $_SERVER["REQUEST_URI"]);
        if (isset($path[4]) && is_numeric($path[4])) {
            $id = intval($path[4]);
            $result = mysqli_query($conn, "DELETE FROM department WHERE id = '$id'");
            if ($result) {
                echo json_encode(["success" => "Deleted Successfully!"]);
            } else {
                echo json_encode(["error" => "Error deleting department: " . mysqli_error($conn)]);
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
