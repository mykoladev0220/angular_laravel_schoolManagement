<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class programme extends Model
{
    use HasFactory;
    protected $connection = 'mysql_2';
    public $timestamps =false;
    protected $primaryKey='programme_id';

    protected $table='tblprogramme';

    Protected $fillable=['programme_id','programme_name','programme_code','programme_type_id','faculty_id','department_id'];
}
