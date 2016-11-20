<?php
namespace Common\HandleObject;
/**
 * AdminHandleObject
 * 管理员操作对象
 */
class AdminBaseHandleObject {
	private $uid;

    public function __construct($uid) {
    	if((int)$uid>0){
    		$this->uid = $uid;
    	}else{
    		$return = array();
    		$return['error']  = 1;
    		$return['info']   = "请登录之后操作";
    		return $return;
    	}
    }
    /**
     * 登录
     */
    public function login(){
        $adminModel = D('Admin');
        if (!$adminModel->field('loginusername,loginpassword,verify_code')->create($_POST,10)){
            return array("error"=>1,"info"=>$adminModel->getError());
        }else{
            $loginUserData = $adminModel->getLoginUserData();
            if($loginUserData['id'] > 0){
                $res = $adminModel->where(array('id'=>$loginUserData['id']))->save();
                if($res){

                    session('admin', array(
                        'id'        => $loginUserData['id'],
                        'role_id'   => $loginUserData['role_id'],
                        'rolename' => M('AdminRole')->where(array('id'=>$loginUserData['role_id']))->getField("name"),
                        'username'  => $loginUserData['username'],
                    ));
                    //\Common\Lib\ORG\LogRecord::recordLogAdmin(CONTROLLER_NAME, ACTION_NAME ,600,0, "**保密处理**");
                    //session('captcha'.md5(getIPAderss(),null));
                    return array("error"=>0,"info"=>"登陆成功","id"=>$loginUserData['id']);
                }
            }else{
                return array("error"=>1,"info"=>"用户名或密码错误");
            }
        }
    }
    /**
     * 
     */
    public function logout(){
        //\Common\Lib\ORG\LogRecord::recordLogAdmin(CONTROLLER_NAME, ACTION_NAME ,601,0, "**保密处理**");
        session('admin', null);
        return array("error"=>0,"info"=>"登出成功");
    }
}