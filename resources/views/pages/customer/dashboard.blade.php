@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
            <div class="card-header"><a href="{{ url('/') }}">Trang chủ</a>/<a href="{{url('/customer')}}">Thành viên</a>/<a href="">Đổi mật khẩu</a></div>
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <h4 align="center">Thông tin cá nhân</h4>
                    <h6>Tên đăng nhập: <b>{{ Auth::user()->name }}</b></h6>
                    <h6>Địa chỉ email: <b>{{ Auth::user()->email }}</b></h6>
                    <h6>Ngày tham gia: {{ Auth::user()->created_at }}</h6>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
