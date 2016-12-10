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
    public function saveSetting(){
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

}