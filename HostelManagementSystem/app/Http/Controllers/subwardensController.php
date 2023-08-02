<?php

namespace App\Http\Controllers;

use App\Models\student;
use App\Models\subwarden;
use Illuminate\Http\Request;
use App\Http\Controllers\Traits;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use App\Models\subwaden_ressidence_sessions;

class subwardensController extends Controller
{
use Traits\studenttrait;
    public function index()
    {
     try{
        $subwarden=subwarden::all();
        return response()->json(['subwardens'=>$subwarden,'success'=>true],200);
     }catch(QueryException $ex){
        return response()->json(['message'=>$ex->getMessage(),'success'=>false],501);
     }
    }


    public function isWarden(Request $request){
        $data= $request->validate(['residence_session_id'=>'required','reg_number'=>'required']);
        $residence_session_id=$data['residence_session_id'];
        $regnumber=$request['reg_number'];

$subWardens=subwarden::join('tbl_subwaden_ressidence_sessions','tbl_subwaden_ressidence_sessions.subwarden_id','=','tbl_subwardens.subwarden_id')->where('reg_number',$regnumber)->where('residence_session_id',"$residence_session_id")->first();



return response()->json($subWardens,200);

    }


    public function store(Request $request)
    {
try{
    $data= $request->validate([ 'reg_number'=>'required|string', 'created_by'=>'required']);
  $student=  $this->getStudentDetails($data['reg_number']);
if(!$student){
    return response()->json(['message' => 'regnumber not found', 'success' => false], 403);
}
    $subwarden=new subwarden();
    $subwarden::create($data);

    $subwardens=subwarden::orderBy('subwarden_id','Desc')->get();
    return response()->json(['message'=>'successfully created subwarden','subwardens'=>$subwardens,'success'=>true],200);
}catch(QueryException $ex){
    if ($ex->errorInfo[1] == 1062) {
        return response()->json(['message' => 'regnumber already exist', 'success' => false], 403);
    } else {
        return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
    }
}

}
public function getwarden(){
    $wardens=subwarden::orderBy('subwarden_id','Desc')->get();

    return response()->json(['subwardewns'=>$wardens],200);
}
public function deleteEntry(Request $request){
    $data= $request->validate(['subwarden_residence_session_id'=>'required','reg_number'=>'required']);
    $subwarden_residence_session_id=$data['subwarden_residence_session_id'];
    $regnumber=$request['reg_number'];
  try{
    $subwarden_residence_session=subwaden_ressidence_sessions::find($subwarden_residence_session_id);
    $subwarden_residence_session->delete();
    $assignments=$this->assignments_warden($regnumber);
    return response()->json(['message'=>'successfully unassigned warden','assignments'=>$assignments,'success'=>true],200);

  }catch(QueryException $ex)
  {
    return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
  }


}

public function assignhostel(Request $request){
  try{
    $data= $request->validate(['residence_session_id'=>'required','reg_number'=>'required', 'hostel_id'=>'required', 'assigned_by'=>'required', 'subwarden_id'=>'required']);
    $regnumber=$request['reg_number'];
    $subwarden_session=new subwaden_ressidence_sessions();
    $subwarden_session::create($data);
    $assignments=$this->assignments_warden($regnumber);
    return response()->json(['message'=>'successfully assigned subwarden','assignments'=>$assignments ,'success'=>true],200);

  }catch(QueryException $ex){
    if ($ex->errorInfo[1] == 1062) {
        return response()->json(['message' => 'duplicate entry ', 'success' => false], 403);
    } else {
        return response()->json(['message' => $ex->getMessage(), 'success' => false], 501);
    }
  }
}


public function getwardenAssignments(Request $request){
$request->validate(['reg_number'=>'required']);
$regnumber=$request['reg_number'];
$student =$this->getStudentDetails($regnumber);
if(!$student){
    return response()->json(['message' => 'student not found', 'success' => false], 403);

}
$assignments=$this->assignments_warden($regnumber);
return response()->json(['student'=>$student[0],'assignments'=>$assignments,'success'=>true],200);
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

    public function assignments_warden($regnumber){
        $assignments=DB::select("SELECT
        hostelmanagement.tbl_subwardens.subwarden_id,
        hostelmanagement.tbl_subwardens.reg_number,
        hostelmanagement.tbl_hostels.hostel_name,
        hostelmanagement.tbl_hostels.hostel_id,
        hostelmanagement.tbl_locations.location_name,
        hostelmanagement.tbl_locations.location_id,
        hostelmanagement.tbl_residence_sessions.session_name,
        registry.tblperiod.period_name,
        hostelmanagement.tbl_subwaden_ressidence_sessions.subwarden_residence_session_id
        FROM
        hostelmanagement.tbl_subwardens
        INNER JOIN hostelmanagement.tbl_subwaden_ressidence_sessions ON hostelmanagement.tbl_subwardens.subwarden_id = hostelmanagement.tbl_subwaden_ressidence_sessions.subwarden_id
        INNER JOIN hostelmanagement.tbl_hostels ON hostelmanagement.tbl_subwaden_ressidence_sessions.hostel_id = hostelmanagement.tbl_hostels.hostel_id
        INNER JOIN hostelmanagement.tbl_residence_sessions ON hostelmanagement.tbl_subwaden_ressidence_sessions.residence_session_id = hostelmanagement.tbl_residence_sessions.residence_session_id
        INNER JOIN hostelmanagement.tbl_active_period_hostel_online_application ON hostelmanagement.tbl_residence_sessions.active_period_id = hostelmanagement.tbl_active_period_hostel_online_application.active_period_id
        INNER JOIN registry.tblperiod ON hostelmanagement.tbl_active_period_hostel_online_application.period_id = registry.tblperiod.period_id
        INNER JOIN hostelmanagement.tbl_locations ON hostelmanagement.tbl_hostels.location_id = hostelmanagement.tbl_locations.location_id
        WHERE
        hostelmanagement.tbl_subwardens.reg_number = '$regnumber'");
        return $assignments;
    }


}
