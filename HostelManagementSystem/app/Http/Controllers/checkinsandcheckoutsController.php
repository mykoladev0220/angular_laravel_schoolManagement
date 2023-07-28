<?php

namespace App\Http\Controllers;

use App\Models\checkin;
use App\Models\checkouts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class checkinsandcheckoutsController extends Controller
{

    public function checkin(Request $request){

     $request->validate(['date_checked'=>'required','checked_by'=>'required','room_allocation_id'=>'required','reg_number'=>'required']);
try{
    $check_in= new checkin();
    $check_in::create($request->toArray());
    return response()->json(['message' => 'student checked successfully', 'success' => true], 200);
}catch(QueryException $ex){
    if ($ex->errorInfo[1] == 1062) {
        return response()->json(['message' => 'student already checked in', 'success' => false], 403);
    } else {
        return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
    }
}


    }
    public function cancel_checkin(Request $request){

        $check_in=$request->validate(['check_in_id'=>'required']);
        $check_in_id=$check_in['check_in_id'];


try{
    $check_in = checkin::find($check_in_id);
    $check_in->delete();
    return response()->json(['message' => 'successfully reversed check in', 'success' => true], 200);
}catch(QueryException $ex){
    if ($ex->errorInfo[1] == 1451) {
        return response()->json(['success' => false, 'message' => 'cannot cancel check in'], 403);

    } else {
    return response()->json(['message' => $ex->getMessage(), 'success' => false], 500);
    }

}
    }
    public function checkout(Request $request){
        $data=$request->validate( ['date_checked'=>'required', 'checked_by'=>'required', 'room_allocation_id'=>'required', 'reg_number'=>'required', 'check_in_id'=>'required']);

        try{
            $check_out=new checkouts();
     $check_out::create($request->toArray());
            return response()->json(['message' => 'successfully checked out', 'success' => true], 200);
        }catch(QueryException $ex){
            if ($ex->errorInfo[1] == 1451) {
                return response()->json(['success' => false, 'message' => 'chekck out'], 403);

            } else {
            return response()->json(['message' => $ex->getMessage(), 'success' => false], 500);
            }

        }

    }
    public function getCheckindata(Request $request ){
        $data= $request->validate(['residence_session_id' => 'required']);
        $residence_session_id=$data['residence_session_id'];
        $checkindata= DB::select("SELECT
        tbl_room_type_costs.room_type_cost_id,
        tbl_room_type_costs.room_price,
        tbl_room_allocations.room_allocation_id,
        tbl_room_allocations.active_period_id,
        tbl_room_allocations.room_id,
        tbl_room_allocations.student_id,
        tbl_room_allocations.date_allocated,
        tbl_room_allocations.allocated_by,
        tbl_room_allocations.residence_session_id,
        tbl_room_allocations.reg_number,
        tbl_room_allocations.approved_status,
        tbl_room_allocations.approved_by,
        tbl_rooms.room_number,
        tbl_floors.floor_name,
        tbl_hostels.hostel_name,
        tbl_locations.location_id,
        tbl_locations.location_name,
        tbl_room_types.room_type_id,
        tbl_room_types.room_type,
        tbl_rooms.room_gender,
        tbl_rooms.room_capacity
    FROM
        tbl_room_allocations
        INNER JOIN tbl_rooms ON tbl_room_allocations.room_id = tbl_rooms.room_id
        INNER JOIN tbl_floors ON tbl_rooms.floor_id = tbl_floors.floor_id
        INNER JOIN tbl_room_types ON tbl_rooms.room_type_id = tbl_room_types.room_type_id
        INNER JOIN tbl_hostels ON tbl_floors.hostel_id = tbl_hostels.hostel_id
        INNER JOIN tbl_locations ON tbl_hostels.location_id = tbl_locations.location_id
        INNER JOIN tbl_room_type_costs ON tbl_room_types.room_type_id = tbl_room_type_costs.room_type_id
        AND tbl_room_allocations.active_period_id = tbl_room_type_costs.active_period_id
    WHERE
        tbl_room_allocations.residence_session_id = $residence_session_id
        AND tbl_room_allocations.approved_status = 1
        AND tbl_room_allocations.room_allocation_id NOT IN ((
            SELECT
                tbl_check_ins.room_allocation_id
            FROM
                tbl_check_ins
            ))
    ORDER BY
        tbl_room_allocations.room_allocation_id DESC");


return response()->json(['allocations_appproved' =>  $checkindata],200);
    }

    public function getCheckinRepotdata(Request $request ){
        $data= $request->validate(['residence_session_id' => 'required']);
        $residence_session_id=$data['residence_session_id'];
        $checkindata= DB::select("SELECT
        tbl_room_type_costs.room_type_cost_id,
        tbl_room_type_costs.room_price,
        tbl_room_allocations.room_allocation_id,
        tbl_room_allocations.active_period_id,
        tbl_room_allocations.room_id,
        tbl_room_allocations.student_id,
        tbl_room_allocations.date_allocated,
        tbl_room_allocations.allocated_by,
        tbl_room_allocations.residence_session_id,
        tbl_room_allocations.reg_number,
        tbl_room_allocations.approved_status,
        tbl_room_allocations.approved_by,
        tbl_rooms.room_number,
        tbl_floors.floor_name,
        tbl_hostels.hostel_name,
        tbl_locations.location_id,
        tbl_locations.location_name,
        tbl_room_types.room_type_id,
        tbl_room_types.room_type,
        tbl_rooms.room_gender,
        tbl_rooms.room_capacity,
        tbl_check_ins.date_checked,
        tbl_check_ins.receipt_number,
        tbl_check_ins.created_at
    FROM
        tbl_room_allocations
        INNER JOIN tbl_rooms ON tbl_room_allocations.room_id = tbl_rooms.room_id
        INNER JOIN tbl_floors ON tbl_rooms.floor_id = tbl_floors.floor_id
        INNER JOIN tbl_room_types ON tbl_rooms.room_type_id = tbl_room_types.room_type_id
        INNER JOIN tbl_hostels ON tbl_floors.hostel_id = tbl_hostels.hostel_id
        INNER JOIN tbl_locations ON tbl_hostels.location_id = tbl_locations.location_id
        INNER JOIN tbl_room_type_costs ON tbl_room_types.room_type_id = tbl_room_type_costs.room_type_id
        AND tbl_room_allocations.active_period_id = tbl_room_type_costs.active_period_id
        INNER JOIN tbl_check_ins ON tbl_room_allocations.room_allocation_id = tbl_check_ins.room_allocation_id
    WHERE
        tbl_room_allocations.residence_session_id = $residence_session_id
        AND tbl_room_allocations.approved_status = 1
    ORDER BY
        tbl_room_allocations.room_allocation_id DESC");


return response()->json(['checkin_report' =>  $checkindata],200);
    }
 public function getCheckoutdata(Request $request ){
        $data= $request->validate(['residence_session_id' => 'required']);
        $residence_session_id=$data['residence_session_id'];
        $checkoutdata= DB::select("SELECT
        tbl_room_type_costs.room_type_cost_id,
        tbl_room_type_costs.room_price,
        tbl_room_allocations.room_allocation_id,
        tbl_room_allocations.active_period_id,
        tbl_room_allocations.room_id,
        tbl_room_allocations.student_id,
        tbl_room_allocations.date_allocated,
        tbl_room_allocations.allocated_by,
        tbl_room_allocations.residence_session_id,
        tbl_room_allocations.reg_number,
        tbl_room_allocations.approved_status,
        tbl_room_allocations.approved_by,
        tbl_rooms.room_number,
        tbl_floors.floor_name,
        tbl_hostels.hostel_name,
        tbl_locations.location_id,
        tbl_locations.location_name,
        tbl_room_types.room_type_id,
        tbl_room_types.room_type,
        tbl_rooms.room_gender,
        tbl_rooms.room_capacity,
        tbl_check_ins.date_checked,
        tbl_check_ins.receipt_number,
        tbl_check_ins.created_at,
        tbl_check_ins.checkin_id as check_in_id
    FROM
        tbl_room_allocations
        INNER JOIN tbl_rooms ON tbl_room_allocations.room_id = tbl_rooms.room_id
        INNER JOIN tbl_floors ON tbl_rooms.floor_id = tbl_floors.floor_id
        INNER JOIN tbl_room_types ON tbl_rooms.room_type_id = tbl_room_types.room_type_id
        INNER JOIN tbl_hostels ON tbl_floors.hostel_id = tbl_hostels.hostel_id
        INNER JOIN tbl_locations ON tbl_hostels.location_id = tbl_locations.location_id
        INNER JOIN tbl_room_type_costs ON tbl_room_types.room_type_id = tbl_room_type_costs.room_type_id
        AND tbl_room_allocations.active_period_id = tbl_room_type_costs.active_period_id
        INNER JOIN tbl_check_ins ON tbl_room_allocations.room_allocation_id = tbl_check_ins.room_allocation_id
    WHERE
        tbl_room_allocations.residence_session_id = $residence_session_id
        AND tbl_room_allocations.approved_status = 1
        AND tbl_check_ins.checkin_id NOT IN ((
            SELECT
            check_in_id
            FROM
                tbl_check_outs
            ))
    ORDER BY
        tbl_room_allocations.room_allocation_id DESC");


return response()->json(['checkoutdata' =>  $checkoutdata],200);
    }

    public function getCheckoutReport(Request $request ){
        $data= $request->validate(['residence_session_id' => 'required']);
        $residence_session_id=$data['residence_session_id'];
        $checkoutreportdata= DB::select("SELECT
        tbl_room_type_costs.room_type_cost_id,
        tbl_room_type_costs.room_price,
        tbl_room_allocations.room_allocation_id,
        tbl_room_allocations.active_period_id,
        tbl_room_allocations.room_id,
        tbl_room_allocations.student_id,
        tbl_room_allocations.date_allocated,
        tbl_room_allocations.allocated_by,
        tbl_room_allocations.residence_session_id,
        tbl_room_allocations.reg_number,
        tbl_room_allocations.approved_status,
        tbl_room_allocations.approved_by,
        tbl_rooms.room_number,
        tbl_floors.floor_name,
        tbl_hostels.hostel_name,
        tbl_locations.location_id,
        tbl_locations.location_name,
        tbl_room_types.room_type_id,
        tbl_room_types.room_type,
        tbl_rooms.room_gender,
        tbl_rooms.room_capacity,
        tbl_check_ins.date_checked,
        tbl_check_ins.receipt_number,
        tbl_check_ins.created_at
    FROM
        tbl_room_allocations
        INNER JOIN tbl_rooms ON tbl_room_allocations.room_id = tbl_rooms.room_id
        INNER JOIN tbl_floors ON tbl_rooms.floor_id = tbl_floors.floor_id
        INNER JOIN tbl_room_types ON tbl_rooms.room_type_id = tbl_room_types.room_type_id
        INNER JOIN tbl_hostels ON tbl_floors.hostel_id = tbl_hostels.hostel_id
        INNER JOIN tbl_locations ON tbl_hostels.location_id = tbl_locations.location_id
        INNER JOIN tbl_room_type_costs ON tbl_room_types.room_type_id = tbl_room_type_costs.room_type_id
        AND tbl_room_allocations.active_period_id = tbl_room_type_costs.active_period_id
        INNER JOIN tbl_check_ins ON tbl_room_allocations.room_allocation_id = tbl_check_ins.room_allocation_id
    WHERE
        tbl_room_allocations.residence_session_id = $residence_session_id
        AND tbl_room_allocations.approved_status = 1
        AND tbl_check_ins.checkin_id  IN ((
            SELECT
            check_in_id
            FROM
                tbl_check_outs
            ))
    ORDER BY
        tbl_room_allocations.room_allocation_id DESC");


return response()->json(['checkoutreportdata' =>  $checkoutreportdata],200);
    }


    public function cancel_checkout(Request $request){
        $data= $request->validate(['checkout_id'=>'required']);
       try{
        $checkout_id=$data['checkout_id'];
        $check_out=checkouts::find($checkout_id);
        $check_out->delete();
        return response()->json(['message' => 'successfully cancelled checkout', 'success' => true], 200);
       }catch(QueryException $ex){
        return response()->json(['message' => $ex->getMessage(), 'success' => false], 500);
       }



    }
}
