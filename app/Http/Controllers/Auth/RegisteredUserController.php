<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\Instansi;
use App\Http\Resources\instansiResources;
use App\Models\InstansiOp;
use App\Http\Requests\StoreOpuserRequest;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('login/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'noHp'=>'required|numeric|digits_between:10,20',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'noHp' => $request->noHp,
            'password' => Hash::make($request->password),
        ]);
        event(new Registered($user));
        Auth::login($user);
        return redirect(route('home', absolute: false ));
    }

    public function regisOp(){
        $query = Instansi::query();
        $instansi=$query->paginate(10);
        return Inertia::render('login/RegisterOp', [
            "datas" =>instansiResources::collection($instansi),
        ]);
    }
    public function storeOp(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class.'|unique:'.InstansiOp::class,
            'noHp' => 'required|numeric|digits_between:10,20',
            'nik' => 'required|numeric',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'surat' => 'required|file|mimes:pdf,jpg,png',
            'instansi' => 'required|exists:instansi,id',
        ]);

        if ($request->hasFile('surat')) {
            $suratPath = $request->file('surat')->store('surat_files', 'public');
        } else {
            $suratPath = null;
        }

        $user = InstansiOp::create([
            'nama' => $request->name,
            'instansi_id' => $request->instansi,
            'email' => $request->email,
            'noHp' => $request->noHp,
            'nik' => $request->nik,
            'surat' => $suratPath,
            'password' => Hash::make($request->password),
        ]);


        return redirect()->route('login');
    }
}
