<?php
namespace Common\Lib\USER;
/**
 * 访问者
 * 
 */
class user_visitor {

    public  $is_login = false; //登录状态
    public  $info     = null;

    private $mfields;

    public function __construct() {
        $this->mfields = 'id,username,password,mobile,email,state';
        if (session('user_info')) {
            $this->is_login = true;
            $this->info = session('user_info');
        } else {
            $this->is_login = false;
        }
    }
    /**
     * 设置用户信息session中use_info的信息
     */
    public function setUserInfoSession($key, $value){
        $this->info = session('user_info');
        $this->info[$key] = $value;
        session('user_info', $this->info);
    }
    public function getNewInfo($uid){
        $user_info = M("Member")->where(array("id"=>$uid))->find();
        session('user_info', $user_info);
        $this->info = $user_info;
    }
    /**
     * 登录
     */
    public function loginUid($uid){
        $user_info = M("Member")->where(array("id"=>$uid))->find();
        session('user_info', $user_info);
        $this->info = $user_info;
    }
    /**
     * 会员退出
     */
    public function logout() {
        session('user_info', null);
    }
    /**
     * 注册
     */
    public function register(){
        $MemberModel = D('Member');
        if (!$MemberModel->field('username,mobile,password,repassword,captcha')->create($_POST,11)){
            return array("error"=>1,"info"=>$MemberModel->getError());
        }else{
            $uid = $MemberModel->add();
            if($uid){
                //@todo 站内信  D("Msg")->add_sys_fuid_tuid_action_tid(1,0,$uid,"reg",0);
                session('captcha'.md5(getIPAderss(),null));
                return array("error"=>0,"info"=>"注册成功","uid"=>$uid);
            }else{
                return array("error"=>1,"info"=>"注册失败，请再试一次");
            }
        }
    }
    /**
     * 登录检测
     */
    public function logining(){
        $MemberModel = D('Member');
        if (!$MemberModel->field('loginusername,loginpassword,captcha')->create($_POST,12)){
            return array("error"=>1,"info"=>$MemberModel->getError());
        }else{
            $loginData = $MemberModel->getLoginReturn();
            if($loginData['uid'] > 0){
                session('captcha'.md5(getIPAderss(),null));
                return array("error"=>0,"info"=>"登陆成功","uid"=>$loginData['uid']);
            }else{
                return array("error"=>1,"info"=>"用户名或密码错误");
            }
        }
    }
    public function supplierHandleObj(){
        $supplierHandleObj = new \Common\Lib\OAUTH\SupplierHandleObject($this->info['id']);
        return $supplierHandleObj;
    }
}