<?php
namespace Admin\Controller;
use Common\Controller\CommonBaseController;
/**
 * 
 */
class BackController extends CommonBaseController {

    protected function _initialize() {
    	header("Content-Type: text/html; charset=utf-8");
    	parent::_initialize();
    	$this->menuid = I('menuid', 0, 'intval');
    	//检测权限
    	$this->_checkAuth();
    	//
    	//$this->notAllow_ajax_edit_db();
    }

    private function _checkAuth(){
    	$admin_session = session('admin');
        if ( (!isset($admin_session) || !$admin_session) && !in_array(ACTION_NAME, array('login','verify_code')) ) {
            $this->redirect('index/login');
        }
        // if($admin_session['role_id'] == 1) {
        //     return true;
        // }
        // if (in_array(strtolower(CONTROLLER_NAME), explode(',', 'index'))) {
        //     return true;
        // }
		// $menuIdResult = M('Menu')->field("id")->where(array('module_name'=>CONTROLLER_NAME, 'action_name'=>ACTION_NAME))->select();
  //       foreach($menuIdResult as $key=>$value){
  //           $str .= $value["id"].",";
  //       }
  //       $newstr = substr($str,0,strlen($str)-1); 

  //       if($newstr!=""){
  //           $priv_mod = M('admin_auth');
  //           $map= array();
  //           $map["role_id"] = $_SESSION['admin']['role_id'];
  //           $map["menu_id"] = array("in", $newstr);
  //           $r = $priv_mod->where($map)->count();        
  //           if (!$r) {
  //               IS_AJAX && $this->ajaxReturn(0,L('_VALID_ACCESS_'));
  //               $this->error(L('_VALID_ACCESS_'),"/admin/index/panel");
  //           }
  //       }
    }


    /**
     * 快速修改字段
     * 此方法尽量少用
     * 使用时最好加入一个允许操作表或者不允许操作表
     */
    public function ajax_edit(){
        $pk    = $this->_mod->getPk();
        $id    = I($pk,0,'intval');
        $field = I('field',"",'trim');
        $val   = I('val',"",'trim');
        $res = $this->_mod->where(array($pk=>$id))->setField($field, $val);
        if($res!==false){
            $this->ajaxReturn(1);
        }else{
            $this->ajaxReturn(0);
        }
    }

}