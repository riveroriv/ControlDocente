<?php

use App\Ciudad;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCiudadsTable extends Migration
{
    /**
     * Crea la tabla ciudades
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ciudades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });
        Ciudad::create(['nombre' => 'Cochabamba']);
        Ciudad::create(['nombre' => 'La Paz']);
        Ciudad::create(['nombre' => 'Santa Cruz']);
    }

    /**
     * Elimina la tabla ciudades
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ciudades');
    }
};