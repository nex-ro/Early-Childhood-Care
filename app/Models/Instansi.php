<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instansi extends Model
{
    protected $table = 'instansi';

    use HasFactory;
    protected $fillable = ['nama_instansi','alamat','noHp','gambar','Deskripsi','created_at','updated_at','daerah','jmlhReviewer','rating'];
    public function komentars()
    {
        return $this->hasMany(Komentar::class);
    }
}


