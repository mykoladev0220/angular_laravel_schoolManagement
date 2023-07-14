<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class checkin extends Model
{
    use HasFactory;
    protected $table='tbl_check_ins';
    protected $primaryKey='checkin_id';
    protected $fillable=['date_checked','checked_by','receipt_number','room_allocation_id','reg_number'];
}
