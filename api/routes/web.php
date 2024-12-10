<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;

Route::get('api/posts', [PostsController::class, 'index']);
Route::get('api/posts/{id}', [PostsController::class, 'show']);
Route::post('api/posts', [PostsController::class, 'store']);
Route::put('api/posts/{id}', [PostsController::class, 'update']);
Route::delete('api/posts/{id}', [PostsController::class, 'destroy']);