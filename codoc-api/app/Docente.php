<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    /**
     * Nombre de la tabla en la base de datos del modelo
     */
    protected $table = 'docentes';
    
    protected $fillable = [
        'codigo',
        'nombre',
    ];
    
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
