<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class subwaden_ressidence_sessions extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'tbl_subwaden_ressidence_sessions';
    protected $primaryKey = 'subwarden_residence_session_id';
    protected $fillable = ['residence_session_id', 'hostel_id', 'assigned_by', 'subwarden_id'];
}

