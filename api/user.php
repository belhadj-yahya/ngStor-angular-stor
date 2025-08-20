<?php
require_once "../config/connection.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-type, Authorization");
header("Content-type:application/json");

class UsersAction
{
    public static $test = 0;
    public static function log_in($con, $data)
    {
        $user = $con->prepare("SELECT * FROM users where user_email = ?");
        $user->execute([$data["email"]]);
        $user = $user->fetch(PDO::FETCH_ASSOC);
        if (!empty($user)) {
            $sheck_password = password_verify($data["password"], $user["user_password"]);
            // echo json_encode(["test" => $user, "passowrd_value" => $sheck_password]);
            // exit;
            if ($sheck_password) {
                echo json_encode([
                    'success' => true,
                    'user' => $user
                ]);
                exit;
            } else {
                echo json_encode([
                    'success' => false,
                    'user' => "email or password inccurect"
                ]);
                exit;
            }
        } else {
            echo json_encode([
                'success' => false,
                'user' => "email or password inccurect"
            ]);
            exit;
        }
    }
    public static function get_product_of_user($con, $id)
    {
        $product = $con->prepare("SELECT * FROM product WHERE user_id = ?");
        if ($product->execute([$id])) {
            $products = $product->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode([
                "success" => true,
                "products" => $products
            ]);
        } else {
            echo json_encode(["success" => false]);
        }
    }
    public static function add_product($con, $data)
    {
        $add_item = $con->prepare("INSERT INTO product(user_id,product_name,product_price,product_quantity,out_of_order) VALUES(?,?,?,?,'No')");
        if ($add_item->execute([$data["user_id"], $data["product_name"], $data["product_price"], $data["product_units"]])) {
            $get_new_items = $con->prepare("SELECT * FROM product WHERE user_id = ?");
            if ($get_new_items->execute([$data["user_id"]])) {
                $get_new_items = $get_new_items->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode([
                    "success" => true,
                    "products" => $get_new_items
                ]);
            }
        }
    }
    public static function edit_product($con, $data)
    {
        $edit_item = $con->prepare("UPDATE product set product_name = ?, product_price = ?, product_quantity = ? WHERE product_id = ?");
        $edit_item->execute([$data["new_name"], $data["new_product_price"], $data["new_product_units"], $data["item_id"]]);
        $change_status_to_yes = $con->prepare("UPDATE product set out_of_order = ? WHERE product_quantity > 0 AND product_id = ?");
        $change_status_to_yes->execute(['No', $data["item_id"]]);
        $change_status_to_no = $con->prepare("UPDATE product set out_of_order = ? WHERE product_quantity = 0 AND product_id = ?");
        $change_status_to_no->execute(['Yes', $data["item_id"]]);
        echo json_encode([
            "seccess" => true,
            "data" => $data
        ]);
        exit;
    }
    public static function get_status($con, $id)
    {
        if (is_numeric($id)) {
            $get_orders = $con->prepare("SELECT o.order_id,o.order_status,p.product_name,p.product_price,od.amount,(p.product_price * od.amount) AS item_subtotal,  SUM(p.product_price * od.amount) OVER (PARTITION BY o.order_id) AS order_total FROM order_details od JOIN orders o ON o.order_id = od.order_id JOIN product p ON p.product_id = od.product_id WHERE  o.user_id = ?");
            $get_orders->execute([$id]);
            $get_orders = $get_orders->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode([
                "data" => $get_orders
            ]);
            exit;
        }
    }
    public static function sign_up($con, $first_name, $last_name, $email, $pass)
    {
        $check_user = $con->prepare("SELECT * FROM users WHERE user_email = ?");
        $check_user->execute([$email]);
        $check_user = $check_user->fetch(PDO::FETCH_ASSOC);
        if (!empty($check_user)) {
            echo json_encode(["seccuss" => false, "message" => 'email already exist']);
            exit;
        } else {
            $password = password_hash($pass, PASSWORD_DEFAULT);
            $add_new_user = $con->prepare("INSERT INTO users(user_f_name,user_l_name,user_email,user_password,blooked,role) VALUES(?,?,?,?,'No','client')");
            $add_new_user->execute([$first_name, $last_name, $email, $password]);
            $new_user_id = $con->lastInsertId();
            $user = $con->prepare("SELECT * FROM users where user_id = ?");
            $user->execute([$new_user_id]);
            $user = $user->fetch(PDO::FETCH_ASSOC);
            echo json_encode(["seccuss" => true, $user]);
            exit;
        }
    }
}
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);
    switch ($data["action"]) {
        case "log_in":
            UsersAction::log_in($con, $data);
            break;
        case "get_product":
            UsersAction::get_product_of_user($con, $data["id"]);
            break;
        case "add_item":
            UsersAction::add_product($con, $data);
            break;
        case "edit_item":
            UsersAction::edit_product($con, $data);
            break;
        case "sign_up":
            UsersAction::sign_up($con, $data["first_name"], $data["last_name"], $data["email"], $data["password"]);
            break;
        default:
            echo json_encode([
                "status" => true,
                "this if check" => "stoped",
                "data_from_angular" => $data
            ]);
            break;
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "GET") {
    // $data = json_decode(file_get_contents("php://input"), true);
    switch ($_GET["action"]) {
        case "status":
            UsersAction::get_status($con, $_GET["id"]);
            break;
    }
}
