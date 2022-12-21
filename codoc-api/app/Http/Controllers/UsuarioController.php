<?php

namespace App\Http\Controllers;

use App\Usuario;
use Illuminate\Support\Facades\Hash;
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
        $datosValidados = $request->validate([
            'nombre' => 'required|string|min:5',
            'correo'  => 'required|string|email|max:255',
        ]);
        $usuario = $request->user();
        
        $usuario->nombre = $datosValidados['nombre'];
        $usuario->correo = $datosValidados['correo'];

        $usuario->save();
        return response()->json(['message' => 'Actualizado'], 200);
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

        $datosValidados = $request->validate([
            'codigo' => 'required|integer|exists:usuarios,codigo',
            'valor' => 'required|integer'
        ]);

        if($datosValidados['codigo'] == $request->user()->codigo){
            return response()->json([
                'message' => 'No puedes cambiar tu permiso'
            ], 400);
        }

        $user = Usuario::where('codigo', $datosValidados['codigo'])->first();
        if($datosValidados['valor'] !=0 && $datosValidados['valor'] !=1){
            return response()->json(['message' => 'Tipo no válido'], 400);
        }
        $user->tipo = $datosValidados['valor'];
        $user->save();
        return response()->json(['message' => 'Tipo cambiado'], 200);
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
        $codigo = $request->validate([
            'codigo' => 'required|integer|exists:usuarios,codigo',
        ]);
        if($codigo['codigo'] == $request->user()->codigo){
            return response()->json([
                'message' => 'No te puedes eliminar'
            ], 400);
        }
        $usuario = Usuario::where('codigo', $codigo['codigo'])->first();
        $usuario->tokens()->delete();
        $usuario->delete();

        return response()->json([
            'message' => 'Usuario eliminado'
        ], 200);
    }
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function cambiarPassword (Request $request){
        $datosValidados = $request->validate([
            'password' => 'required|string|min:8|max:255',
        ]);
        $user = $request->user();
        $user->password = Hash::make($datosValidados['password']);
        $user->save();
        return response()->json([
            'message' => 'Contraseña actualizada'
        ], 200);
    }
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function AdminCambiarPassword (Request $request){
        if(!$request->user()->tokenCan('admin')){
            return response()->json([
                'message' => 'No tienes permiso para realizar esta acción'
            ], 403
        );}

        $datosValidados = $request->validate([
            'codigo' => 'required|integer|exists:usuarios,codigo',
            'password' => 'required|string|min:8|max:255'
        ]);
        $usuario = Usuario::where('codigo', $datosValidados['codigo'])->first();
        $usuario->password =  Hash::make($datosValidados['password']);
        $usuario->save();

        return response()->json([
            'message' => 'Contraseña cambiada'
        ], 200);
    }
    public function isAdmin (Request $request){
        if(!$request->user()->tokenCan('admin')){
            return response()->json([
                'message' => 'No eres admin'
            ], 401
        );}
        return response()->json([
            'message' => 'Eres admin'
        ], 200);
    }
    
}
