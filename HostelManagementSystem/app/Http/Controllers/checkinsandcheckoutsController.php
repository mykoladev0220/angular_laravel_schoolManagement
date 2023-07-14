<?php

namespace App\Http\Controllers;

use App\Models\checkin;
use App\Models\checkouts;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

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
    return response()->json(['error' => $ex->getMessage(), 'success' => false], 500);
    }

}
    }
    public function checkout(Request $request){
        $data=$request->validate([ ['date_checked', 'checked_by', 'receipt_number', 'room_allocation_id', 'reg_number', 'check_in_id']]);

        try{
            $check_out=new checkouts();
     $check_out::create($request->toArray());
            return response()->json(['message' => 'successfully checked out', 'success' => true], 200);
        }catch(QueryException $ex){
            if ($ex->errorInfo[1] == 1451) {
                return response()->json(['success' => false, 'message' => 'chekck out'], 403);

            } else {
            return response()->json(['error' => $ex->getMessage(), 'success' => false], 500);
            }

        }

    }
    public function cancel_checkout(Request $request){
        $data= $request->validate(['checkout_id'=>'required']);
       try{
        $checkout_id=$data['checkout_id'];
        $check_out=checkouts::find($checkout_id);
        $check_out->delete();
        return response()->json(['message' => 'successfully cancelled checkout', 'success' => true], 200);
       }catch(QueryException $ex){
        return response()->json(['error' => $ex->getMessage(), 'success' => false], 500);
       }



    }
}
