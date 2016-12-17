<?php
namespace Common\HandleObject;
/**
 * AdminHandleObject
 * 管理员操作对象
 */
class AdminBaseHandleObject {
	private $uid;

    public function __construct() {

    }
    /**
     * 登录
     */
    public function login(){
        $adminModel = D('Admin');
        if (!$adminModel->field('loginusername,loginpassword,verify_code')->create($_POST,10)){
            return array("error"=>1,"info"=>$adminModel->getError());
        }

        $loginUserData = $adminModel->getLoginUserData();
        if($loginUserData['id'] > 0){
            $res = $adminModel->where(array('id'=>$loginUserData['id']))->save();
            if($res){
                session('admin', array(
                    'id'        => $loginUserData['id'],
                    'role_id'   => $loginUserData['role_id'],
                    'rolename'  => M('AdminRole')->where(array('id'=>$loginUserData['role_id']))->getField("name"),
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
    /**
     * 退出
     */
    public function logout(){
        //\Common\Lib\ORG\LogRecord::recordLogAdmin(CONTROLLER_NAME, ACTION_NAME ,601,0, "**保密处理**");
        session('admin', null);
        return array("error"=>0,"info"=>"登出成功");
    }


    public function addDocument(){
        $documentModel       = D('Document');
        $documentArtcleModel = D('DocumentArticle');
        if (!$documentModel->field('title')->create($_POST,11)){
            return array("error"=>1,"info"=>$documentModel->getError());
        }
        $res = $documentModel->add();
        $_POST['id']          = $res;
        if (!$documentArtcleModel->field('id,content')->create($_POST,11)){
            return array("error"=>1,"info"=>$documentArtcleModel->getError());
        }
        $res_article = $documentArtcleModel->add();
        if($res && $res_article){
            return array("error"=>0,"info"=>"添加成功",'id'=>$res);
        }else{
            return array("error"=>1,"info"=>"添加失败");
        }
    }


}