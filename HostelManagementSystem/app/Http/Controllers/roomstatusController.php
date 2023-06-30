<?php

namespace App\Http\Controllers;


use App\Models\roomstatus;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class roomstatusController extends Controller
{

    public  function createRoomStatus(Request $request)
    {
        $request->validate(['room_status' => 'required', 'room_id' => 'required', 'period_id' => 'required', 'residence_session_id' => 'required']);

        try {
            $room_status = new roomstatus();
            $room_status->room_status = $request['room_status'];
            $room_status->room_id = $request['room_id'];
            $room_status->period_id = $request['period_id'];
            $room_status->residence_session_id = $request['residence_session_id'];
            $room_status->save();
        } catch (QueryException $ex) {
            if ($ex->errorInfo[1] ==  1062) {
                return response()->json(['message' => "room stautus already set", 'success' => false], 500);
            } else {
                return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
            }
        }
        return response()->json(['message' => 'successfully set room status', 'success' => true], 200);
    }
  
}
