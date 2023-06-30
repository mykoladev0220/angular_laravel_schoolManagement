<?php

namespace App\Http\Controllers;

use App\Models\active_period_hostel_online_application;
use App\Models\blacklistedstudent;
use App\Models\minimumTreshold;
use App\Models\period;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class studentDetailsController extends Controller
{
    public function findStudent(Request $request){
        $request->validate(['reg_number']);
        $regnumber=$request['reg_number'];
if($this->getStudentDetails($regnumber)==null){
    return response()->json(['message' => 'student not found ', 'success' => false], 403);

}
return response()->json($this->getStudentDetails($regnumber), 200);

    }
   


}
