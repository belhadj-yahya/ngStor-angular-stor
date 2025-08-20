<?php
require_once "../config/connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class ProductUsers
{
    public static function get_test_user($con)
    {
        try {
            $stmt = $con->query("SELECT product.*,concat(user_f_name, ' ', user_l_name) as owner FROM product join users on product.user_id = users.user_id");
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'users' => $users]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'DB error: ' . $e->getMessage()]);
        }
    }
    public static function add_order($con, $data)
    {
        try {
            $con->beginTransaction();
            $add = $con->prepare("INSERT INTO orders(user_id,order_date,order_Status) values(?,NOW(),'pending')");
            if ($add->execute([$data[0]])) {
                $order_id = $con->lastInsertId();
                $add_order_details = $con->prepare("INSERT into order_details(order_id,product_id,amount) VALUES(?,?,?)");
                $change_amount = $con->prepare("UPDATE product set product_quantity = product_quantity - ? WHERE product_id = ?");
                for ($i = 2; $i < count($data); $i++) {
                    $product = $data[$i];
                    $add_order_details->execute([$order_id, $product["product_id"], $product["units_ticken"]]);
                    $change_amount->execute([$product["units_ticken"], $product["product_id"]]);
                }
                $con->query("UPDATE product SET out_of_order = 'Yes' where product_quantity = 0");
                echo json_encode([
                    "success" => true,
                    "received" => "your order has been placed"
                ]);
            } else {
                echo json_encode([
                    "success" => false,
                    "received" => "fuuuuuck"
                ]);
            }
            $con->commit();
        } catch (Exception $th) {
            $con->rollBack();
            echo $th->getMessage();
        }
    }
}

// Now call the class method
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header("Content-Type: application/json");
    ProductUsers::get_test_user($con);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($data[1] == "add_order") {
        ProductUsers::add_order($con, $data);
    }
}
