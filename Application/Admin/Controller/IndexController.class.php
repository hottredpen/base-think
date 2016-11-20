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
        $top_menus = D("Menu","Datamanager")->getMainAdminMenu();
        $this->assign('top_menus', $top_menus);
        $this->assign('my_admin', session('admin'));
        $this->display();
    }

    public function panel(){

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

    public function left() {
        $menuid = I('menuid', 0, 'intval');
        if ($menuid > 0) {
            $left_menu = D("Menu","Datamanager")->getLeftAdminMenu_pid($menuid);
        } else {
            $left_menu = D("Menu","Datamanager")->getLeftOftenAdminMenu();
        }
        $this->assign('left_menu', $left_menu);
        $this->display();
    }

    public function verify_code() {
        $Verify = new \Think\Verify();
        $Verify->fontSize = 30;
        $Verify->length   = 4;
        $Verify->entry();
    }

}