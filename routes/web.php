<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\InstansiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\RegisteredUserController;

use Inertia\Inertia;
Route::get('/', [UserController::class, 'index'])->name('home');
Route::get('/detail/{id}', [UserController::class, 'show'])->name('user.detail');
// post
Route::post('/komenPost', [UserController::class, 'store'])->name('user.komenPost')->middleware('auth');


// register Op
Route::get('/regisOp', [RegisteredUserController::class, 'regisOp'])->name('registerOp');
Route::post('/PostregisOp', [RegisteredUserController::class, 'storeOp'])->name('postregisterOp');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('operator', [AdminController::class, 'index'])->name('admin.dashboard');



Route::middleware(['auth', 'admin'])->group(function () {
    // Route::get('/admin', fn() => Inertia::render('Dashboard'))->name('dashboard');
    // Route::resource('admin', AdminController::class);
    Route::get('admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('admin/kelolahUser', [AdminController::class, 'kelolahUser'])->name('admin.kelolahUser');
    Route::get('admin/kelolahOp', [AdminController::class, 'kelolahOp'])->name('admin.kelolahOp');

    Route::get('admin/kelolahInstansi', [AdminController::class, 'kelolahData'])->name('admin.kelolaInstansi');
    Route::get('admin/inputInstansi', [AdminController::class, 'inputInstansi'])->name('admin.inputInstansi');

    //edit
    Route::get('admin/edit/{id}', [AdminController::class, 'editInstansi'])->name('admin.edit');
    Route::put('admin/update/{id}', [AdminController::class, 'updateInstansi'])->name('admin.updateInstansi');
    Route::put('/admin/update-status/{id}', [AdminController::class, 'updateStatus'])->name('admin.updateStatus');


    // post
    Route::post('/admin/inputInstansi', [AdminController::class, 'storeInstansi'])->name('admin.storeInstansi');



    // delete
    Route::delete('admin/users/{user}', [AdminController::class, 'destroyUser'])->name('admin.destroyUser'); // Tambahkan rute ini
    Route::delete('admin/del/{data}', [AdminController::class, 'destroyInstansi'])->name('admin.destroyInstansi'); // Tambahkan rute ini
    Route::delete('admin/delKoment/{id}', [AdminController::class, 'destroyKoment'])->name('user.destroyKoment'); // Tambahkan rute ini



});


require __DIR__ . '/auth.php';
