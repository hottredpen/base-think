<?php
namespace Admin\Model;
use Think\Model;
class AdminModel extends Model{

    const ADMIN_LOGIN      = 10;//用户登陆

    public  $loginUser;
    public  $loginUserData;
    private $password;

    //字段衍射
    protected $_map = array(
                            
                        );
    //修改插入后自动完成
    protected $_auto = array(
        //登录
        array('last_time','time',self::ADMIN_LOGIN,'function'),
    );

    protected $_validate = array(
        //登录(以下字段不存在于数据表中)
        array('loginusername', 'is_loginusername_pass', '登录用户名必填', self::MUST_VALIDATE,'callback',self::ADMIN_LOGIN),
        array('loginusername', 'is_fiter_input_sql_pass', '用户名或密码错误', self::MUST_VALIDATE,'function',self::ADMIN_LOGIN),
        array('loginpassword', 'is_passwordnotempty_pass', '登录密码必填', self::MUST_VALIDATE,'callback',self::ADMIN_LOGIN),
        array('loginpassword', 'is_loginpassword_pass', '用户名或密码错误', self::MUST_VALIDATE,'callback',self::ADMIN_LOGIN),
        array('verify_code', 'check_verify', '验证码错误', self::MUST_VALIDATE, 'function',self::ADMIN_LOGIN),
    );

    protected function set_password(){
        return $this->_md5_password($this->password);
    }

    private function _md5_password($password){
        return md5($password."hottredpen@126.com");
    }

    protected function is_username_length_pass($username){
        if(utf8_strlen($username)>16){
            return false;
        }
        return true;
    }

    protected function is_loginusername_pass($username){
    	if($username != ""){
            $this->loginUser = $username;
            return true;
        }
        return false;
    }

    protected function is_passwordnotempty_pass($password){
        if($password != ""){
            $this->password = $password;
            return true;
        }
        return false;
    }

    protected function is_loginpassword_pass($password){
        $has = $this->where(array("username"=>$this->loginUser,"password"=>$this->_md5_password($password)))->find();
        if($has){
            $this->loginUserData = $has;
            return true;
        }
        return false;
    }

    public function getLoginUserData(){
        return $this->loginUserData;
    }
}