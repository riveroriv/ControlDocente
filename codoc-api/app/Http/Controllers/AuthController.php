<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Usuario;
use Laravel\Sanctum\Sanctum;

class AuthController extends Controller
{
    public function crearUsuario(Request $request){
        if(!$request->user()->tokenCan('admin')){
            return response()->json([
                'message' => 'No tienes permiso para realizar esta acción'
            ]);
        }
        $datosValidados = $request->validate([
            'codigo' => 'required|integer|unique:usuarios',
            'nombre' => 'required|string|min:5',
            'correo'  => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);
        $usuario = Usuario::create([
            'codigo' => $datosValidados['codigo'],
            'nombre' => $datosValidados['nombre'],
            'correo'  => $datosValidados['correo'],
            'password' =>  Hash::make($datosValidados['password']),
            'tipo'  => 0,
        ]);
        return response()->json(
            [
                'message' => 'Usuario Creado'
            ], 200
        );
    }

    public function login(Request $request){
        if(!Auth::attempt($request->only('codigo', 'password'))){
            //Log::alert("Fallo de autenticación con credenciales: usuario = ". $request['codigo'] ." and password = ". $request['password']);
            return response()->json([
                'message' => 'Credenciales no válidos',
            ], 401
        );
        }
        $usuario = Usuario::where('codigo', $request['codigo'])->firstOrFail();
        $tipo = 'jefe';
        switch ($usuario->tipo) {
            case 1: $tipo = 'admin';
                break;
            default:
                $tipo = 'jefe';
                break;
        }
        $token = $usuario->createToken('auth_token', [$tipo])->plainTextToken;
        return response()->json(
            [
                'access_token' => $token,
                'token_type' => 'Bearer'
            ], 200
        );
    }
    public function logout(Request $request){
        return $request->user()->currentAccessToken()->delete();
    }
    public function logoutTodos(Request $request){
        $request->user()->tokens()->delete();
    }
}
