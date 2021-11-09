<?php

namespace App\Http\Controllers;

use App\Models\categories;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category = categories::all();
        return response()->json($category);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $category = categories::create($request->all());
        return response()->json([
            'message' => 'categories created',
            'category' => $category
        ]);
    }

    /**
     * Display the specified resource.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\categories
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $category = categories::find($id);
        if ($category) {

            return response()->json([
                'message' => 'category found!',
                'category' => $category,
            ]);
        }
        return response()->json([
            'message' => 'category not found!',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category = categories::find($id);
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $item = categories::find($id);
        $item->name = $request->get('name');
        $item->description = $request->get('description');
        $item->category_image = $request->get('category_image');
        $item->save();

        return response()->json([
            'message' => 'category updated!',
            'category' => $item
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = categories::find($id);
        if ($item){
            $item->delete();
            return response()->json([
                'message' => 'category deleted'
            ]);
        }
        return response()->json([
            'message' => 'category not found !!!'
        ]);
    }
}
