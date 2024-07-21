<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIdOpToInstansiTable extends Migration
{
    public function up()
    {
        Schema::table('instansi', function (Blueprint $table) {
            $table->unsignedBigInteger('id_op')->nullable();
            $table->foreign('id_op')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('instansi', function (Blueprint $table) {
            $table->dropForeign(['id_op']);
            $table->dropColumn('id_op');
        });
    }
}
