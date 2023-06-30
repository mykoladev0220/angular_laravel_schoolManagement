<?php
namespace App\Http\Controllers\Traits;
use App\Models\roomAllocation;
trait roomallocationstrait{
    public function Autoalocation($room_application)
    {
        $room_allocation = new roomAllocation();
        $room_allocation->student_id = $room_application->student_id;
        $room_allocation->reg_number = $room_application->reg_number;
        $room_allocation->room_id = $room_application->room_id;
        $room_allocation->active_period_id = $room_application->active_period_id;
        $room_allocation->residence_session_id = $room_application->residence_session_id;
        $room_allocation->application_id = $room_application->room_allocation_application_id;
        $room_allocation->approved_status = '1';
        $room_allocation->approved_by = 'system';
        $room_allocation->allocated_by = 'system';
        $room_allocation->save();
        $room_application->application_status = 1;
        $room_application->update();
    }
}


?>
