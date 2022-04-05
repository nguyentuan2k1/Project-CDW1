<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Routing\Route;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
//        $id = $this->DichId(\Illuminate\Support\Facades\Request::route()->user);
//        return [
//            'email'=>['required',
//                'email',
//                Rule::unique('users')->ignore($id, 'id')
//            ],
//            'phone'=>['required',
//                Rule::unique('users')->ignore($id, 'id')
//            ],
//


        ];
    }
    public function DichId($id)
    {
        $id = base64_decode($id);
        $handleFirst = substr($id, 10);
        $idx = "";
        for ($i = 0; $i < strlen($handleFirst) - 22; $i++) {
            $idx .= $handleFirst[$i];
        }
        return  $idx;
    }
}
