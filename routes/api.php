<?php

use App\Http\Controllers\ProductisHighLight;
use App\Models\user_cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\CartController;
use App\Http\Controllers\BuyController;
use App\Http\Controllers\CommentController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('/comment', 'App\Http\Controllers\CommentController');
Route::post('/product/{product_id}/postComment', [CommentController::class,'postComment'])->middleware('auth:api'); //post comment
Route::put('/editComment/{id}', [CommentController::class,'editComment'])->middleware('auth:api'); //edit comment
Route::delete('/deleteComment/{id}', [CommentController::class,'deleteComment'])->middleware('auth:api'); //delete comment
Route::get('/watch-comment-auth',[CommentController::class,'WatchComment'])->middleware('auth:api');// Comment Auth
Route::get('/watch-comment',[CommentController::class,'WatchCommentNotAuth']); 
Route::post('/login',[UserController::class,'login']); // Api Login
Route::post('/register',[UserController::class,'register']); // Api Register
Route::get('/info',[UserController::class,'infoview'])->middleware('auth:api')->name('userinfo'); // Api Get info user
Route::post('/info',[UserController::class,'infoPost'])->middleware('auth:api'); // Api  Update info user
Route::post('/password',[UserController::class,'PasswordUpdate'])->middleware('auth:api');// APi Update PassWord
Route::get('/logout',[UserController::class,'UserLogout'])->middleware('auth:api'); // Api Logout user
Route::get('/cart_user',[CartController::class,'Show'])->middleware('auth:api'); // Api User Cart
Route::post('/cart_create',[CartController::class,'Create'])->middleware('auth:api'); // Api Create
Route::post('/cart_update',[CartController::class,'Edit'])->middleware('auth:api'); // Api cart Update
Route::post('/cart_delete',[CartController::class,'Delete'])->middleware('auth:api'); // Api Cart Delete
Route::get('/productIsInteresting',[ProductisHighLight::class,'getProductisInteresting']); // Api get product is cart much
Route::get('/productIsBoughtMuch',[ProductisHighLight::class,'getProductIsBoughtMuch']); // Api get product is Bought Much
Route::resource('/product', 'App\Http\Controllers\ProductController');
Route::resource('/user', 'App\Http\Controllers\UserController');
Route::resource('/category', 'App\Http\Controllers\CategoryController');
Route::get('/home-page-lastest-product',[HomePageController::class,'GetProductIsLastest']);
Route::get('/category-is-ramdom',[HomePageController::class,'GetCategoryIsRamdom']);
Route::post('/buy',[BuyController::class,'Buy'])->middleware('auth:api'); // Api Buy !
Route::get('/ProductBuy',[BuyController::class,'DisplayProductBuy'])->middleware(['auth:api','role']);
Route::get('/searchProduct/{key}',[ProductController::class,'getSearch'])->name('product.search');
Route::get('/searchCategory/{key}',[CategoryController::class,'getSearch'])->name('category.search');
Route::get('/searchUser/{key}',[UserController::class,'getSearch'])->name('user.search');

