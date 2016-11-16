<?php
namespace Admin\Controller;
/**
 * 
 */
class IndexController extends BackController {

    protected function _initialize() {
    	parent::_initialize();
    }

    public function index(){
    	dump(C());
    }

    public function login(){
    	if(IS_POST){
    		$res = D("Admin","HandleObject")->login();
    		if($res['error']==0 && $res['id'] >0){
    			$this->success($res['info'], U('index/index'));
    		}else{
    			$this->error($res['info'], U('index/login'));
    		}
    	}else{
    		$this->display();
    	}
    }

}