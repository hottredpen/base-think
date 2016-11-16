<?php 
namespace Home\Controller;
use Common\Controller\CommonBaseController;
/**
 * 前台控制器
 * 已访问者形式
 */
class FrontController extends CommonBaseController {

    protected $visitor;
    
    protected function _initialize() {
        parent::_initialize();
        //初始化访问者
        $this->_init_visitor();
        //检测用户信息是否有更新
        $this->checkUserStatus();
    }

    private function _init_visitor(){
        $this->visitor    = new \Common\Lib\USER\user_visitor();
        $this->assign("visitorData",$this->visitor->info);
    }
    private function checkUserStatus(){
        $info       = $this->visitor->info;
        $userStatus = S("userStatus_".$info['id']);
        if($userStatus){
            //后台无法改变当前用户session值时所需重现初始化登录用户
            $this->visitor->getNewInfo($info['id']);
            S("userStatus_".$info['id'], null);
        }
    }
}