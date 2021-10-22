<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Product extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "product_name" => $this->name,
            "product_price" => $this->price,
            "product_description" => $this->description,
            "product_image" => $this->pro_image,
            "category_id" => $this->category_id,
        ];
    }
}
