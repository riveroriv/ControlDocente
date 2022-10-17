<?php

use App\Usuario;
use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            /*
             * Se conserva la estructura original para el funcionamiento de Sanctum
             * email es el codigo de usuario
             */
            $table->unsignedInteger('codigo')->unique();
            $table->string('password');

            $table->string('nombre');
            $table->string('correo')->nullable();
            $table->tinyInteger('tipo')->default(0); 
            $table->rememberToken();
            $table->timestamps();
        });
        //crea un usuario administrador inicial
        Usuario::create([
            'codigo' => 42000,
            'nombre' => 'Admin',
            'correo'  => 'admin@codoc.com',
            'password' =>  Hash::make('password'),
            'tipo'  => 1,
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
