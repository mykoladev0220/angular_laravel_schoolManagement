<?php

namespace App\Http\Controllers;

use App\Models\subwaden_ressidence_sessions;
use App\Models\subwarden;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class subwardensController extends Controller
{

    public function index()
    {
     try{
        $subwarden=subwarden::all();
        return response()->json(['subwardens'=>$subwarden,'success'=>true],200);
     }catch(QueryException $ex){
        return response()->json(['message'=>$ex->getMessage(),'success'=>false],501);
     }
    }


    public function store(Request $request)
    {
try{
    $data= $request->validate([ 'reg_number'=>'required|string', 'created_by'=>'required']);
    $subwarden=new subwarden();
    $subwarden::create($data);
    $subwarden=subwarden::all();
    return response()->json(['message'=>'successfully created subwarden','subwardens'=>$subwarden,'success'=>true],200);
}catch(QueryException $ex){
    if ($ex->errorInfo[1] == 1062) {
        return response()->json(['message' => 'regnumber already exist', 'success' => false], 403);
    } else {
        return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
    }
}

}
public function deleteEntry(Request $request){
    $data= $request->validate(['subwarden_residence_session_id'=>'required']);
    $subwarden_residence_session_id=$data['subwarden_residence_session_id'];
  try{
    $subwarden_residence_session=subwaden_ressidence_sessions::find($subwarden_residence_session_id);
    $subwarden_residence_session->delete();
    return response()->json(['message'=>'successfully unassigned warden','success'=>true],200);

  }catch(QueryException $ex)
  {
    return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
  }


}

public function assignhostel(Request $request){
  try{
    $data= $request->validate(['residence_session_id'=>'required', 'hostel_id'=>'required', 'assigned_by'=>'required', 'subwarden_id'=>'required']);
    $subwarden_session=new subwaden_ressidence_sessions();
    $subwarden_session::create($data);
    return response()->json(['message'=>'successfully assigned subwarden' ,'success'=>true],200);

  }catch(QueryException $ex){
    if ($ex->errorInfo[1] == 1062) {
        return response()->json(['message' => 'duplicate entry', 'success' => false], 403);
    } else {
        return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
    }
  }
}

    public function getHostelwarden(Request $request)
    {
        $data = $request->validate(['hostel_id'=> 'required']);

        $hostel_id=$data['hostel_id'];
        $residence_session_id=$data['residence_session_id'];

      try{
        $subwarden =subwarden::join('tbl_subwaden_ressidence_sessions','tbl_subwaden_ressidence_sessions.subwarden_id','=','tbl_subwardens.subwarden_id')->where('tbl_subwaden_ressidence_sessions.residence_session_id',$residence_session_id)->where('tbl_subwaden_ressidence_sessions.hostel_id',$hostel_id)->get();
        return response()->json(['subwardens'=>$subwarden,'success'=>true],200);
      }catch(QueryException $ex){
        return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
      }


    }




}
