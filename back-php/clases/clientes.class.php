<?php
require_once "conexion/conexion.php";
require_once "respuestas.class.php";


class clientes extends conexion {

    public function listaClientes(){
        
        $query = "SELECT u.id,u.nombre,u.apellido,u.area,u.cedula,r.nombre as rol from usuario u INNER JOIN roles r ON u.rol = r.id;";
        $datos = parent::obtenerDatos($query);
        return ($datos);
    }
    public function obtenerCliente($id){
        
      $query = "SELECT u.id,u.nombre,u.apellido,u.area,u.password,u.cedula,r.id as id_rol,
      r.nombre as rol from usuario u INNER JOIN roles r ON u.rol = r.id WHERE u.id= $id;";
      $datos = parent::obtenerDatos($query);
      return ($datos);
  }
    public function Eliminar($id){
      $mensaje = array();
      $query = "DELETE FROM `usuario` WHERE id = $id";
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

}





?>