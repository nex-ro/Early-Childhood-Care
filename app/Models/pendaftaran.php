<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pendaftaran extends Model
{
    protected $table = 'pendaftaran'; // Ensure this matches the table name in the database
    use HasFactory;
    protected $fillable = ['instansi_id','user_id', 'nama', 'file','created_by', 'updated_by'];
    public function instansi()
    {
        return $this->belongsTo(Instansi::class, 'instansi_id');
    }

}
