<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInstansiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'gambar' => ['nullable', 'image'],
            'nama_instansi' => ['required', 'max:255'],
            'alamat' => ['required', 'string'],
            'Deskripsi' => ['required', 'string'],
            'noHp' => ['required', 'string', 'min:8', 'max:15'],
        ];
    }
}
