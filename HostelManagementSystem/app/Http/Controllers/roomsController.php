<?php

namespace App\Http\Controllers;

use App\Models\room;
use App\Models\roomtype;
use Illuminate\Http\Request;
use App\Models\roomAllocation;
use App\Models\roomapplication;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class roomsController extends Controller
{
    //
    public function createRoom(Request $request)
    {
        $request->validate([
            'room_number' => 'required', 'room_type_id' => 'required', 'floor_id' => 'required', 'room_gender' => 'required', 'hostel_id' => 'required',
        ]);
        $room = new room();
        try {
            $roomtype = roomtype::find($request['room_type_id']);
            $room->room_capacity = $roomtype->room_capacity;
            $room->room_number = $request->input('room_number');
            $room->room_type_id = $request->input('room_type_id');
            $room->floor_id = $request->input('floor_id');
            $room->room_gender = $request->input('room_gender');

            $room->hostel_id = $request->input('hostel_id');
            $room->save();
            $hostel_id = $request['hostel_id'];
            $rooms = room::join('tbl_floors', 'tbl_floors.floor_id', '=', 'tbl_rooms.floor_id')->join('tbl_hostels', 'tbl_hostels.hostel_id', '=', 'tbl_rooms.hostel_id')
                ->join('tbl_room_types', 'tbl_room_types.room_type_id', '=', 'tbl_rooms.room_type_id')
                ->where('tbl_rooms.hostel_id', $hostel_id)->get();
            return response()->json(['message' => 'successfully created room', 'success' => true, 'rooms' => $rooms], 200);
        } catch (QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return response()->json(['success' => false, 'message' => 'room number already exist'], 501);
            } else {
                return response()->json(['message' => $e->getMessage(), 'success' => false], 521);
            }
        }
    }

    public function updateRoom(Request $request)
    {
        $request->validate([
            'room_number' => 'required',  'room_type_id' => 'required', 'room_gender' => 'required', 'hostel_id' => 'required',
        ]);


        try {
            $room_id = $request['room_id'];

            $room = room::find($room_id);
            $room->room_number = $request['room_number'];

            $room->room_type_id = $request['room_type_id'];
            $room->room_gender = $request['room_gender'];

            $room->update();
            $hostel_id = $request['hostel_id'];
            $rooms = room::join('tbl_floors', 'tbl_floors.floor_id', '=', 'tbl_rooms.floor_id')->join('tbl_hostels', 'tbl_hostels.hostel_id', '=', 'tbl_rooms.hostel_id')
                ->join('tbl_room_types', 'tbl_room_types.room_type_id', '=', 'tbl_rooms.room_type_id')
                ->where('tbl_rooms.hostel_id', $hostel_id)->get();
            return response()->json(['message' => 'successfully updated room', 'success' => true, 'rooms' => $rooms], 200);
        } catch (QueryException $ex) {
            if ($ex->errorInfo[1] == 1062) {
                return response()->json(['success' => false, 'message' => 'room number already exist'], 501);
            } else {
                return response()->json(['error' => $ex->getMessage(), 'success' => false], 500);
            }
        }
    }

    public function deleteRoom(Request $request)
    {
        $request->validate([
            'room_number' => 'required', 'room_id' => 'required', 'room_type_id' => 'required', 'room_gender' => 'required', 'hostel_id' => 'required',
        ]);
        $room_id = $request['room_id'];
        $hostel_id = $request['hostel_id'];

        try {

            $room = room::find($request['room_id']);

            $room->delete();
            $rooms = room::join('tbl_floors', 'tbl_floors.floor_id', '=', 'tbl_rooms.floor_id')->join('tbl_hostels', 'tbl_hostels.hostel_id', '=', 'tbl_rooms.hostel_id')
                ->join('tbl_room_types', 'tbl_room_types.room_type_id', '=', 'tbl_rooms.room_type_id')
                ->where('tbl_rooms.hostel_id', $hostel_id)->get();
            return response()->json(['message' => 'successfully deleted room', 'success' => true, 'rooms' => $rooms], 200);
        } catch (QueryException $e) {

            if ($e->errorInfo[1] == 1451) {
                return response()->json(['success' => false, 'message' => 'room cannot be deleted, other parts of the system are dependent on this room'], 501);
            } else {
                return response()->json(['error' => $e->getMessage(), 'success' => false], 500);
            }
        }
    }

    public function searchRoom(Request $request)
    {
        try {

            $room = room::find($request['room_id']);

            return response()->json($room);
        } catch (QueryException $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }

    public function getRooms(Request $request)
    {
        $request->validate(['hostel_id' => 'required']);

        $hostel_id = $request['hostel_id'];
        try {

            $rooms = room::join('tbl_floors', 'tbl_floors.floor_id', '=', 'tbl_rooms.floor_id')->join('tbl_hostels', 'tbl_hostels.hostel_id', '=', 'tbl_rooms.hostel_id')
                ->join('tbl_room_types', 'tbl_room_types.room_type_id', '=', 'tbl_rooms.room_type_id')
                ->where('tbl_rooms.hostel_id', $hostel_id)->get();

            return response()->json($rooms);
        } catch (QueryException $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }


    public function getRoomOccupants(Request $request)
    {
        $validdata = $request->validate(['residence_session_id' => 'required|numeric', 'room_id' => 'required|numeric']);
        $residence_session_id = $validdata['residence_session_id'];
        $room_id = $validdata['room_id'];

        $matchconditions = ['residence_session_id' => $residence_session_id, 'room_id' => $room_id];
        $roomoccupants = roomAllocation::join('registry.tblstudent','registry.tblstudent.reg_number','=','tbl_room_allocations.reg_number')->where($matchconditions)->where('approved_status', '!=', '2')->get('registry.tblstudent.*');

        $applicants = roomapplication::join('registry.tblstudent','registry.tblstudent.reg_number','=','tbl_room_allocation_applications.reg_number')->where($matchconditions)->where('application_status', '=', '0')->get('registry.tblstudent.*');


        foreach($applicants as $applicant ){

        $roomoccupants->push($applicant);
        }

        return response()->json( $roomoccupants);

    }
}
