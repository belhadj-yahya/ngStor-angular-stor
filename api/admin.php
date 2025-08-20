<?php
require_once "../config/connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-type, Authorization");
header("Content-type:application/json");
class admin
{
    public static function dash_bord_info($con)
    {
        $done_orders = $con->query("SELECT COUNT(orders.order_id) as done_count FROM orders WHERE order_status = 'done'");
        $done_orders = $done_orders->fetch(PDO::FETCH_ASSOC);

        $pending_orders = $con->query("SELECT COUNT(orders.order_id) as pending_count FROM orders WHERE order_status = 'pending'");
        $pending_orders = $pending_orders->fetch(PDO::FETCH_ASSOC);

        $total_amount_of_money = $con->query("SELECT SUM(product.product_price * order_details.amount) as money FROM order_details JOIN product ON product.product_id = order_details.product_id JOIN orders ON orders.order_id = order_details.order_id WHERE orders.order_status = 'done'");
        $total_amount_of_money = $total_amount_of_money->fetch(PDO::FETCH_ASSOC);

        $user = $con->query("SELECT users.*,COUNT(product.user_id) as amount_of_product FROM users LEFT JOIN product ON product.user_id = users.user_id WHERE users.role = 'client' GROUP BY users.user_id");
        $user = $user->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode([
            "done_orders" => $done_orders,
            "pending_orders" => $pending_orders,
            "total_money" => $total_amount_of_money,
            "users" => $user
        ]);
        exit;
    }
    public static function change_user_block($con, $id, $value)
    {
        $change_block = $con->prepare("UPDATE users SET blooked = ? WHERE user_id = ?");
        $change_block->execute([$value, $id]);
        echo json_encode([
            "status" => true
        ]);
    }
    public static function get_orders($con)
    {
        $orders = $con->query("SELECT orders.*,concat(users.user_f_name,' ',users.user_l_name)as name,users.user_email,users.blooked FROM orders JOIN users on orders.user_id = users.user_id");
        $orders = $orders->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode([$orders]);
        exit;
    }
    public static function change_status($con, $value, $id)
    {
        $new_status = $con->prepare("UPDATE orders SET order_status = ? WHERE order_id = ?");
        $new_status->execute([$value, $id]);
        exit;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    switch ($_GET["action"]) {
        case "start_page":
            admin::dash_bord_info($con);
            break;
        case "change_block":
            admin::change_user_block($con, $_GET["id"], $_GET["value"]);
            break;
        case "orders":
            admin::get_orders($con);
            break;
        case "change_status":
            admin::change_status($con, $_GET["value"], $_GET["id"]);
            break;
    }
}
