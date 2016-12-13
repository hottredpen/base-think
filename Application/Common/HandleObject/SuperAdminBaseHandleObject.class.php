<?php
namespace Common\HandleObject;
/**
 * AdminHandleObject
 * 管理员操作对象
 */
class SuperAdminBaseHandleObject {
	private $uid;

    public function __construct($uid) {
    	if((int)$uid>0){
    		$this->uid = $uid;
    	}
    }
    /**
     * 做登录或者权限检测
     * 对外方法public 改成private 就可以进行权限检测
     * 
     */
    public function __call($method, $args) {
        if((int)$this->uid == 0){
            return array('error'=>1,'info'=>'请登录之后操作');
        }
        // 检查是否存在方法$method
        if (method_exists($this, $method)) {
            $before_method = 'before_' + $method;
            // 检查是否存在方法$before_method
            if (method_exists($this, $before_method)) {
                // 调用$before_method，检查其返回值，决定是否跳过函数执行
                if (call_user_func_array(array($this, $before_method), $args)) {
                    return call_user_func_array(array($this, $method), $args);
                }
            } else {
                // $before_method不存在，直接执行函数
                return call_user_func_array(array($this, $method), $args);
            }
        } else {
            return array('error'=>1,'info'=>'不存在方法 ' . $method);
        }
    }
    /**
     * 登录
     */
    private function saveSetting(){
        $settingModel = D("Setting");

        if (!$settingModel->field('setting')->create($_POST,11)){
            return array("error"=>1,"info"=>$settingModel->getError());
        }

        $settingData = $settingModel->getSettingData();
        $allok = true;
        foreach ($settingData as $key => $value) {
            if (!$settingModel->field('name,data')->create($value,12)){
                return array("error"=>1,"info"=>$adminModel->getError());
            }
            $res = $settingModel->where(array("name"=>$value['name']))->save();
            if(!$res){
                $allok = false;
            }
        }
        if($allok){
            return array("error"=>0,"info"=>"保存成功");
        }else{
            return array("error"=>1,"info"=>"保存失败");
        }
    }
    private function addAdmin(){
        $adminModel = D("Admin");
        if (!$adminModel->field('username,password,repassword,role_id,email')->create($_POST,11)){
            return array("error"=>1,"info"=>$adminModel->getError());
        }
        $res = $adminModel->add();
        if($res){
            return array("error"=>0,"info"=>"添加成功","id"=>$res);
        }else{
            return array("error"=>1,"info"=>"添加失败");
        }
    }

}