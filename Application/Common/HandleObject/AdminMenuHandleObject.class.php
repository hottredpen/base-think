<?php
namespace Common\HandleObject;
/**
 * AdminMenuHandleObject
 * 管理员后台菜单操作对象
 */
class AdminMenuHandleObject {
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
     * 添加
     */
    public function addMenu(){
        $menuModel = D("Menu");
        if (!$menuModel->field('name,pid,module_name,action_name,data')->create($_POST,11)){
            return array("error"=>1,"info"=>$menuModel->getError());
        }
        $res = $menuModel->add();
        if($res){
            return array("error"=>0,"info"=>"添加成功");
        }else{
            return array("error"=>1,"info"=>"添加失败");
        }
    }
    /**
     * 修改
     */
    public function saveMenu($id){
        $menuModel = D("Menu");
        if (!$menuModel->field('id,name,pid,module_name,action_name,data')->create($_POST,12)){
            return array("error"=>1,"info"=>$menuModel->getError());
        }
        $res = $menuModel->where(array("id"=>$id))->save();
        if($res){
            return array("error"=>0,"info"=>"添加成功");
        }else{
            return array("error"=>1,"info"=>"添加失败");
        }
    }
    /**
     * 删除
     */
    public function deleteMenu($id){
        $menuModel = D("Menu");
        if (!$menuModel->field('id')->create($_POST,13)){
            return array("error"=>1,"info"=>$menuModel->getError());
        }
        $res = $menuModel->delete($id);
        if($res){
            return array("error"=>0,"info"=>"删除成功");
        }else{
            return array("error"=>1,"info"=>"删除失败");
        }
    }
}