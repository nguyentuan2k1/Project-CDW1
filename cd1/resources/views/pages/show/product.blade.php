
@extends('layouts.default');
@section('content')

<div class="container">
    <div class="row">
        <div class="col-md-4">
            <img src="{{url($item->pro_image)}}" alt="Card image cap" class="img-fluid">
        </div>
        <div class="col-md-8">
            <h1>{{ $item->name }}</h1>
            <h5>Giá: {{ $item->price }}</h5>
            <p>{{ $item->description }}</p>
            <div class="buy">
            <form action="#">
            <div class="d-flex justify-content-between align-items-center">
            <a class="nav-link" href="">Thêm vào giỏ <i class="fas fa-shopping-cart"></i></a>
                    <button type="submit">Mua ngay</button>
                </div>    
                </form>
            </div>
             <ul>
            @foreach ($comments as $comment)
                <li>{{ $comment->comment_content }}</li>
            @endforeach
            </ul>
            <form action="{{route('comment.store')}}" method="POST">
                @csrf
                <div class="form-group">
                    <textarea name="comment_content" id="comment_content" class="form-control" placeholder="Viết bình luận..."></textarea>
                    <input type="hidden" name="id" value="{{ $item->id }}">
                    <button type="submit"><i class="fas fa-paper-plane"></i> Gửi</button>
                </div>
            </form> 
        </div>
    </div>
</div>
@endsection