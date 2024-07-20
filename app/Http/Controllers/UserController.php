<?php

namespace App\Http\Controllers;

use App\Models\user;
use App\Http\Requests\StoreuserRequest;
use App\Http\Requests\UpdateuserRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Models\Instansi;
use App\Http\Resources\instansiResources;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Instansi::query();

        if (request("name")) {
            $query->where("nama_instansi", "like", "%" . request("name") . "%");
        }
        if (request("daerah")) {
            $query->where('daerah', request("daerah"));
        }
        if (request("rating")) {
            $rating = (int) request("rating");
            $query->whereBetween('rating', [$rating, 5]);
        }

        // Sort by rating in descending order
        $query->orderBy('rating', 'desc');

        // Paginate the results
        $instansi = $query->paginate(10);

        // Get unique 'daerah' values
        $uniqueDaerah = Instansi::select('daerah')->distinct();

        return Inertia::render('user/index', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'datas' => InstansiResources::collection($instansi),
            'uniqueDaerahs' => $uniqueDaerah,
        ]);
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
    public function store(StoreuserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(user $user)
    {
        //
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
