<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMateriasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('materias', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->string('codigo')->primary();
            $table->string('nombre');

            $table->boolean('silabo')->default(false);

            $table->boolean('parcial_1')->default(false);
            $table->boolean('parcial_2')->default(false);
            $table->boolean('parcial_3')->default(false);
            
            $table->boolean('nota_1')->default(false);
            $table->boolean('nota_2')->default(false);
            $table->boolean('nota_3')->default(false);

            $table->boolean('planilla')->default(false);

            $table->foreignId('id_usuario')->constrained('usuarios')->cascadeOnDelete();
            
            $table->unsignedBigInteger('id_docente')->nullable();
            $table->foreign('id_docente', 'fk_materias_id_docente')->references('codigo')->on('docentes')->nullOnDelete();
            
            $table->unsignedBigInteger('id_ciudad')->nullable();
            $table->foreign('id_ciudad', 'fk_materias_id_ciudad')->references('id')->on('ciudades')->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('materias');
    }
}
