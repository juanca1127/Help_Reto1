<?php

require_once "conexion/conexion.php";
require_once "respuestas.class.php";




class pedido extends conexion {
  
    
    
    
    
    public function obtenerPedido($id){
        $query = " SELECT * from pedidos  
        WHERE  id_pedido='$id'";
        return parent::obtenerDatos($query);
    
         
    }
    public function obtenerPedidoGeneral(){
        $query = "SELECT id_ventas,fecha,cantidad,monto,id_producto AS codPro, nombre, descripcion ,costo FROM `ventas`
         INNER JOIN productos on productos.codigo_producto = ventas.id_producto ORDER BY `ventas`.`id_ventas` DESC; ";
    
         return parent::obtenerDatos($query);
    }
    
  public function deletePedido($id){
    $mensaje = array();
    $query = "DELETE FROM `pedido` WHERE id_pedido = $id";
    $datos = parent::nonQuery($query);
    if (isset($datos)) {
         $mensaje = array(
            "status" =>"ok"
         );
        
    }else{

        $mensaje = array(
            "status" =>"Error"
        );
       
    }
    return ($datos);
  }
 
    public function insertPedido($json){
        $_respuestas = new respuestas;
        $respuesta = $_respuestas->response;

         $datos = json_decode($json);
     
         $carrito = json_decode($datos->{'pedido'},true) ;
         $this-> id = $datos->{'id'};
         $monto = json_decode($datos->{'monto'},true) ;
         $this-> carrito = $carrito;
         $this-> precio_total = $monto['total_moneda'];
         $this->   numero = count($carrito);
         $envio = array();
           $resp = $this->InsertVentas();
           $resp = $this->inventario();

        
          if(isset($resp)){
            $this-> pedido = $datos->{'pedido'} ;
            
            $re_pedido = $this ->pedido_tabla_insert();
            return $re_pedido;
            

           }
          
    }
    
    private function InsertVentas() {
        for ($i=0; $i <  $this-> numero ; $i++) { 
            $query = "INSERT INTO `ventas`( `fecha`, `cantidad`, `monto`, `id_producto`,`id_usuario`) 
            VALUES (NOW(),'".  $this-> carrito[$i]['cantidad']."','".  $this-> carrito[$i]['valor']."','".  $this-> carrito[$i]['codigo_producto']."','".$this-> id."')";
            $resp = parent::nonQuery($query);
            }
           if($resp > 0 ){
            return $resp;
       }else{
           return "error inventario";
       }
    }

   
    private function inventario() {
        for ($i=0; $i <  $this-> numero ; $i++) { 
            $query = "UPDATE `productos` SET `stock`=".  $this-> carrito[$i]['stock']."-".  $this-> carrito[$i]['cantidad']." WHERE codigo_producto =".  $this-> carrito[$i]['codigo_producto']."";
            $resp = parent::nonQuery($query);
            }
           if($resp > 0 ){
            return $resp;
       }else{
           return "error inventario";
       }
    }

    

    private function pedido_tabla_insert(){
        $query="INSERT INTO `pedidos`( `pedidos`, `fecha`,`monto`, `codigo_ususario`) 
        VALUES ('". $this-> pedido."',NOW(),'". $this-> precio_total."','". $this-> id."')";
          $pedido_r = parent::nonQueryId($query);
          
           
         if($pedido_r){
              $this -> id = $pedido_r;
        $respuesta["result"] = array(
            "status" => 'ok',
            "id_" => $this -> id
        );
                return $respuesta;
            
         }else{
            return "error";
         }
         
   
        
    }
    
}

?>