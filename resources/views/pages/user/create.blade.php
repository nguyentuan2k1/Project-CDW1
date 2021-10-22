@extends('layouts.manage')

@section('content')

<div id="page-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Thêm mới
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
                    <form action="{{ route('user.store') }}" method="POST">
        @csrf
        <div class="form-group">
            <input type="text" name="name" id="name" class="form-control" placeholder="User name..." required>
        </div>
        <div class="form-group">
            <input type="email" name="email" id="email" class="form-control" placeholder="Email..." required>
        </div>
        <div class="form-group">
            <input type="password" name="password" id="password" class="form-control" placeholder="Password..." required>
        </div>
        
         <!-- <div class="form-group">
            <input type="text" name="adress" id="adress" class="form-control" placeholder="Address">
        </div>
        <div class="form-group">
            <input type="text" name="Phone" id="Phone" class="form-control" placeholder="Phone" >
        </div> -->
        <!-- <div class="form-group">
            <input type="text" name="Type" id="Type" class="form-control" placeholder="Type" required>
        </div> 
         -->
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


