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











    public function _before_index() {
        $big_menu = array(
            'title' => '添加管理员',
            'iframe' => U('admin/getAddForm'),
            'id' => 'add',
            'width' => '600',
            'height' => '210'
        );
        $this->assign('big_menu', $big_menu);
        $this->list_relation = true;
    }

    public function _before_add() {
        $role_list = M('AdminRole')->where('status=1')->select();
        $this->assign('role_list', $role_list);
    }

    public function _before_insert($data='') {
        if( ($data['password']=='')||(trim($data['password']=='')) ){
            unset($data['password']);
        }else{
            $data['password'] = md5($data['password']);
        }
        return $data;
    }

    public function _after_list($data){
        foreach ($data as $key => $value) {
            $data[$key]['role_name']=M("AdminRole")->where(array("id"=>$value['role_id']))->getField("name");
        }
        return $data;
    }

    public function _before_edit() {
        $this->_before_add();
    }

    public function _before_update($data=''){
        if( ($data['password']=='')||(trim($data['password']=='')) ){
            unset($data['password']);
        }else{
            $data['password'] = md5($data['password']);
        }
        return $data;
    }

    public function ajax_check_name() {
        $name = I('username', '', 'trim');
        $J_username = I('J_username', '', 'trim');
        if($J_username!=""){
            $name = $J_username;
        }
        $id   = I('id', 0, 'intval');
        if ($this->_mod->name_exists($name, $id)) {
            echo 0;
        } else {
            echo 1;
        }
    }
}