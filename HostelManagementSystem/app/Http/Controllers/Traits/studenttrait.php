<?php
namespace App\Http\Controllers\Traits;

use Carbon\Carbon;
use App\Models\subwarden;
use App\Models\minimumTreshold;
use App\Models\blacklistedstudent;
use Illuminate\Support\Facades\DB;
use App\Models\active_period_hostel_online_application;

trait studenttrait{

    public function is_blacklisted($reg_number)
    {

        $isblacklisted = blacklistedstudent::where('student_regnumber', $reg_number)->first();



        if ($isblacklisted) {
            return 1;
        } else {
            return 0;
        }
    }


    public function getFeesBalance($reg_number)
    {
        $result = DB::connection('mysql_2')->select("SELECT registry.tblbursary_link.accountnumber FROM registry.tblbursary_link WHERE registry.tblbursary_link.regnum= '$reg_number'");
        $accountnumber = $result[0]->accountnumber;

        $feesBal = DB::connection('mysql_2')->select("SELECT ((SUM(debit)*-1)+SUM(credit)) AS balance FROM registry.`tblpastel_transactions` where registry.`tblpastel_transactions`.`account_number`=  '" . $accountnumber . "'");

        return $feesBal[0]->balance;
    }


    public function is_student_registered($student_id)
    {


        $datenow = $datenow = Carbon::now();
        $newDate = Carbon::createFromFormat('Y-m-d H:i:s', $datenow)
            ->format('Y-m-d');

        $active_period = active_period_hostel_online_application::where('is_active', 1)->get();

        $count = 0;
        if (count($active_period)) {

            foreach ($active_period as $period) {
                $period_id = $period->period_id;
                $registered = DB::connection('mysql_2')->select("SELECT
                COUNT( registry.tblprogramme_session.programme_session_id ) AS cntx
            FROM
                registry.tblprogramme_session
                INNER JOIN registry.tblregistration ON registry.tblregistration.programme_session_id = registry.tblprogramme_session.programme_session_id
                INNER JOIN registry.tblperiod ON registry.tblregistration.period_id = registry.tblperiod.period_id
            WHERE
                registry.tblprogramme_session.student_id = '$student_id'
                AND (
                    registry.tblregistration.period_id =$period_id
                AND registry.tblperiod.end_date > '$newDate'
                )");
                if ($registered[0]->cntx > 0) {
                    $count++;
                }
            }
        } else {
            $count = -5;
        }

        return $count;
    }

    public function getminimum_treshold($period_id)
    {
        $minimum_treshold = minimumTreshold::where('period_id', $period_id)->first();

        if ($minimum_treshold) {
            $minimum_treshold_value = $minimum_treshold->minimum_threshhold;

            return $minimum_treshold_value;
        } else {
            return 0;
        }
    }

    public function getStudentDetails($reg_number)
    {
        $student = DB::connection('mysql_2')->select("
        SELECT
        tblstudent.reg_number,
        tblstudent.first_name,
        tblstudent.surname,
        tblprogramme_session.intake_id,
        tblregistration.registration_id,
        tblregistration.period_id,
        tblregistration.date_registered,
        tblregistration_level.academic_level,
        tblregistration_level.semester,
        tblstudent.student_id,
        tblbursary_link.accountnumber,
        tblstudent_personal.sex,
        tblprogramme.programme_code
    FROM
        tblstudent
        INNER JOIN tblprogramme_session ON tblstudent.student_id = tblprogramme_session.student_id
        INNER JOIN tblregistration ON tblprogramme_session.programme_session_id = tblregistration.programme_session_id
        INNER JOIN tblregistration_level ON tblregistration.registration_id = tblregistration_level.registration_id
        INNER JOIN tblbursary_link ON tblstudent.reg_number = tblbursary_link.regnum
        INNER JOIN tblstudent_personal ON tblstudent.student_id = tblstudent_personal.student_id
        INNER JOIN tblintake ON tblprogramme_session.intake_id = tblintake.intake_id
        INNER JOIN tblprogramme ON tblintake.programme_id = tblprogramme.programme_id
    WHERE
        tblstudent.reg_number = '$reg_number'
    ORDER BY
        tblregistration.registration_id DESC
        LIMIT 1
        ");

        return $student;
    }


    public function getwardenDetails($reg_number){
        $warden_session=subwarden::join('tbl_subwaden_ressidence_sessions','tbl_subwaden_ressidence_sessions.subwarden_id','=','tbl_subwardens.subwarden_id')->where('tbl_subwardens.reg_number',$reg_number)->orderby('tbl_subwaden_ressidence_sessions.subwarden_residence_session_id','Desc')->first();
if($warden_session)

     {
        return $warden_session;
     }
     return null;

    }
}
