<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Product extends Authenticatable
{
    protected $fillable = [
        'name',
        'price',
        'description',
        'pro_image',
        'category_id',
        
    ];
    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }

    public function categories()
    {
       
        return $this->belongsTo('App\Models\Category');
    }
}
