<?php
require_once 'conexion/conexion.php';
require_once 'respuestas.class.php';

class auth extends conexion{

    public function login($json){
      
        $_respustas = new respuestas;
        $datos = json_decode($json,true);
        if(!isset($datos['cedula']) || !isset($datos["password"])){
            //error con los campos
            return $_respustas->error_400();
        }else{
            //todo esta bien 
            $usuario = $datos['cedula'];
            $password = $datos['password'];
            $password = parent::encriptar($password);
            $datos = $this->obtenerDatosUsuario($usuario);
            if($datos){
                //verificar si la contraseña es igual
                    if($password == $datos[0]['password']){
                        return $datos[0];
                       
                        
                                   
                         
                    }else{
                        //la contraseña no es igual
                        return $_respustas->error_200("El password es invalido");
                    }
            }else{
                //no existe el usuario
                return $_respustas->error_200("El usuaro $usuario  no existe ");
            }
        }
    }



    private function obtenerDatosUsuario($cedula){
        $query = "SELECT * FROM `usuario` WHERE cedula  = '$cedula'";
        $datos = parent::obtenerDatos($query);
        if(isset($datos[0]["cedula"])){
            return $datos;
        }else{
            return 0;
        }
    }


}




?>