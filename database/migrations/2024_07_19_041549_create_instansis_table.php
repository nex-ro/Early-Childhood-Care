<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('instansi', function (Blueprint $table) {
            $table->id();
            $table->string('nama_instansi');
            $table->string('alamat');
            $table->string('noHp', 20);
            $table->String('gambar')->nullable();
            $table->string('Deskripsi');
            $table->string('daerah')->default("pekanbaru");
            $table->float('rating', 8, 2)->default(0.0);
            $table->float('jmlhReviewer', 8, 2)->default(0);
            $table->boolean('terdaftar')->default(0);
            $table->string('dokumentDaftar')->nullable();
            $table->unsignedBigInteger('id_op')->nullable(); // Add the id_op column
            $table->foreign('id_op')->references('id')->on('users')->onDelete('set null'); // Define the foreign key
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instansi');
    }
};
