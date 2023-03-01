<?php
require_once 'conexion/conexion.php';


class fechas extends conexion{

    public function RecaudoMes($json){
        $datos1 = json_decode($json, true);
        
        $query = "SELECT id_producto, p.nombre, SUM(cantidad) AS total_ventas FROM ventas INNER JOIN productos p ON ventas.id_producto = p.codigo_producto WHERE fecha >= '".$datos1['desde']."' AND fecha <= '".$datos1['hasta']."' GROUP BY id_producto ORDER BY total_ventas DESC LIMIT 5;";
        $datos = parent::obtenerDatos($query);
        return ($datos);
    }

    public function SumaMes($json){
        $datos1 = json_decode($json, true);
        
        $query = "SELECT SUM(monto) AS ventas_totales FROM pedidos WHERE fecha >= '".$datos1['desde']."' AND fecha <= '".$datos1['hasta']."';";
        $datos = parent::obtenerDatos($query);
        return ($datos);
    }


}




?>