@extends('layouts.header')

@section('content')

    <div class="container">
    
        <div class="row">
            @foreach($products as $item)
            <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                <img height="230px" class="card-img-top" src="{{ url($item->pro_image) }}" alt="Card image cap">
                <div class="card-body">
                    <h5><a align="center" class="nav-link" href="">{{ $item->name }}</a></h5>
                    <div align="center" class="price"><h6>{{'$'.$item->price}}</h6></div>
                    <div class="d-flex justify-content-between align-items-center">
                    <div class="info"> <p><a class="nav-link" href="{{ route('product.show', ['id' => $item->id, 'slug' =>  Str::slug($item->name, '-')]) . '.html' }}">Xem thông tin <i class="fas fa-paw"></i></a></p></div>
                    <div class="cart1"><p><a class="nav-link" href="#">Thêm vào giỏ <i class="fas fa-shopping-cart"></i></a></p></div>
                </div>
                </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</div>
@endsection


