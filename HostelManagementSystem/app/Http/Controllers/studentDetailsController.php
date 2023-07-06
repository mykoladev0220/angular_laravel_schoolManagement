<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits;
use Illuminate\Http\Request;


class studentDetailsController extends Controller
{
    use traits\studenttrait;



    public function findStudent(Request $request){
        $request->validate(['reg_number']);
        $regnumber=$request['reg_number'];
if($this->getStudentDetails($regnumber)==null){
    return response()->json(['message' => 'student not found ', 'success' => false], 403);

}
return response()->json($this->getStudentDetails($regnumber), 200);

    }



}
