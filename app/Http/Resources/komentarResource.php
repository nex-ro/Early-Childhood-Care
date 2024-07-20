<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;


class komentarResource extends JsonResource
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
            "user_id" => $this->user_id,
            'user_name' => $this->user ? $this->user->name : 'Unknown User',
            'user_gambar' => $this->user ? Storage::url($this->user->gambar) : '',
            "komentar" => $this->komentar,
            "instansi_id" => $this->instansi_id,
            "created_at" => (new Carbon($this->created_at))->format('y-m-d'),
            "updated_at" => (new Carbon($this->updated_at))->format('y-m-d'),

        ];
    }
}
