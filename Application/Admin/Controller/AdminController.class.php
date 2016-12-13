<?php
namespace Admin\Controller;

class AdminController extends BackController
{
    public function _initialize() {
        parent::_initialize();
        $this->_mod = D('Admin');
    }

    public function index(){
        $data = M("Admin")->select();
        $this->assign("list",$data);
        $this->display();
    }

    public function getAddForm(){
        if (IS_AJAX) {
            $role_list = M('AdminRole')->where(array("status"=>1))->select();
            $this->assign('role_list', $role_list);
            $this->assign("menuid",$this->menuid);
            $response  = $this->fetch("add");
            $this->ajaxReturn(1, '', $response);
        } else {
            $this->display();
        }
    }

    public function addAdmin(){
        $superAdminBaseHandleObject = $this->visitor->SuperAdminBaseHandleObject();
        $res = $superAdminBaseHandleObject->addAdmin();
        if($res['error']==0 && $res['info'] != ""){
            $this->cpk_success($res['info']);
        }else{
            $this->cpk_error($res['info']);
        }
    }
    public function getEditForm(){
        if (IS_AJAX) {
            $id   = I("id",0,"intval");
            $info = M("Admin")->where(array("id"=>$id))->find();
            $this->assign("info",$info);
            $role_list = M('AdminRole')->where(array("status"=>1))->select();
            $this->assign('role_list', $role_list);
            $response = $this->fetch("edit");
            $this->assign("menuid",$this->menuid);
            $this->ajaxReturn(1, '', $response);
        } else {
            $this->display();
        }
    }
    public function saveAdmin(){
        $id  = I("id",0,"intval");
        $superAdminBaseHandleObject = $this->visitor->SuperAdminBaseHandleObject();
        $res = $superAdminBaseHandleObject->saveAdmin($id);
        if($res['error'] == 0 && $res['info'] != ""){
            $this->cpk_success($res['info']);
        }else{
            $this->cpk_error($res['info']);
        }
    }
    public function deleteAdmin(){
        $id  = I("id",0,"intval");
        $superAdminBaseHandleObject = $this->visitor->SuperAdminBaseHandleObject();
        $res = $superAdminBaseHandleObject->deleteAdmin($id);
        if($res['error'] == 0 && $res['info'] != ""){
            $this->cpk_success($res['info']);
        }else{
            $this->cpk_error($res['info']);
        }
    }
    public function _before_index() {
        $big_menu = array(
            'title'  => '添加管理员',
            'iframe' => U('admin/getAddForm'),
            'id'     => 'add',
            'width'  => '600',
            'height' => '210'
        );
        $this->assign('big_menu', $big_menu);
    }
}