<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordResetModel extends Model
{
    use HasFactory;
    protected $fillable = [
        'email',
        'token',
    ];
    protected $table= 'password_resets';
    public $timestamps = false;
}
