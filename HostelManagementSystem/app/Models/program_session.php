<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class program_session extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $primaryKey = 'programme_session_id';
    protected $table = 'tbl_programme_sessions';
    protected $fillable = ['programme_session_id', 'residence_session_id', 'programme_code','preference_level_id'];
}
