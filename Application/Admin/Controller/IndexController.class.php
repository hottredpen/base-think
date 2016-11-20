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

        //$menuModel = new MenuModel();
        //$top_menus = $menuModel->admin_menu(0);
        $this->assign('top_menus', $top_menus);
        $this->assign('my_admin', session('admin'));
        $this->display();
    }

    public function login(){
    	if(IS_POST){
    		$res = D("AdminBase","HandleObject")->login();
    		if($res['error']==0 && $res['id'] >0){
    			$this->success($res['info'], U('index/index'));
    		}else{
    			$this->error($res['info'], U('index/login'));
    		}
    	}else{
    		$this->display();
    	}
    }

    public function logout(){
        $res = D("AdminBase","HandleObject")->logout();
        $this->success($res['info'], U('index/login'));
    }
    public function verify_code() {
        $Verify = new \Think\Verify();
        $Verify->fontSize = 30;
        $Verify->length   = 4;
        $Verify->entry();
    }

}