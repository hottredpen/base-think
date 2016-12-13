<?php
namespace Admin\Model;
use Think\Model;
class AdminModel extends Model{

    const ADMIN_LOGIN      = 10; // 用户登陆
    const ADMIN_ADD        = 11; // 超级管理员添加管理员

    public  $loginUser;
    public  $loginUserData;
    private $password;

    //字段衍射
    protected $_map = array(
                            
                        );
    //修改插入后自动完成
    protected $_auto = array(
        // 登录
        array('last_time','time',self::ADMIN_LOGIN,'function'),
        array('last_ip','get_client_ip',self::ADMIN_LOGIN,'function'),
        

        // 超级管理员添加管理员
        array('add_time','time',self::ADMIN_ADD,'function'),
        array('password','set_password',self::ADMIN_ADD,'callback'),
    );

    protected $_validate = array(
        // 登录(以下字段不存在于数据表中)
        array('loginusername', 'is_loginusername_pass', '登录用户名必填', self::MUST_VALIDATE,'callback',self::ADMIN_LOGIN),
        array('loginusername', 'is_fiter_input_sql_pass', '用户名或密码错误', self::MUST_VALIDATE,'function',self::ADMIN_LOGIN),
        array('loginpassword', 'is_passwordnotempty_pass', '登录密码必填', self::MUST_VALIDATE,'callback',self::ADMIN_LOGIN),
        array('loginpassword', 'is_loginpassword_pass', '用户名或密码错误', self::MUST_VALIDATE,'callback',self::ADMIN_LOGIN),
        array('verify_code', 'check_verify', '验证码错误', self::MUST_VALIDATE, 'function',self::ADMIN_LOGIN),

        // 超级管理员添加管理员
        array('username', 'is_notempty_pass', '用户名不能为空', self::MUST_VALIDATE,'function',self::ADMIN_ADD),
        array('username', 'is_usernamenothas_pass', '用户名已存在', self::MUST_VALIDATE,'callback',self::ADMIN_ADD),
        array('username', 'is_filter_pass', '用户名不能包含特殊符号', self::MUST_VALIDATE,'function',self::ADMIN_ADD),
        array('password', 'is_passwordlength_pass', '密码长度必须大于4个字符', self::MUST_VALIDATE,'callback',self::ADMIN_ADD),
        array('repassword', 'is_repassword_pass', '两次密码输入不一致', self::MUST_VALIDATE,'callback',self::ADMIN_ADD),
        array('email', 'is_notempty_pass', '邮箱不能为空', self::MUST_VALIDATE,'function',self::ADMIN_ADD),
        array('email', 'is_emailformat_pass', '错误的邮箱格式', self::MUST_VALIDATE,'function',self::ADMIN_ADD),


    );

    protected function set_password(){
        return $this->_md5_password($this->password);
    }

    private function _md5_password($password){
        return md5($password."hottredpen@126.com");
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

    protected function is_usernamenothas_pass($username){
        $has = $this->where(array("username"=>$username))->find();
        if(!$has){
            return true;
        }
        return false;
    }

    protected function is_passwordlength_pass($password){
        if(strlen($password) > 4){
            $this->password = $password;
            return true;
        }
        return false;
    }

    protected function is_repassword_pass($repassword){
        if($repassword == $this->password){
            return true;
        }
        return false;
    }

}