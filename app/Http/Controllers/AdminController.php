<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Instansi;
use App\Http\Resources\userResources;
use App\Http\Resources\instansiResources;


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

    // update

    // delete
    public function destroyUser(User $user)
    {
        $name = $user->name;
        $user->delete();
        return to_route('admin.kelolahUser')
            ->with('Success', "Project \"$name\" was deleted");
    }
}
