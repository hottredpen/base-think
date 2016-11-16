<?php
namespace Common\HandleObject;
/**
 * AdminHandleObject
 * 管理员操作对象
 */
class AdminHandleObject {
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
        if (!$adminModel->field('loginusername,loginpassword,captcha')->create($_POST,10)){
            return array("error"=>1,"info"=>$adminModel->getError());
        }else{
            $loginUserData = $adminModel->getLoginUserData();
            if($loginUserData['uid'] > 0){
                $res = $adminModel->where(array('id'=>$loginUserData['uid']))->save();
                if($res){
                    //session('captcha'.md5(getIPAderss(),null));
                    return array("error"=>0,"info"=>"登陆成功","uid"=>$loginUserData['uid']);
                }
            }else{
                return array("error"=>1,"info"=>"用户名或密码错误");
            }
        }
    }
}