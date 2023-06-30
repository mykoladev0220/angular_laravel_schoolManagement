<?php
namespace App\Http\Controllers\Traits;

use App\Models\roomstatus;
use Illuminate\Database\QueryException;



trait roomstatustrait{

    public function updateRoomStatus($room_status)
    {

        $room_id = $room_status['room_id'];
        $active_period_id = $room_status['active_period_id'];
        $residence_session_id = $room_status['residence_session_id'];
        $matchConditions = ['room_id' => $room_id, 'active_period_id' => $active_period_id, 'residence_session_id' => $residence_session_id];

        try {
            $roomstatus = roomstatus::where($matchConditions)
                ->first();
            if (!$roomstatus) {
                $roomstatus = new roomstatus();
                $roomstatus->room_status = $room_status['room_status'];
                $roomstatus->room_id = $room_status['room_id'];
                $roomstatus->active_period_id = $room_status['active_period_id'];
                $roomstatus->residence_session_id = $room_status['residence_session_id'];
                $roomstatus->save();
            } else {
                $roomstatus->room_status = $room_status['room_status'];
                $roomstatus->room_id = $room_status['room_id'];
                $roomstatus->active_period_id = $room_status['active_period_id'];
                $roomstatus->residence_session_id = $room_status['residence_session_id'];
                $roomstatus->update();
            }

            return 1;
        } catch (QueryException $ex) {
            return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
        }
    }


}
