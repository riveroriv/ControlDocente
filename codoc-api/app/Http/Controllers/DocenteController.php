<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Docente;

class DocenteController extends Controller
{
    
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function crearDocente (Request $request){
        $datosValidados = $request->validate([
            'codigo' => 'required|integer|unique:docentes,codigo',
            'nombre' => 'required|string|min:5',
        ]);
        Docente::create([
            'codigo' => $datosValidados['codigo'],
            'nombre' => filter_var($datosValidados['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS),
        ]);
        return response()->json(
            [
                'message' => 'Docente añadido'
            ], 201
        );
    }

    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function listarDocentes (){
        return Docente::all();
    }
    
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function actualizarDocente (Request $request){
        $datosValidados = $request->validate([
            'codigo' => 'required|integer|exists:docentes,codigo',
            'nombre' => 'required|string|min:5',
        ]);
        Docente::where('codigo', $datosValidados['codigo'])
        ->update([
            'nombre' => filter_var($datosValidados['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)
        ]);
        
        return response()->json(
            [
                'message' => 'Información actualizada'
            ], 200
        );
    }
    
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function eliminarDocente (Request $request){
        if(!$request->user()->tokenCan('admin')){
            return response()->json([
                'message' => 'No tienes permiso para realizar esta acción'
            ], 403
        );}
        $datosValidados = $request->validate([
            'codigo' => 'required|integer|exists:docentes,codigo',
        ]);
        Docente::where('codigo', $datosValidados['codigo'])->delete();
        return response()->json(
            [
                'message' => 'Docente eliminado'
            ], 200
        );
    }

    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function existeDocente (Request $request){
        $datosValidados = $request->validate([
            'codigo' => 'required|integer|exists:docentes,codigo',
        ]);
        return response()->json(
            [
                'message' => 'Docente existe'
            ], 200
        );
    }
}