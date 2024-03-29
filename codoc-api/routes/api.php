<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->get('/usuario', function (Request $request) {
    return $request->user();
});


Route::post('/login', 'AuthController@login');

Route::get('/ciudades', 'CiudadController@listarCiudades');
Route::post('/docente/existe', 'DocenteController@existeDocente');
Route::get('/materias/docente', 'MateriaController@listarMateriasDocente');
Route::get('/materia', 'MateriaController@listarMateria');


Route::middleware('auth:sanctum')->group(function(){

    Route::post('/registrar', 'AuthController@crearUsuario');

    Route::get('/usuarios', 'UsuarioController@listarUsuarios');
    Route::put('/usuario', 'UsuarioController@actualizarUsuario');
    Route::patch('/usuario', 'UsuarioController@cambiarTipoUsuario');
    Route::delete('/usuario', 'UsuarioController@eliminarUsuario');
    Route::post('/isAdmin', 'UsuarioController@isAdmin');
    Route::put('/cambiarPassword', 'UsuarioController@cambiarPassword');
    Route::put('/cambiarPasswordAdmin', 'UsuarioController@AdminCambiarPassword');
    
    Route::post('/logout', 'AuthController@logout');
    Route::post('/logout/all', 'AuthController@logoutTodos');

    Route::post('/docente', 'DocenteController@crearDocente');
    Route::get('/docentes', 'DocenteController@listarDocentes');
    Route::put('/docente', 'DocenteController@actualizarDocente');
    Route::delete('/docente', 'DocenteController@eliminarDocente');

    Route::post('/ciudad', 'CiudadController@crearCiudad');
    Route::put('/ciudad', 'CiudadController@actualizarCiudad');

    Route::post('/materia', 'MateriaController@crearMateria');
    Route::get('/materias', 'MateriaController@listarMateriasUsuario');
    Route::get('/materias/all', 'MateriaController@listarTodasMaterias');
    Route::put('/materia', 'MateriaController@actualizarMateria');
    Route::patch('/materia', 'MateriaController@actualizarCampoMateria');
    Route::delete('/materia', 'MateriaController@eliminarMateria');

    
    Route::get('/materias/incumplimiento', 'MateriaController@listarMateriasOrderByIncumplimiento');
    Route::get('/docentes/incumplimiento', 'MateriaController@listarDocentesOrderByIncumplimiento');
});