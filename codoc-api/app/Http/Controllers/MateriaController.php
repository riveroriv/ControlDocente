<?php

namespace App\Http\Controllers;

use App\Docente;
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
        return  Materia::where('id_usuario', $request->user()->id)
        ->join('docentes', 'docentes.codigo', '=', 'materias.id_docente')
        ->join('ciudades', 'ciudades.id', '=', 'materias.id_ciudad')
        ->select('materias.*','docentes.nombre as docente', 'ciudades.nombre as ciudad')
        ->get();    
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
    public function actualizarCampoMateria (Request $request){
        $datosValidados = $request->validate([
            'codigo' => 'required|integer|exists:materias,codigo',
            'campo' => 'required|integer',
            'valor' => 'required|integer',
        ]);
        $valor = $datosValidados['valor'] > 0;
        $materia = Materia::where('codigo', $datosValidados['codigo']);

        $user = $request->user();
        if(!$user->tokenCan('admin')){
            if($user->id != $materia->id_usuario){
                return response()->json([
                    'message' => 'No tienes permiso para realizar esta acción'
                ], 403);
            }
        }

        $campo = '';
        switch($datosValidados['campo']){
            case 0: $campo = 'silabo';
                break;
            case 1: $campo = 'parcial_1';
                break;
            case 2: $campo = 'parcial_2';
                break;
            case 3: $campo = 'parcial_3';
                break;
            case 4: $campo = 'nota_1';
                break;
            case 5: $campo = 'nota_2';
                break;
            case 6: $campo = 'nota_3';
                break;
            case 7: $campo = 'planilla';
                break;
            default: return response()->json(
                [
                    'message' => 'No existe ese campo'
                ], 400
            );
                break;
            }

            $materia->update([$campo => $valor]);
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
    public function listarMateriasDocente (Request $request){
        $codigo = $request->validate([
            'codigo' => 'required|integer|exists:docentes,codigo',
        ]);

        return Materia::where('id_docente', $codigo)
        ->join('ciudades','materias.id_ciudad','=','ciudades.id')
        ->select('materias.codigo','materias.nombre','materias.parcial_1','materias.parcial_2','materias.parcial_3'
                ,'materias.nota_1','materias.nota_2','materias.nota_3','materias.silabo'
                ,'materias.planilla','ciudades.nombre as ciudad')
        ->get();
    }
    
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function listarMateria (Request $request){
        $codigo = $request->validate([
            'codigo' => 'required|integer|exists:materias,codigo',
        ]);
        return Materia::where('codigo', $codigo)->get();
    }
}