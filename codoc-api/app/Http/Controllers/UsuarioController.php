<?php

namespace App\Http\Controllers;

use App\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function listarUsuarios (Request $request){
        if(!$request->user()->tokenCan('admin')){
            return response()->json([
                'message' => 'No tienes permiso para realizar esta acción'
            ], 403
        );}
        return Usuario::all();
    }
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function actualizarUsuario (Request $request){

    }
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function cambiarTipoUsuario (Request $request){
        if(!$request->user()->tokenCan('admin')){
            return response()->json([
                'message' => 'No tienes permiso para realizar esta acción'
            ], 403
        );}


        
    }
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function eliminarUsuario (Request $request){
        if(!$request->user()->tokenCan('admin')){
            return response()->json([
                'message' => 'No tienes permiso para realizar esta acción'
            ], 403
        );}


        
    }
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function cambiarPassword (Request $request){

    }
     /**
     * 
     * @param Request $request
     * @return Response
     */
    public function AdminCambiarPasswor (Request $request){
        if(!$request->user()->tokenCan('admin')){
            return response()->json([
                'message' => 'No tienes permiso para realizar esta acción'
            ], 403
        );}


        
    }
    
}
