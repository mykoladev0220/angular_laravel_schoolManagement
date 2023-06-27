<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class allocation_rejection_reason extends Model
{
    use HasFactory;
    public $timestamps=false;

    protected $table='tbl_rejected_allocations';

    protected $primaryKey='rejected_allocation_id';


    protected $fillable=['rejected_allocation_id','allocation_id','reason','rejected_by','updated_at'];
}
