<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/
//API User
Route::get('/user', 'UserController@index')->name('user.all');

Route::post('/user', 'UserController@store')->name('user.store');

Route::get('/user/{user}', 'UserController@show')->name('user.show');

Route::patch('/user/{user}', 'UserController@update')->name('user.update');

Route::delete('/user/{user}', 'UserController@destroy')->name('user.destroy');

//API Product
Route::get('/expenses', 'ExpenseController@index')->name('expenses.all');

Route::post('/expenses', 'ExpenseController@store')->name('expenses.store');

Route::get('/expenses/{expense}', 'ExpenseController@show')->name('expenses.show');

Route::patch('/expenses/{expense}', 'ExpenseController@update')->name('expenses.update');

Route::delete('/expenses/{expense}', 'ExpenseController@destroy')->name('expense.destroy');

Route::resource('category', 'CategoriesController');
