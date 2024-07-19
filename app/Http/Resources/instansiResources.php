<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

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
            'gambar' => $this->gambar,
            'noHp'=>$this->noHp,
            'Deskripsi' => $this->Deskripsi,
            'rating' => $this->image_path,
            'created_at' => (new Carbon($this->create_at))->format('y-m-d'),
            'updated_at' => (new Carbon($this->create_at))->format('y-m-d'),
        ];
    }
}
