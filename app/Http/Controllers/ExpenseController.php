<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $expenses = Expense::all();
        return response()->json($expenses);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'amount' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'price' => 'required',
            //optional if you want this to be required
        ]);
        if ($validate) {
            $expense = Expense::create($request->all());
            return response()->json([
                'message' => 'expense created',
                'expense' => $expense
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Expense
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $expense = Expense::find($id);
        if ($expense) {

            return response()->json([
                'message' => 'expense found!',
                'expense' => $expense,
            ]);
        }
        return response()->json([
            'message' => 'expense not found!',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $expense = Expense::find($id);
        return response()->json($expense);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validate = $request->validate([
            'amount' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'price' => 'required',
            //optional if you want this to be required
        ]);

        if ($validate) {
            $item = Expense::find($id);
            $item->name = $request->get('name');
            $item->amount = $request->get('amount');
            $item->description = $request->get('description');
            $item->category_id = $request->get('category_id');
            $item->price = $request->get('price');
            $item->product_image = $request->get('product_image');
            $item->save();

            return response()->json([
                'message' => 'expense updated!',
                'expense' => $item
            ]);
        }
        /*dd($expense);
        $expense->name = $request->name();
        $expense->amount = $request->amount();
        $expense->description = $request->description();
        $expense->save();
        
        return response()->json([
            'message' => 'expense updated!',
            'expense' => $expense
        ]);*/
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Expense::find($id);
        if ($item) {
            $item->delete();
            return response()->json([
                'message' => 'expense deleted'
            ]);
        } 
        return response()->json([
            'message' => 'expense not found !!!'
        ]);
    }
}
