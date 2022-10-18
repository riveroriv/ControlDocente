<?php

namespace App\Http\Controllers;

use App\Materia;
use Illuminate\Http\Request;
use Ramsey\Uuid\Type\Integer;

class MateriaController extends Controller
{
    
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function crearMateria (Request $request){
        $datosValidados = $request->validate([
            'codigo' => 'required|integer|unique:materias,codigo',
            'nombre' => 'required|string|min:3',
            'docente' => 'required|integer|exists:docentes,codigo',
            'ciudad' => 'required|integer|exists:ciudades,id',
        ]);
        Materia::create([
            'codigo' => $datosValidados['codigo'],
            'nombre' => filter_var($datosValidados['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS),
            'id_usuario' => $request->user()->id,
            'id_docente' => $datosValidados['docente'],
            'id_ciudad' => $datosValidados['ciudad']
        ]);
        return response()->json(
            [
                'message' => 'Materia Creada'
            ], 201
        );
    }
    
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function listarMateriasUsuario (Request $request){
        return  Materia::where('id_usuario', $request->user()->id)->get();    
    }
    
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function listarTodasMaterias (Request $request){
        if(!$request->user()->tokenCan('admin')){
            return response()->json([
                'message' => 'No tienes permiso para realizar esta acción'
            ], 403
        );}
        $materias = Materia::all();
        return $materias;        
    }
    
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function actualizarMateria (Request $request){
        $datosValidados = $request->validate([
            'codigo' => 'required|integer|exists:materias,codigo',
            'nombre' => 'required|string|min:3',
            'docente' => 'required|integer|exists:docentes,codigo',
            'ciudad' => 'required|integer|exists:ciudades,id',
        ]);
        Materia::where('codigo', $datosValidados['codigo'])
        ->update([
            'nombre' => filter_var($datosValidados['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS),
            'id_docente' => $datosValidados['docente'],
            'id_ciudad' => $datosValidados['ciudad']
        ]);
        return response()->json(
            [
                'message' => 'Cambio guardado'
            ], 200
        );
    }
    
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function eliminarMateria (Request $request){
        $codigo = $request->validate([
            'codigo' => 'required|integer|exists:materias,codigo',
        ]);
        $codigo = $codigo['codigo'];
        $materia = Materia::where('codigo', $codigo);
        $user = $request->user();
        
        if(!$user->tokenCan('admin')){
            if($user->id != $materia->id_usuario){
                return response()->json([
                    'message' => 'No tienes permiso para realizar esta acción'
                ], 403);
            }
        }

        $materia->delete();

        return response()->json(
            [
                'message' => 'Materia eliminada'
            ], 200
        );
    }
    
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function listarMateriasDocente ($docente){
        return Materia::where('id_docente', $docente)->get();
    }
    
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function listarMateria ($codigo){
        $materia = Materia::where('codigo', $codigo);
        
        return $materia->get();
    }
}