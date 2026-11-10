<?php
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');