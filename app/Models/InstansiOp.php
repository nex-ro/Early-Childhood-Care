<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstansiOp extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'instansi_id',
        'email',
        'noHp',
        'nik',
        'surat',
        'password',
    ];
    public function instansi()
    {
        return $this->belongsTo(Instansi::class, 'instansi_id');
    }
}
