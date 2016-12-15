<?php
namespace Note\HandleObject;
/**
 * NoteBaseHandleObject
 * 笔记操作对象
 */
class NoteBaseHandleObject {

	private $uid;

    public function __construct($uid) {
        if((int)$uid>0){
            $this->uid = $uid;
        }
    }
    /**
     * 做登录或者权限检测
     * 对外方法public 改成private 就可以进行权限检测
     */
    public function __call($method, $args) {
        if((int)$this->uid == 0){
            return array('error'=>1,'info'=>'请登录之后操作');
        }
        // 检查是否存在方法$method
        if (method_exists($this, $method)) {
            // 执行private函数
            return call_user_func_array(array($this, $method), $args);
        } else {
            return array('error'=>1,'info'=>'不存在方法 ' . $method);
        }
    }
    /**
     * 登录
     */
    public function login(){

    }
    /**
     * 退出
     */
    public function logout(){

    }



    /**
     * 
     */
    private function changeTree(){
        $treeModel = D("Tree");
        if (!$treeModel->field('jsontreedata')->create($_POST,12)){
            return array("error"=>1,"info"=>$treeModel->getError());
        }
        $res = $treeModel->where(array("user_id"=>$this->uid))->save();
        if($res){
            return array("error"=>0,"info"=>"修改成功");
        }else{
            return array("error"=>1,"info"=>"修改失败");
        }
    }

}