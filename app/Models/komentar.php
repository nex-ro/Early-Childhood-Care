<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class komentar extends Model
{
    use HasFactory;

    protected $table = 'komentars'; // Ensure this matches the table name in the database

    protected $fillable = ['instansi_id', 'komentar', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function instansi()
    {
        return $this->belongsTo(Instansi::class);
    }

}
