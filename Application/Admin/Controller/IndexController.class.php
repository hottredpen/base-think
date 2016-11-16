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
    	$this->display();
    }

}