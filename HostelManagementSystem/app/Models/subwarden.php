<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class subwarden extends Model
{
    use HasFactory;
public $timestamps=false;

    protected $table = 'tbl_subwardens';
    protected $primaryKey = 'subwarden_id';
    protected $fillable = ['date_created', 'reg_number', 'created_by'];
}
