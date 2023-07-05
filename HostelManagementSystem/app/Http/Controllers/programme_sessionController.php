<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\program_session;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class programme_sessionController extends Controller
{



    public function store(Request $request)
    {
        $request->validate(['residence_session_id'=>'required','programlist'=>'required','createdby'=>'required','preference_level_id'=>'required']);
        $residence_session_id=$request['residence_session_id'];
        $programmelist=$request['programlist'];
        $createdby=$request['createdby'];
        $preference_level_id=$request['preference_level_id'];
        foreach($programmelist as $plist){
          try{
            $programe_session = new program_session();
            $programe_session->residence_session_id=$residence_session_id;
            $programe_session->createdby=$createdby;
            $programe_session->programme_code=$plist['programme_code'];
            $programe_session->preference_level_id=$preference_level_id;
            $programe_session->save();
          }catch(QueryException $ex){
            if ($ex->errorInfo[1] == 1062) {

            } else {
                return response()->json(['success' => false, 'message' => $ex->getMessage()], 501);
            }
        }
        }
        try{
            $programe_session = program_session::join('registry.tblprogramme','registry.tblprogramme.programme_code','=','tbl_programme_sessions.programme_code')
            ->join('tbl_level_preference','tbl_level_preference.preference_level_id','=','tbl_programme_sessions.preference_level_id')
            ->where('tbl_programme_sessions.residence_session_id',$residence_session_id)->get();
            $programmestoadd=DB::connection('mysql_2')->select("SELECT programme_id, programme_name, programme_code FROM registry.tblprogramme WHERE programme_code NOT IN (( SELECT
            tbl_programme_sessions.programme_code
        FROM
        hostelmanagement.tbl_programme_sessions
            INNER JOIN
            hostelmanagement.tbl_level_preference
            ON
                tbl_programme_sessions.preference_level_id = tbl_level_preference.preference_level_id
        WHERE
            tbl_programme_sessions.residence_session_id = $residence_session_id AND
            tbl_programme_sessions.preference_level_id = $preference_level_id ))");
            return response()->json(['message'=>'successfully added programmes',
            'success'=>true,
            'programmestoadd'=>$programmestoadd,
           'programe_session'=>$programe_session
          ],201);
        }catch(QueryException $ex){

                return response()->json(['success' => false, 'message' => $ex->getMessage()], 501);

        }
    }

    /**
     * Display the specified resource.
     */
    public function getSessionProgrammes(Request $request)
    {
        $request->validate(['residence_session_id'=>'required']);
        $residence_session_id=$request['residence_session_id'];
      try{
        $programe_session = program_session::join('registry.tblprogramme','registry.tblprogramme.programme_code','=','tbl_programme_sessions.programme_code')
        ->join('tbl_level_preference','tbl_level_preference.preference_level_id','=','tbl_programme_sessions.preference_level_id')
        ->where('tbl_programme_sessions.residence_session_id',$residence_session_id)->get();
        return response()->json($programe_session,200);
      }catch(QueryException $ex){
        return response()->json(['message'=>$ex->getMessage(),
        'success'=>false
      ],500);
      }

    }

    public function destroy(Request $request)
    {
     try{
        $request->validate(['programme_session_id'=>'required','residence_session_id'=>'required','programme_code'=>'required']);
        $programe_session_id=$request['programme_session_id'];
        $residence_session_id=$request['residence_session_id'];
        $programe_session=program_session::find($programe_session_id);

        $programe_session->delete();
        $programe_session = program_session::join('registry.tblprogramme','registry.tblprogramme.programme_code','=','tbl_programme_sessions.programme_code')
        ->join('tbl_level_preference','tbl_level_preference.preference_level_id','=','tbl_programme_sessions.preference_level_id')
        ->where('tbl_programme_sessions.residence_session_id',$residence_session_id)->get();


           return response()->json(['message'=>'successfully deleted',
           'success'=>true,

          'programe_session'=>$programe_session
         ],201);
     }catch(QueryException $ex){
        return response()->json(['message'=>$ex->getMessage(),
        'success'=>false
      ],500);
     }
    }

  public function  getAllProgrames(Request $request){
    $request->validate(['residence_session_id'=>'required' ,'preference_level_id'=>'required']);
    $residence_session_id=$request['residence_session_id'];
    $preference_level_id=$request['preference_level_id'];

try{


    $programmestoadd=DB::connection('mysql_2')->select("SELECT programme_id, programme_name, programme_code FROM registry.tblprogramme WHERE programme_code NOT IN (( SELECT
	tbl_programme_sessions.programme_code
FROM
hostelmanagement.tbl_programme_sessions
	INNER JOIN
	hostelmanagement.tbl_level_preference
	ON
		tbl_programme_sessions.preference_level_id = tbl_level_preference.preference_level_id
WHERE
	tbl_programme_sessions.residence_session_id = $residence_session_id AND
	tbl_programme_sessions.preference_level_id = $preference_level_id ))");
return response()->json( $programmestoadd,200);
}catch(QueryException $ex){
    return response()->json(['message'=>$ex->getMessage(),
        'success'=>false
      ],500);
}

    }

}
