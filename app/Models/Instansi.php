<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instansi extends Model
{
    protected $table = 'instansi'; // Make sure this matches the table name in the database
    use HasFactory;
    protected $fillable = ['nama_instansi','alamat','noHp','gambar','Deskripsi','created_at','updated_at'];

    protected $guarded = ['rating'];
}


