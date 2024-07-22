<?php

namespace App\Http\Controllers;

use App\Models\user;
use App\Http\Requests\StoreuserRequest;
use App\Http\Requests\StoreCommentarRequest;
use App\Http\Requests\UpdateuserRequest;
use App\Http\Requests\StorependaftaraanRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Models\Instansi;
use App\Http\Resources\instansiResources;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\komentar;
use App\Models\pendaftaran;
use App\Http\Resources\komentarResource;
use App\Http\Resources\pendaftaran_resource;
use App\Http\Resources\userResources;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $query = Instansi::query();

        if (request("name")) {
            $query->where("nama_instansi", "like", "%" . request("name") . "%");
        }
        if (request("daerah")) {
            $query->where('daerah', request("daerah"));
        }
        if (request("rating")) {
            $rating = (int) request("rating");
            $query->whereBetween(DB::raw('rating / jmlhReviewer'), [$rating, 5]);
        }
        // Sort by rating in descending order
        $query->orderBy('rating', 'desc');
        // Paginate the results
        $instansi = $query->paginate(10);
        if ($user) {
            // Ambil data pendaftaran yang memiliki user_id == $user->id
            $pendaftaran = Pendaftaran::where('user_id', $user->id)->get();

            // Query Instansi
            $query = Instansi::query()->with(['pendaftaran' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }]);

            return Inertia::render('user/index', [
                'canLogin' => Route::has('login'),
                'canRegister' => Route::has('register'),
                'datas' => InstansiResources::collection($instansi),
                'pendaftaran'=>$pendaftaran,
            ]);
        }
        else{
            return Inertia::render('user/index', [
                'canLogin' => Route::has('login'),
                'canRegister' => Route::has('register'),
                'datas' => InstansiResources::collection($instansi),
            ]);
        }


    }

    public function profile(Request $request)
    {

        return Inertia::render('user/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function storeRegis(StorependaftaraanRequest $request){
        $data = $request->validated();
        $id = $data['instansi_id'];
        $image = $data['file'] ?? null;
        if($image){
            $data['file'] = $image->store('file_Pendaftar/' .Str::random(), 'public');
        }

        pendaftaran::create($data);

        return to_route('home',)
        ->with('Success', 'Project was created');
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentarRequest $request)
    {
        // Retrieve data from the request
        $id = $request->input('id');
        $userID = $request->input('userId');
        $rating = $request->input('rating');
        $comment = $request->input('comment');
        if (!Auth::check() || Auth::user()->id !== $userID) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        komentar::create([
            'instansi_id' => $id,
            'user_id' => $userID,
            'komentar' => $comment,
        ]);
        $instansi = Instansi::findOrFail($id); // Menggunakan findOrFail untuk menemukan instansi berdasarkan ID
        $totalReviews = $instansi->jmlhReviewer + 1;
        $newRating = (($instansi->rating) + $rating);
        // Update the instansi with the new rating and increment the number of reviewers
        $instansi->update([
            'rating' => $newRating,
            'jmlhReviewer' => $totalReviews,
        ]);
        return to_route('user.detail', $id)
            ->with('Success', "Komentar berhasil ditambahkan");
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $instansi = Instansi::findOrFail($id); // Menggunakan findOrFail untuk menemukan instansi berdasarkan ID
        $komentar = Komentar::with('user')->where('instansi_id', $id)->paginate(10);
        return Inertia::render('user/detail', [
            'datas' => new instansiResources($instansi), // Sesuaikan dengan nama resource yang sesuai
            'dataKomentar' => KomentarResource::collection($komentar), // Use KomentarResource for the collection
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(user $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateuserRequest $request, user $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user $user)
    {
        //
    }
}
