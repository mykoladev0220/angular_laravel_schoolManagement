<?php

namespace App\Http\Controllers;

use App\Models\blacklistedstudent;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class blacklist extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blacklist = blacklistedstudent::orderBy('blacklisted_students_id', 'desc')->get();

        return response()->json($blacklist, 200);
    }


    public function store(Request $request)
    {

        $request->validate(['reason'=>'required|string','student_regnumber'=>'required|string','blacklisted_by'=>'required']);
        try {
            $blacklist = new  blacklistedstudent();
            $blacklist->student_regnumber = $request['student_regnumber'];
            $blacklist->reason = $request['reason'];
            $blacklist->blacklisted_by = $request['blacklisted_by'];
            $blacklist->save();
            $blacklist = blacklistedstudent::orderBy('blacklisted_students_id', 'desc')->get();
            return response()->json(['message' => 'Successfully saved!', 'blacklist' => $blacklist, 'success' => true], 201);
        } catch (QueryException $ex) {
            if ($ex->errorInfo[1] == 1062) {
                return response()->json(['message' => 'student already blacklisted', 'success' => false], 403);
            } else {
                return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
            }
        }
    }


    public function destroy(Request $request)
    {
        $request->validate(['blacklisted_students_id'=>'required','reason'=>'required|string','student_regnumber'=>'required|string','blacklisted_by'=>'required']);

        try {
            $id = $request['blacklisted_students_id'];
            $blacklist = blacklistedstudent::find($id);
            $blacklist->delete();
            $blacklist = blacklistedstudent::orderBy('blacklisted_students_id', 'desc')->get();
            return response()->json(['message' => 'Successfully saved!', 'blacklist' => $blacklist, 'success' => true], 201);
        } catch (QueryException $ex) {
            return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
        }
    }
}
