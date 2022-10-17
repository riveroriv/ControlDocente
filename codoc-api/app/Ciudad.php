<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ciudad extends Model
{    
    /**
     * Nombre de la tabla en la base de datos del modelo
     */
    protected $table = 'ciudades';

    /**
     * 
     */
    protected $fillable = [
        'nombre',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
