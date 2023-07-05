<?php

namespace App\Http\Controllers;

use App\Models\preference_level;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class preferencelevelController extends Controller
{
    //
public function createLevelPreference(Request $request){
$request->validate(['academic_level'=>'required','semester'=>'required','residence_session_id'=>'required']);
$residence_session_id=$request['residence_session_id'];
try{
    $levelPreference= new preference_level();
 $levelPreference->Create($request->toArray());
 $levelPreference=preference_level::where('residence_session_id',$residence_session_id)->Orderby('preference_level_id','Desc')->get();
 return response()->json(['message'=> 'successfully cretated level preference','success'=>true,'levels'=>$levelPreference],201);
}catch(QueryException $ex){
    if ($ex->errorInfo[1] == 1062) {
        return response()->json(['message' => 'level preference already added', 'success' => false], 403);
    } else {
        return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
    }
}



}
public function removeLevelPreference(Request $request){
    $request->validate(['preference_level_id'=>'required','academic_level'=>'required','semester'=>'required','residence_session_id'=>'required']);
$preference_level_id=$request['preference_level_id'];
$residence_session_id=$request['residence_session_id'];
 try{
    $levelPreference =preference_level::find($preference_level_id);
    $levelPreference->delete();
    $levelPreference=preference_level::where('residence_session_id',$residence_session_id)->Orderby('preference_level_id','Desc')->get();
    return response()->json(['message'=> 'successfully updated level preference','success'=>true,'levels'=>$levelPreference],201);
}catch(QueryException $ex){
    return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
}
 }
public function getLevelPreference(Request $request){
    $request->validate(['residence_session_id'=>'required']);
    $residence_session_id=$request['residence_session_id'];
try{
    $levelPreference=preference_level::where('residence_session_id',$residence_session_id)->Orderby('preference_level_id','Desc')->get();

    return response()->json($levelPreference,200);
}catch(QueryException $ex){
    return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
}

}

}
