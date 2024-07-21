<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class instansiResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function toArray(Request $request): array
    {
        return[
            'id' => $this->id,
            'nama_instansi' => $this->nama_instansi,
            'alamat' => $this->alamat,
            'gambar' => $this->gambar ? Storage::url($this->gambar):'',
            'noHp'=>$this->noHp,
            'daerah'=>$this->daerah,
            'Deskripsi' => $this->Deskripsi,
            'rating' => $this->rating,
            'jmlhReviewer'=>$this->jmlhReviewer,
            'terdaftar'=>$this->terdaftar,
            'dokumentDaftar'=>$this->dokumentDaftar? Storage::url($this->dokumentDaftar):'',
            'created_at' => (new Carbon($this->create_at))->format('y-m-d'),
            'updated_at' => (new Carbon($this->create_at))->format('y-m-d'),
        ];
    }
}
