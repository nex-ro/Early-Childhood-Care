<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class pendaftaran_resource extends JsonResource
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
            "instansi_id" => $this->instansi_id,
            "user_id" => $this->user_id,
            "nama" => $this->nama,
            "status" => $this->status,
            'file' => $this->file ? Storage::url($this->file):'',
            "created_at" => (new Carbon($this->created_at))->format('y-m-d'),
        ];
    }
}
