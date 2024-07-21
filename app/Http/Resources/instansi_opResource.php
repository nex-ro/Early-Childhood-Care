<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class instansi_opResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            "id" => $this->id,
            "id_instansi" => $this->instansi_id,
            'instansi_nama' => $this->instansi->nama_instansi, // Add this line
            "name" => $this->nama,
            "email" => $this->email,
            "noHp" => $this->noHp,
            "nik" => $this->nik,
            'surat' => $this->surat ? Storage::url($this->surat):'',
            "status" => $this->status,

        ];
    }
}
