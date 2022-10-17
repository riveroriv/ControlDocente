<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    
    /**
     * Nombre de la tabla en la base de datos del modelo
     */
    protected $table = 'materias';
    
    protected $fillable = [
        'codigo',
        'nombre',
        'silabo',
        'parcial_1',
        'parcial_2',
        'parcial_3',
        'nota_1',
        'nota_2',
        'nota_3',
        'planilla',
        'docente',
        'ciudad',
        'usuario',
    ];
}
