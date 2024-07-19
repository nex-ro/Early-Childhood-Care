<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\InstansiController;
use App\Http\Controllers\UserController;



use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {
    // Route::get('/admin', fn() => Inertia::render('Dashboard'))->name('dashboard');
    // Route::resource('admin', AdminController::class);
    Route::get('admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('admin/kelolahUser', [AdminController::class, 'kelolahUser'])->name('admin.kelolahUser');
    Route::get('admin/kelolahInstansi', [AdminController::class, 'kelolahData'])->name('admin.kelolaInstansi');



    Route::delete('admin/users/{user}', [AdminController::class, 'destroyUser'])->name('admin.destroyUser'); // Tambahkan rute ini


});


require __DIR__.'/auth.php';

