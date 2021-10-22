<?php

use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('/product', 'ProductController');
Auth::routes();
Route::get('/product/{id}/{slug?}', 'ProductController@show')->name('product.show');
Route::get('/searchProduct','ProductController@getSearch')->name('product.search');
Route::get('/product', 'ProductController@index')->name('product')->middleware('product');

Route::get('/admin', 'AdminController@index')->name('admin')->middleware('admin');
Route::get('/customer', 'CustomerController@index')->name('customer')->middleware('customer');

Route::resource('/comment', 'CommentController');
Route::resource('/category', 'CategoryController');
Route::get('/category.product/{id}/{slug?}','CategoryController@view')->name('category.product');
Route::get('/category', 'CategoryController@index')->name('category')->middleware('category');
Route::resource('/show', 'ShowController');
Route::get('/search','ShowController@getSearch')->name('show.search');
Route::get('/show.product/{id}/{slug?}', 'ShowController@show')->name('show.product');

Route::resource('/user', 'UserController');
Route::get('/user/{id}/{slug?}', 'UserController@show')->name('user.show');
Route::get('/user', 'UserController@index')->name('user')->middleware('user');

Route::get('/searchUser','UserController@getSearch')->name('user.search');





Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
