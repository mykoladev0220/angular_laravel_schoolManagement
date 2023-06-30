<?php
namespace App\Http\Controllers\Traits;

use Carbon\Carbon;
use App\Models\minimumTreshold;
use App\Models\blacklistedstudent;
use Illuminate\Support\Facades\DB;
use App\Models\active_period_hostel_online_application;

trait authtrait{

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


}

?>
