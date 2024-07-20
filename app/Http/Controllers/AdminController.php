<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreInstansiRequest;
use App\Http\Requests\UpdateInstansiRequest;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Instansi;
use App\Http\Resources\userResources;
use App\Http\Resources\instansiResources;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Models\komentar;

class AdminController extends Controller
{
    // view
    public function index(){
        return Inertia::render('Admin/Dashboard');
    }
    public function kelolahUser(){
        $query = User::query();
        $user=$query->paginate(10);
        return Inertia::render('Admin/kelolahUser',[
            "users" =>userResources::collection($user),
        ]);
    }
    public function kelolahData(){
        $query = Instansi::query();
        $instansi=$query->paginate(10);
        return Inertia::render('Admin/kelolahData',[
            "datas" =>instansiResources::collection($instansi),
        ]);
    }
    public function inputInstansi(){
        return Inertia::render('Admin/input');
    }
    //create
    public function storeInstansi(StoreInstansiRequest $request){
        $data = $request->validated();

        $image = $data['gambar'] ?? null;

        if($image){
            $data['gambar'] = $image->store('project/' .Str::random(), 'public');
        }
        unset($data['rating']);

        Instansi::create($data);
        return to_route('admin.kelolaInstansi')
        ->with('Success', 'instansi berhasil dibuat');
    }

    // update
    public function editInstansi($id)
    {
        $instansi = Instansi::findOrFail($id); // Menggunakan findOrFail untuk menemukan instansi berdasarkan ID

        return inertia('Admin/edit', [
            'datas' => new InstansiResources($instansi), // Sesuaikan dengan nama resource yang sesuai
        ]);
    }

    public function updateInstansi(UpdateInstansiRequest $request,$id){
        $instansi = Instansi::findOrFail($id); // Menggunakan findOrFail untuk menemukan instansi berdasarkan ID
        $name = $instansi->nama_instansi;
        $data = $request->validated();
        $image = $data['gambar'] ?? null;
        if($image) {
            if($instansi->gambar) {
                Storage::disk('public')->delete($instansi->gambar);
            }
            $data['gambar'] = $image->store('project/' . Str::random(), 'public');
        }else{
            $data['gambar']=$instansi->gambar;
        }
        $instansi->update($data);
        return to_route('admin.kelolaInstansi')
        ->with('Success', "instansi  \"$name\" was updated");
    }

    // delete
    public function destroyUser(User $user)
    {
        $name = $user->name;
        $user->delete();
        return to_route('admin.kelolahUser')
            ->with('Success', "User \"$name\" berhasil dihapus");
    }
    public function destroyInstansi(Instansi $data)
    {
        $name = $data->nama_instansi;
        $data->delete();
        if($data->gambar)
        {
            Storage::disk('public')->delete($data->gambar);
        }
        return to_route('admin.kelolaInstansi')
            ->with('Success', "instansi \"$name\" berhasil dihapus");
    }
    public function destroyKoment($id)
    {
        $komentar = komentar::findOrFail($id); // Menggunakan findOrFail untuk menemukan instansi berdasarkan ID
        $id_ins =$komentar->instansi_id;

        $komentar->delete();
        return to_route('user.detail',$id_ins)
            ->with('Success', "komentar berhasil dihapus");
    }
}
