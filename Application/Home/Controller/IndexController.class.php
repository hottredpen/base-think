<?php 
namespace Home\Controller;
/**
 * 前台控制器
 * 主要是一些基础继承方法
 */
class IndexController extends FrontController {

    protected function _initialize() {
        parent::_initialize();
    }

    public function index(){
    	M("Setting")->select();
        echo "string";
    }

}