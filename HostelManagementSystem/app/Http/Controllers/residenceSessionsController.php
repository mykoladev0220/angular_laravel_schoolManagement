<?php

namespace App\Http\Controllers;

use App\Models\hostelpreference;
use App\Models\preference_level;
use App\Models\program_session;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\residenceSession;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class residenceSessionsController extends Controller
{
    //
    public function getBatches(Request $request)
    {
        try {
            $id = $request['active_period_id'];
            $residence_session = DB::select("SELECT
            tbl_residence_sessions.*
        FROM
            tbl_residence_sessions
        WHERE
            tbl_residence_sessions.active_period_id = $id
        ORDER BY
            tbl_residence_sessions.residence_session_id DESC");



            return response()->json($residence_session, 200);
        } catch (QueryException $ex) {
            return response()->json(['error' => $ex->getMessage()], 403);
        }
    }
    public function getAllBatches()
    {
        $batches = residenceSession::all();
        return response()->json($batches, 200);
    }


    public function getStudentBatches(Request $request)
    {
        $request->validate([

            'level' => 'required',
            'semester' => 'required',
            'period_id' => 'required',
            'programme_code' => 'required|string'
        ]);
        $datenow = $datenow = Carbon::now();
        $newDate = Carbon::createFromFormat('Y-m-d H:i:s', $datenow)
            ->format('Y-m-d');
        $level = $request['level'];
        $period = $request['period_id'];
        $semester = $request['semester'];
        $programme_code = $request['programme_code'];
        $batches = DB::select("SELECT
        tbl_residence_sessions.session_name,
        tbl_residence_sessions.active_period_id,
        tbl_active_period_hostel_online_application.period_id,
        tbl_residence_sessions.residence_session_id,
        tbl_residence_sessions.start_date,
        tbl_residence_sessions.available_status,
        tbl_residence_sessions.end_date,
        tbl_level_preference.academic_level,
        tbl_level_preference.semester
    FROM
        tbl_residence_sessions
        INNER JOIN
        tbl_active_period_hostel_online_application
        ON
            tbl_residence_sessions.active_period_id = tbl_active_period_hostel_online_application.active_period_id
        INNER JOIN
        tbl_level_preference
        ON
            tbl_residence_sessions.residence_session_id = tbl_level_preference.residence_session_id
        LEFT JOIN
        tbl_programme_sessions
        ON
            tbl_residence_sessions.residence_session_id = tbl_programme_sessions.residence_session_id AND
            tbl_level_preference.preference_level_id = tbl_programme_sessions.preference_level_id
    WHERE
        tbl_active_period_hostel_online_application.period_id = $period AND
        tbl_residence_sessions.end_date > '$newDate' AND
        tbl_residence_sessions.available_status = 1 AND
        tbl_level_preference.academic_level = $level AND
        tbl_level_preference.semester = $semester AND
        (
            tbl_residence_sessions.is_program_driven = 0 OR
            (
                tbl_residence_sessions.is_program_driven = 1 AND
                tbl_programme_sessions.programme_code = '$programme_code'
            )
        )");


        return response()->json($batches, 200);
    }
    public function deleteBatch(Request $request)
    {
        $request->validate([
            'residence_session_id' => 'required',
        ]);
        try {
            $residence_session = residenceSession::find($request['residence_session_id']);
            $residence_session->delete();
            $id = $request['active_period_id'];
            $residence_session = DB::select("SELECT
            tbl_residence_sessions.*
        FROM
            tbl_residence_sessions
        WHERE
            tbl_residence_sessions.active_period_id = $id
        ORDER BY
            tbl_residence_sessions.residence_session_id DESC");



            return response()->json(['message' => 'successfully deleted', 'success' => true, 'residence_session' =>  $residence_session], 200);
        } catch (QueryException $e) {

            if ($e->errorInfo[1] == 1451) {
                return response()->json(['success' => false, 'message' => 'batch cannot be deleted, other parts of the system are dependent on this batch'], 501);
            } else {
                return response()->json(['error' => $e->getMessage(), 'success' => false], 500);
            }
        }
    }

    public function activateBatch(Request $request)

    {
        $request->validate([
            'residence_session_id' => 'required', 'available_status' => 'required',
            'is_program_driven' => 'required'

        ]);
        $residence_session_id = $request['residence_session_id'];
        $is_program_driven = $request['is_program_driven'];
        try {
            $hostelspreference = hostelpreference::where('residence_session_id', $residence_session_id)->count();
            if ($hostelspreference <= 0) {
                return response()->json(['message' => 'you need to add hostels before activating a batch', 'success' => false], 403);
            }

            $leveprefence = preference_level::where('residence_session_id', $residence_session_id)->count();
            if ($leveprefence <= 0) {
                return response()->json(['message' => 'you need to levels before activating a batch', 'success' => false], 403);
            }

            $programme_preference = program_session::where('residence_session_id', $residence_session_id)->count();
            if ($programme_preference <= 0 && $is_program_driven == '1') {
                return response()->json(['message' => 'you need to add programmes before activating a batch', 'success' => false], 403);
            }
            $datenow = $datenow = Carbon::now();
            $newDate = Carbon::createFromFormat('Y-m-d H:i:s', $datenow)
                ->format('Y-m-d');
            $enddate = $request['end_date'];

            if ($enddate < $newDate) {
                return response()->json(['message' => 'cannot activate an expired batch'], 500);
            }

            $residence_session = residenceSession::find($residence_session_id);
            $residence_session->available_status = 1;

            $residence_session->update();
            $id = $request['active_period_id'];
            $residence_session = DB::select("SELECT
            tbl_residence_sessions.*
        FROM
            tbl_residence_sessions
        WHERE
            tbl_residence_sessions.active_period_id = $id
        ORDER BY
            tbl_residence_sessions.residence_session_id DESC");



            return response()->json(['message' => 'successfully activated batch', 'success' => true, 'residence_session' =>  $residence_session], 200);
        } catch (QueryException $e) {

            return response()->json(['message' => $e->getMessage(), 'success' => false], 500);
        }
    }

    public function deactivateBatch(Request $request)
    {
        $request->validate([
            'residence_session_id' => 'required', 'available_status' => 'required',
        ]);
        try {
            $residence_session = residenceSession::find($request['residence_session_id']);
            $residence_session->available_status = 0;

            $residence_session->update();
            $id = $request['active_period_id'];
            $residence_session = DB::select("SELECT
            tbl_residence_sessions.*
        FROM
            tbl_residence_sessions
        WHERE
            tbl_residence_sessions.active_period_id = $id
        ORDER BY
            tbl_residence_sessions.residence_session_id DESC");



            return response()->json(['message' => 'successfully deactivated batch ', 'success' => true, 'residence_session' =>  $residence_session], 200);
        } catch (QueryException $e) {

            return response()->json(['error' => $e->getMessage(), 'success' => false], 500);
        }
    }

    public function updateBatch(Request $request)
    {

        $request->validate([
            'residence_session_id' => 'required',
            'is_program_driven' => 'required',
            'start_date' => 'date|required',
            'end_date' => 'required|date', 'session_name' => 'required',
        ]);

        $batch = residenceSession::find($request['residence_session_id']);

        try {
            $batch->session_name = $request['session_name'];
            $batch->is_program_driven = $request['is_program_driven'];
            $batch->start_date = $request['start_date'];
            $batch->end_date = $request['end_date'];
            if ($batch->end_date < $batch->start_date) {
                return response()->json(['success' => false, 'message' => "end date must be greater than start date"], 403);
            } else {


                $batch->update();
                $id = $request['active_period_id'];
                $residence_session = DB::select("SELECT
                tbl_residence_sessions.*
            FROM
                tbl_residence_sessions
            WHERE
                tbl_residence_sessions.active_period_id = $id
            ORDER BY
                tbl_residence_sessions.residence_session_id DESC");
            }
            $allPeriods = residenceSession::all();
        } catch (QueryException $e) {

            if ($e->errorInfo[1] == 1062) {
                return response()->json(['success' => false, 'message' => 'batch Name already exist'], 500);
            } else {
                return response()->json(['success' => false, 'message' => $e->getMessage()], 501);
            }
        }

        return response()->json(['message' => 'sucess updated batch', 'success' => true, 'residence_session' =>  $residence_session], 200);
    }

    public function createBatch(Request $request)
    {
        $request->validate([
            'session_name' => 'required|string', 'is_program_driven' => 'required', 'active_period_id' => 'required', 'start_date' => 'required', 'end_date' => 'required',
            'available_status' => 'required'
        ]);

        $residence_session = new residenceSession();
        try {
            $residence_session->session_name = $request['session_name'];

            $residence_session->is_program_driven = $request['is_program_driven'];

            $residence_session->active_period_id = $request['active_period_id'];
            $residence_session->start_date = $request['start_date'];
            $residence_session->end_date = $request['end_date'];
            $residence_session->available_status = $request['available_status'];
            if ($residence_session->end_date < $residence_session->start_date) {
                return response()->json(['success' => false, 'message' => "end date must be greater than start date"], 403);
            } else {
                $residence_session->save();


                $id = $request['active_period_id'];
                $residence_session = DB::select("SELECT
                tbl_residence_sessions.*
            FROM
                tbl_residence_sessions
            WHERE
                tbl_residence_sessions.active_period_id = $id
            ORDER BY
                tbl_residence_sessions.residence_session_id DESC");

                return response()->json([
                    'message' => 'batch succesfully created ',
                    'success' => true,
                    'residence_session' =>  $residence_session
                ], 200);
            }
        } catch (QueryException $e) {

            if ($e->errorInfo[1] == 1062) {
                return response()->json(['success' => false, 'message' => 'Batch Name already exist'], 500);
            } else {
                return response()->json(['success' => false, 'message' => $e->getMessage()], 501);
            }
        }
    }
}
