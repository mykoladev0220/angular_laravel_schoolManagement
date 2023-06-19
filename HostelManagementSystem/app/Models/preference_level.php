<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class preference_level extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'tbl_level_preference';
    protected $primaryKey = 'preference_level_id';
    protected $fillable = ['preference_level_id', 'academic_level', 'semester', 'residence_session_id','createdby'];
}
