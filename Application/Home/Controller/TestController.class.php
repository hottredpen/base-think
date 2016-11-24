<?php 
namespace Home\Controller;
/**
 * 前台控制器
 * 主要是一些基础继承方法
 */
class TestController extends FrontController {

    protected function _initialize() {
        parent::_initialize();
    }

    public function index(){
    	
    	$asdfasdf= "asdfasdfsa=>< script >";

    	dump(filter_XSS($asdfasdf));


    }

}