<?php
namespace App\Http\Controllers\Traits;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\active_period_hostel_online_application;
use App\Models\room;
use App\Models\roomapplication;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Traits;

trait applicationtrait{
    use Traits\roomallocationstrait;
    use Traits\studenttrait;
    use Traits\roomstatustrait;

    public function getStudentPendingApplications($regnumber)
    {

        $datenow = Carbon::now();
        $newDate = Carbon::createFromFormat('Y-m-d H:i:s', $datenow)
            ->format('Y-m-d');

    $myapplication = DB::select("SELECT
	COUNT(tbl_room_allocation_applications.room_allocation_application_id) as cntx
FROM
	tbl_room_allocation_applications
	INNER JOIN tbl_rooms ON tbl_room_allocation_applications.room_id = tbl_rooms.room_id
	INNER JOIN tbl_hostels ON tbl_rooms.hostel_id = tbl_hostels.hostel_id
	INNER JOIN tbl_locations ON tbl_hostels.location_id = tbl_locations.location_id
	INNER JOIN tbl_residence_sessions ON tbl_room_allocation_applications.residence_session_id = tbl_residence_sessions.residence_session_id
WHERE
	tbl_room_allocation_applications.application_status <> 1
	AND tbl_residence_sessions.end_date > '$newDate'
	AND tbl_room_allocation_applications.reg_number = '$regnumber'
");


$my_allocation = DB::select("SELECT
	COUNT(tbl_room_allocations.reg_number) as cntx
FROM
	tbl_room_allocations
	INNER JOIN tbl_rooms ON tbl_room_allocations.room_id = tbl_rooms.room_id
	INNER JOIN tbl_residence_sessions ON tbl_room_allocations.residence_session_id = tbl_residence_sessions.residence_session_id
	INNER JOIN tbl_floors ON tbl_rooms.floor_id = tbl_floors.floor_id
	INNER JOIN tbl_hostels ON tbl_floors.hostel_id = tbl_hostels.hostel_id
	INNER JOIN tbl_locations ON tbl_hostels.location_id = tbl_locations.location_id
WHERE
	tbl_room_allocations.reg_number = '$regnumber'
	AND tbl_residence_sessions.end_date > '$newDate'
	AND tbl_residence_sessions.available_status = 1
");
$application_pending=0;

if($my_allocation[0]->cntx>0 || $myapplication[0]->cntx >0)
{
    $application_pending=1;
}

        return $application_pending;
    }


    public function proccessApplications($room_application)
    {

        $result = null;
        if (! is_null($room_application)) {


            $datenow = Carbon::now();
            $active_period_id = $room_application->active_period_id;
            $room_id = $room_application->room_id;

            $active_period=active_period_hostel_online_application::find($active_period_id);

            $period_id=$active_period->period_id;
            $minimum_treshold_value= $this->getminimum_treshold($period_id);
            try {


                // $minimum_treshold = minimumTreshold::where('active_period_id', $active_period_id)->get();
                // return response()->json(['message' => "pano tasvika", $active_period_id, 'success' => false], 201);
                // $minimum_treshold_value = $minimum_treshold[0]->minimum_threshhold;

                $room_cost = room::join('tbl_room_type_costs', 'tbl_room_type_costs.room_type_id', '=', 'tbl_rooms.room_type_id')
                    ->where('tbl_room_type_costs.active_period_id', $active_period_id)
                    ->where('tbl_rooms.room_id', $room_id)
                    ->first();

                $room_cost_value = $room_cost->room_price;
                $feesBalance=$this->getFeesBalance($room_application['reg_number']);

                $total_cost = (float) $minimum_treshold_value + $room_cost_value;
                $feesBalance = $feesBalance;


                if ($total_cost <= $feesBalance) {

                    // allocate room
                    $processresult = 'allocated application ';
$this->Autoalocation($room_application);

                    log::info([
                        'message' => 'approved application',
                        'application_id' => $room_application->room_allocation_application_id,
                        'regnumber' => $room_application->reg_number,

                    ]);
                    $result = [
                        'message' => 'approved application',
                        'application_id' => $room_application->room_allocation_application_id,
                        'regnumber' => $room_application->reg_number,

                    ];
                    $room_number = $room_application->room_number;

                    return response()->json([
                        'message' => 'congats you have been allocated room'.$room_number, 'success' => true,
                    ], 200);
                } else {

                    log::info([
                        'message' => 'stalled application',
                        'application_id' => $room_application->room_allocation_application_id,
                        'regnumber' => $room_application->reg_number,

                    ]);
                    $result = [
                        'message' => 'stalled application',
                        'application_id' => $room_application->room_allocation_application_id,
                        'regnumber' => $room_application->reg_number,

                    ];
                    $expiration_date = $room_application->expiration_date;

                    return response()->json([
                        'message' => 'Your application is pending until'.$expiration_date.' please make sure you make the payments ', 'success' => false,
                    ], 200);
                }

                log::info('process sucessfully done');
            } catch (QueryException $ex) {
                if ($ex->errorInfo[1] == 1062) {
                    $room_application->application_status = 1;
                    $room_application->update();
                    log::info([
                        'message' => 'student already alocated',
                        'application_id' => $room_application->room_allocation_application_id,
                        'regnumber' => $room_application->reg_number,

                    ]);
                    $result = [
                        'message' => 'student already alocated',
                        'application_id' => $room_application->room_allocation_application_id,
                        'regnumber' => $room_application->reg_number,

                    ];

                    return response()->json(['message' => 'you are already allocated a room for this period', 'success' => false], 403);
                } else {

                    log::info([
                        'message' => $ex->getMessage(),
                        'application_id' => $room_application->room_allocation_application_id,
                        'regnumber' => $room_application->reg_number,

                    ]);
                    $result = [
                        'message' => $ex->getMessage(),
                        'application_id' => $room_application->room_allocation_application_id,
                        'regnumber' => $room_application->reg_number,

                    ];

                    return response()->json(['message' => $ex->getMessage(), 'success' => false], 500);
                }
            }

            log::channel('custom')->info('nothing done');

            if (is_null($result)) {
                return $result;
            } else {
                return implode(' ', $result);
            }
        } else {
            $processresult = 'pending';

            $datenow = Carbon::now();
            $room_applications = roomapplication::where('application_status', 0)->get();
            foreach ($room_applications as $room_application) {
                try {
                    $active_period_id = $room_application->active_period_id;
                    $room_id = $room_application->room_id;
                    $residenceSessionId = $room_application->residence_session_id;

                    $room_cost = room::join('tbl_room_type_costs', 'tbl_room_type_costs.room_type_id', '=', 'tbl_rooms.room_type_id')
                        ->where('tbl_room_type_costs.active_period_id', $active_period_id)
                        ->where('tbl_rooms.room_id', $room_id)
                        ->first();

                    $room_cost_value = $room_cost->room_price;

                    $active_period=active_period_hostel_online_application::find($active_period_id);
                    $period_id=$active_period->period_id;
                    $minimum_treshold_value=$this->getminimum_treshold($period_id);


                    $feesBalance=$this->getFeesBalance($room_application['reg_number']);


                    $total_cost = (float) $minimum_treshold_value + $room_cost_value;
                    $feesBalance = $feesBalance + 900;
                    if ($room_application->expiration_date >= $datenow) {

                        if ($total_cost <= $feesBalance) {

                            // allocate room
                            $processresult = 'allocated application ';
$this->Autoalocation($room_application);

                            log::info([
                                'message' => 'approved application',
                                'application_id' => $room_application->room_allocation_application_id,
                                'regnumber' => $room_application->reg_number,

                            ]);
                            $result = [
                                'message' => 'approved application',
                                'application_id' => $room_application->room_allocation_application_id,
                                'regnumber' => $room_application->reg_number,

                            ];
                        } else {

                            log::info([
                                'message' => 'stalled application',
                                'application_id' => $room_application->room_allocation_application_id,
                                'regnumber' => $room_application->reg_number,

                            ]);
                            $result = [
                                'message' => 'stalled application',
                                'application_id' => $room_application->room_allocation_application_id,
                                'regnumber' => $room_application->reg_number,

                            ];
                        }
                    } elseif ($room_application->expiration_date <= $datenow) {
                        if ($total_cost <= $feesBalance) {
                            // allocate room

                            $this->Autoalocation($room_application);


                            log::info([
                                'message' => 'approved application',
                                'application_id' => $room_application->room_allocation_application_id,
                                'regnumber' => $room_application->reg_number,
                                'room_cost' => $room_cost_value,
                            ]);

                            $result = [
                                'message' => 'approved application',
                                'application_id' => $room_application->room_allocation_application_id,
                                'regnumber' => $room_application->reg_number,

                            ];
                        } else {

                            // foreit application
                            $room_application->application_status = 2;
                            $room_application->update();

                            $room_status['residence_session_id'] = $residenceSessionId;

                            $room_status['room_id'] = $room_id;
                            $room_status['active_period_id'] = $active_period_id;

                            $room_status['room_status'] = '1';
                            $result=$this->updateRoomStatus($room_status);


                            log::info([
                                'message' => 'fofeited  application',
                                'application_id' => $room_application->room_allocation_application_id,
                                'regnumber' => $room_application->reg_number,

                            ]);
                            $result = [
                                'message' => 'fofeited  application',
                                'application_id' => $room_application->room_allocation_application_id,
                                'regnumber' => $room_application->reg_number,

                            ];
                        }
                    }

                    log::info('process sucessfully done');
                } catch (QueryException $ex) {
                    if ($ex->errorInfo[1] == 1062) {
                        $room_application->application_status = 1;
                        $room_application->update();
                        log::info([
                            'message' => 'student already alocated',
                            'application_id' => $room_application->room_allocation_application_id,
                            'regnumber' => $room_application->reg_number,

                        ]);
                        $result = [
                            'message' => 'student already alocated',
                            'application_id' => $room_application->room_allocation_application_id,
                            'regnumber' => $room_application->reg_number,

                        ];
                    } else {

                        log::info([
                            'message' => $ex->getMessage(),
                            'application_id' => $room_application->room_allocation_application_id,
                            'regnumber' => $room_application->reg_number,

                        ]);
                        $result = [
                            'message' => $ex->getMessage(),
                            'application_id' => $room_application->room_allocation_application_id,
                            'regnumber' => $room_application->reg_number,

                        ];
                    }
                }
            }
            log::channel('custom')->info('nothing done');

            if (is_null($result)) {
                return $result;
            } else {
                return implode(' ', $result);
            }
        }
    }

}
?>
