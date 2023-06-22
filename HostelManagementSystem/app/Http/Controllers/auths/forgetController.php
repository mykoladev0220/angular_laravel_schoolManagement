<?php

namespace App\Http\Controllers\auths;


use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Mail\forgetmail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Database\QueryException;

class forgetController extends Controller
{
    //


public function changePassword(Request $request){
$request->validate(['token'=>'required|string',
'password'=>'required|string'

]);

try{

$password = Hash::make($request['password']);

$token= $request['token'];
$emailToken= User::join('password_reset_tokens','password_reset_tokens.email','=','tbl_users.email')
->where('password_reset_tokens.token',$token)
->first();

if($emailToken){
$user=User::find($emailToken->user_id);

$user->password=$password;
$user->update();

return response()->json(['message'=>'password resert  successfull','success'=>true],200);

}else{
return response()->json(['message'=>'email not found ','success'=>false],403);
}
}catch(QueryException $ex){
    return response()->json(['message'=>$ex->getMessage(),'success'=>false],500);
}

}

    public function sendResertLink(Request $request){
$request->validate((['email'=>'required|email']));
$email=$request['email'];
$user=User::where('email',$email)->first();
if(!$user){
    return response()->json(['message'=>'email not found ','success'=>false],403);
}



try{
    $token=null;
$password_reset= User::join('password_reset_tokens','password_reset_tokens.email','=','tbl_users.email')->where('tbl_users.email',$email)->first();
if($password_reset){
$token=$password_reset->token;
}else{
    $token = Str::random(32);
    DB::table('password_reset_tokens')->insert([
        'email'=>$email,
        'token'=>$token

    ]);
}


    Mail::to($email)->send( new forgetmail($token));
    return response()->json(['message'=>'password resert link successfully send ','success'=>true],200);


}catch(QueryException $ex){
    return response()->json(['message'=>$ex->getMessage(),'success'=>false],403);
}catch(Exception $ex)
{
    return response()->json(['message'=>$ex->getMessage(),'success'=>false],403);
}
    }
}
