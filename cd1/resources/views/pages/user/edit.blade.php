@extends('layouts.manage')

@section('content')

<div id="page-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Cập nhật
                            <small>Người dùng</small>
                        </h1>
                    </div>
                    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
        @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
        </ul>
    </div>
    @endif
          <!-- /.col-lg-12 -->
                    <form action="{{ route('user.update',$item->id) }}" method="POST">
        @csrf
        @method('PATCH')
        <div class="form-group">
            <input type="text" name="name" id="name" class="form-control" placeholder="User name..." value ="{{$item->name}}">
        </div>
        <div class="form-group">
            <input type="email" name="email" id="email" class="form-control" placeholder="Email..." value ="{{$item->email}}">
        </div>
        <!-- <div class="form-group">
            <input type="password" name="PassWord" id="PassWord" class="form-control" placeholder="Password..." required>
        </div> -->
        
         <!-- <div class="form-group">
            <input type="text" name="adress" id="adress" class="form-control" placeholder="Address" value ="{{$item->adress}}">
        </div>
        <div class="form-group">
            <input type="text" name="Phone" id="Phone" class="form-control" placeholder="Phone" value ="{{$item->Phone}}">
        </div> -->
        <!-- <div class="form-group">
            <input type="text" name="Type" id="Type" class="form-control" placeholder="Type" required>
        </div>  -->
        
        <button type="submit" class="btn btn-primary"><i class="fas fa-plus-square"></i> Thêm</button>
    </form>

                </div>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </div>
        <!-- /#page-wrapper -->

    </div>

@endsection


