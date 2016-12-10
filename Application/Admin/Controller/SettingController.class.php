<?php
namespace Admin\Controller;

class SettingController extends BackController {

    public function _initialize() {
        parent::_initialize();
    }

    public function index() {
        $this->display($type);
    }

    public function saveSetting(){
        $superAdminBaseHandleObject = $this->visitor->SuperAdminBaseHandleObject();
        $res = $superAdminBaseHandleObject->saveSetting();
        if($res['error']==0 && $res['info'] != ""){
            $this->success($res['info'].",刷新缓存后生效",U('cache/index'));
        }else{
            $this->error($res['info']);
        }
    }

    //上传附件配置
    public function uploadconfig(){

        $data = M("uploadconfig")->select();
        $this->assign("list",$data);
        $this->display();
    }

    public function uploadconfig_edit(){
        if (IS_POST) {
            if (false === $data = D("uploadconfig")->create()) {
                IS_AJAX && $this->ajaxReturn(0, D("uploadconfig")->getError());
                $this->error(D("uploadconfig")->getError());
            }
            if (false !== D("uploadconfig")->save()) {
                IS_AJAX && $this->ajaxReturn(1, L('operation_success'), '', 'edit');
                $this->success(L('operation_success'));
            } else {
                IS_AJAX && $this->ajaxReturn(0, L('operation_failure'), '', 'edit');
                $this->error(L('operation_failure'));
            }
        } else {
            $id = I('id', 0, 'intval');
            $info = M("uploadconfig")->where(array("id"=>$id))->find();
            $this->assign('info', $info);
            $response = $this->fetch();
            $this->ajaxReturn(1, '', $response);
        }
    }


}