<?php

namespace App\Http\Controllers\auths;

use App\Http\Controllers\Controller;
use App\Models\student;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Traits;


class studentAuthcontroller extends Controller
{
    //login function
    // use Traits\authtrait;
    use Traits\studenttrait;
    use Traits\applicationtrait;
    public function login(Request $request)
    {


        $validator = $request->validate(['reg_number' => 'required|string', 'password' => 'required|string']);
        $regnumber = $validator['reg_number'];
        $password = $validator['password'];

        try {
            $is_blacklisted = $this->is_blacklisted($regnumber);
            $students = student::join('tblstudent_passwords', 'tblstudent.reg_number', '=', 'tblstudent_passwords.regnum')
                ->where('tblstudent.reg_number', $regnumber)
                ->where('tblstudent_passwords.password', $password)
                ->first();

            if ($students) {
                $is_blacklisted = $this->is_blacklisted($regnumber);

                if ($is_blacklisted == 1) {
                    return response()->json(['success' => false, 'message' => 'sorry you are currently blacklisted please contact your administrator for help'], 401);
                }

                $student_details = $this->getStudentDetails($regnumber);


                $student_id = DB::connection('mysql_2')->select("SELECT
                tblstudent.student_id
            FROM
                tblstudent
            WHERE
                tblstudent.reg_number = '$regnumber'");
                $student_id = $student_id[0]->student_id;

                $is_registered = $this->is_student_registered($student_id);

                $hasapplication = $this->getStudentPendingApplications($regnumber);


                // if ($is_registered == 0) {
                //     return response()->json(['success' => false, 'message' => 'you are currently not registered'], 401);
                // }else if($is_registered<0){
                //     return response()->json(['success' => false, 'message' => 'currently there are no periods to apply'], 401);
                // }


                $fees_balance = $this->getFeesBalance($regnumber);


                $period_id = $student_details[0]->period_id;

                $minimum_threshhold = $this->getminimum_treshold($period_id);
            

                // if($minimum_threshhold>$fees_balance){
                //     return response()->json(['success' => false, 'message' => "sorry your fees does not meet the minimum fees threshold " ], 403);
                // }



                $token = $students->createToken('Laravel Password Grant Client')->accessToken;

                return response()->json(['student' => $student_details[0], 'hasapplied' => $hasapplication, 'access_token' => $token]);
            }

            return response()->json(['success' => false, 'message' => 'username or password not correct'], 401);
        } catch (QueryException $ex) {
            return response()->json(['success' => false, $ex->getMessage()], 401);
        }
    }
}
