<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        return view('pages.product.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('pages.product.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // D Truy vấn đại chỗ nào lấy kết quả T xem thử chạy dc ko 
        // T chưa thấy kết quả là cate id lưu trên db mà nhỉ thì D đang vướng chỗ đó đó

          $request->validate([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'pro_image' => 'required',
        ]);

// cám ơn T nhaaa
// D xóa cái liên kết trong model như nãy đi cái create này ko liên quan đến cái liên
        $product = new Product([
            'name' => $request->get('name'),
            'price' => $request->get('price'),
            'description' => $request->get('description'),
            'pro_image' => basename($request->file('pro_image')->store('public/images')),
            'category_id' => $request->category_id[0]
        ]);

        $product->save();
        $category = new Category();
       
        // $product->categories()->attach($request->category_id);
        return redirect('/product')->with('success', 'Product added.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Product::find($id);
        $comments = $item->comments;
        return view('pages.product.show', compact('item', 'comments'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $item = Product::find($id);
        return view('pages.product.edit', compact('item'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required'
            // 'pro_image' => 'required'
        ]);

        //2 Tao Product Model, gan gia tri tu form len cac thuoc tinh cua Product model
        $product = Product::find($id);
        $product->name = $request->get('name');
        $product->price = $request->get('price');
        $product->description = $request->get('description');
        // $product->pro_image = $request->get('pro_image');

        //3 Luu
        $product->save();
        return redirect('/product')->with('success', 'Product updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
        return redirect('/product')->with('success', 'Deleted.');
    }


    
    public function getSearch(Request $request){
        $product = Product::where('name','like','%'.$request->key.'%')
                            ->orwhere('price','like','%'.$request->key.'%')
                            ->get();
                            return view('pages.product.search', compact('product'));
    }
}
