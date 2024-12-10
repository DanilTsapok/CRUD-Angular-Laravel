<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Posts extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    protected $fillable = ['name',  'description'];
    
    protected static function booted(){
        static::creating(function($post){
            $post->id = (string) Str::uuid();
        });
    }

}