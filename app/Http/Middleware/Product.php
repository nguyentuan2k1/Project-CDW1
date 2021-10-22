<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Illuminate\Http\Request;

class Product
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(Auth::check() && Auth::user()->role == 1)
        {
        
            return $next($request);
        }
      
        elseif (Auth::check() && Auth::user()->role == 0)
        {
          
            return redirect()->route('customer');
        }
        else {
           
            return redirect()->route('login');
        }
    
    }
}
