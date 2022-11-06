<?php

namespace App\Http\Controllers;

use App\Ciudad;
use Illuminate\Http\Request;

class CiudadController extends Controller
{
    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function crearCiudad (Request $request){
        if(!$request->user()->tokenCan('admin')){
            return response()->json([
                'message' => 'No tienes permiso para realizar esta acción'
            ], 403
        );}

        $limpiado = $request->validate([
            'nombre' => 'required|string',
        ]);
        Ciudad::create([
            'nombre' => $limpiado['nombre'],
        ]);
        return response()->json([
            'message' => 'Ciudad añadida'
        ], 201);
    }

    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function listarCiudades (){
        return Ciudad::all();
    }

    /**
     * 
     * @param Request $request
     * @return Response
     */
    public function actualizarCiudad (Request $request){
        if(!$request->user()->tokenCan('admin')){
            return response()->json([
                'message' => 'No tienes permiso para realizar esta acción'
            ], 403
        );}

        $limpiado = $request->validate([
            'id' => 'required|integer|exists:ciudades,id',
            'nombre' => 'required|string',
        ]);
        $ciudad = Ciudad::find($limpiado['id']);
        $ciudad->nombre = $limpiado['nombre'];
        $ciudad->save();
        return response()->json([
            'message' => 'Ciudad actualizada'
        ], 201);
    }
}