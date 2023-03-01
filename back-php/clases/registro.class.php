<?php
require_once 'conexion/conexion.php';
require_once 'respuestas.class.php';

class registro extends conexion{

    public function register($json){
        $mensaje= array();
     $resSend= $this -> ValidateDataSend($json);
     if(isset($resSend->{'error'}) ){
        return $resSend;
     }else{
         $this -> nombre = $resSend->{'nombre'};
         $this -> apellido = $resSend->{'apellido'};
         $this -> cedula = $resSend->{'cedula'};
         $this -> area = $resSend->{'area'};
         $this -> rol = $resSend->{'id_rol'};
         $this -> password = $resSend->{'password'};
        
         $resValidacion = $this ->validarDatos();
        
         if (isset($resValidacion['mensaje'])=="ok") {
            $insertDatosUser= $this -> insert_user();
            $mensaje['id_']=$insertDatosUser;
            return  $mensaje ;
         }else{
            return $resValidacion;
         }
        

       
        
      
     }
      
    }
   
    public function UpdateUser($json){
        $_respustas = new respuestas;
        $datos = json_decode($json);
        $this -> id =  $datos->{'id'};
        $this -> nombre =  $datos->{'nombre'};
         $this -> apellido =  $datos->{'apellido'};
         $this -> cedula =  $datos->{'cedula'};
         $this -> area =  $datos->{'area'};
         $this -> rol =  $datos->{'id_rol'};
         $this -> accion = "update";
  
    
        $res = $this -> InsertCambios();
        return $res;
        
       
       
      
  
    }
    private function InsertCambios(){


        $query = "UPDATE  `usuario`  
        SET `cedula`='".$this-> cedula."',`nombre`='".$this-> nombre."',
        `apellido`='".$this-> apellido."',`area`='".$this-> area."',
        `cedula`='".$this-> cedula."' ,`rol`='".$this-> rol."'
        WHERE id = '".$this-> id."'";
         $res = parent::nonQuery($query);
        return $res;

    }
    private function validarDatos(){
        $query="";
        $res="";
        if (isset($this-> cedula)) {
            $query="SELECT * FROM `usuario` WHERE cedula ='".$this-> cedula."'" ;
            $res = parent::nonQuery($query);
        }
       $respuesta = array();
       if( isset($this-> accion) =="update"){
      return $respuesta['mensaje']="ok";  
        
       }else{
   if ($res >= 1) {
        $respuesta = array(
            "cc" => "Ya existe este documento regitrado"
        );
       }
     
        if ( $res <1){
        $respuesta['mensaje'] = "ok";
       }
       return $respuesta;
       }
    
    }
private function validateDataUp($res2,$query2){
    if ($res2 == 1) {
            $resData = parent::obtenerDatos($query2);
            if($resData[0]['codigo_usuario'] == $this-> id ){
                return $respuesta['mensaje']="ok";
            
            }else{
                return $respuesta['mensaje']="No se puede actualizar ";
            }

        }else if($res2 <1){
            return $respuesta['mensaje']="ok";
            
        }else{
            return $respuesta['status'] ="error desconocido";

        }
}
private function ValidateDataSend($json){
    $mensaje = array();
        $datos = json_decode($json,true);
        foreach($datos as $clave=>$valor)
	{
    if (empty($valor)) {
        $mensaje['error']= array("$clave" =>"esta vacio");
        return $mensaje;
       
    }else{
        $this -> $clave = $valor;
     }
	
	}
    return $this;
}
    private function insert_user(){
        $password="";
        $cedula ="";
        if (isset($this-> password)) {
            $password = parent::encriptar($this-> password);
        }
        if (isset($this-> cedula)) {
            $cedula = $this -> cedula;
        }
        $respuesta = array();
        $query="INSERT INTO `usuario`(`cedula`, `nombre`, `password`, `apellido`, `rol`,`area`) 
        VALUES ('".$cedula."','".$this-> nombre."','".$password."','".$this-> apellido."','".$this-> rol."','".$this-> area."')";
        $user = parent::nonQueryId($query);
        if($user){
            $this -> id = $user;
             return $user;
        }else{
            return 0;
        }
    }
}

?>