<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Instansi;
use App\Http\Resources\instansiResources;
use App\Http\Resources\pendaftaran_resource;
use App\Models\pendaftaran;
use Illuminate\Support\Facades\Storage;

class operatorController extends Controller
{
    public function index()
    {
        // Get the currently authenticated user
        $user = Auth::user();
        // Query Instansi where id_op equals the authenticated user's ID
        $instansi = Instansi::where('id_op', $user->id)->get();
        $query = pendaftaran::query();
        $pendaftar=$query->paginate(10);

        // Pass the instansi data to the Inertia component
        return Inertia::render('operator/index', [
            'instansi' => $instansi,
            "pendaftar" =>pendaftaran_resource::collection($pendaftar),

        ]);
    }


    public function aturFile()
    {
        $user = Auth::user();

        // Ambil data dari database
        $instansi = DB::select('SELECT * FROM instansi WHERE id_op = ?', [$user->id]);

        // Konversi stdClass ke array asosiatif dan tambahkan URL file
        $instansiWithUrls = array_map(function ($item) {
            $item = (array) $item; // Konversi stdClass ke array asosiatif
            if (!empty($item['dokumentDaftar'])) {
                $item['dokumentDaftarUrl'] = Storage::url($item['dokumentDaftar']); // Tambahkan URL file
            }
            return $item;
        }, $instansi);

        return Inertia::render('operator/aturFile', [
            'instansi' => $instansiWithUrls
        ]);
    }
    public function storeInstansi(Request $request)
    {
        // Validasi request
        $request->validate([
            'file' => 'required|file|mimes:pdf|max:2048', // Adjust validation rules as needed
            'id' => 'required',
        ]);

        // Ambil file dari request
        $file = $request->file('file');

        // Generate a unique directory and save file
        if ($file) {
            $uniqueDir = 'filePendaftar/' . Str::random(); // Generate a random directory
            $filePath = $file->store($uniqueDir, 'public'); // Store file in the unique directory

            // Simpan file path di database
            $instansi = Instansi::find($request->input('id'));
            if ($instansi) {
                $instansi->dokumentDaftar = $filePath;
                $instansi->save();
            } else {
                // Handle the case where the Instansi with the given ID is not found
                return redirect()->back()->withErrors(['id' => 'Instansi not found']);
            }
        }

        return redirect()->back()->with('success', 'File uploaded successfully');
    }
    public function deletedata($id)
    {
        try {
            // Temukan data berdasarkan ID
            $instansi = Instansi::findOrFail($id);

            // Ganti nilai dokumentDaftar dengan null
            $instansi->dokumentDaftar = null;
            $instansi->save();


            // Redirect ke rute 'operator.aturFile' dengan pesan sukses
            return redirect()->route('operator.aturFile')->with('success', 'dokumentDaftar has been set to null successfully.');
        } catch (\Exception $e) {
            // Redirect ke rute 'operator.aturFile' dengan pesan kesalahan
            return redirect()->route('operator.aturFile')->with('error', 'There was an error updating the data: ' . $e->getMessage());
        }
    }
    public function updateStatus(Request $request, $id){
        $pendaftaran = pendaftaran::find($id);

    // Pastikan model ditemukan
    if (!$pendaftaran) {
        return redirect()->back()->with('error', 'Pendaftaran not found');
    }

    // Update status
    $pendaftaran->status = $request->status;
    $pendaftaran->save();

    // Redirect dengan pesan sukses
    return redirect()->back()->with('success', 'Status updated successfully');
    }
}
