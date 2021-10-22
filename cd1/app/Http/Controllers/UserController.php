<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return view('pages.user.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('pages.user.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         
          $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
            // 'Phone' => '',
            // 'adress' => ''
        ]);

       
        $user = new User([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => md5($request->get('password')),
            // 'Phone' => $request->get('Phone'),
            // 'adress' => $request->get('adress')
        ]);

        
        $user->save();
        return redirect('/user')->with('success', 'User added.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
       
         $item = User::find($id);
         return view('pages.user.show', compact('item'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $item = User::find($id);
        return view('pages.user.edit', compact('item'));
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
         //1 Kiem tra du lieu
         $request->validate([
            'name' => 'required',
            'email' => 'required',
            // 'Phone' => '',
            // 'adress' => ''
        ]);

        //2 Tao Product Model, gan gia tri tu form len cac thuoc tinh cua Product model
        $user = User::find($id);
        // $user->UserName = $request->get('UserName');
        // $user->email = $request->get('email');
        // $user->Phone = $request->get('Phone');
        // $user->adress = $request->get('adress');
        $user->name = $request->get('name');
        $user->email = $request->get('email');
       
        //3 Luu
        $user->save();
        return redirect('/user')->with('success', 'User updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return redirect('/user')->with('success', 'Deleted.');
    }

    public function getSearch(Request $request){
        $user = User::where('name','like','%'.$request->key.'%')
                            ->orwhere('email','like','%'.$request->key.'%')
                            ->get();
                            return view('pages.user.search', compact('user'));
    }
}
