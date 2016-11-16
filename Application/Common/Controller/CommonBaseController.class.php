<?php 
namespace Common\Controller;
use Think\Controller;
/**
 * 基础函数控制器
 * 主要是一些基础继承方法
 */
class CommonBaseController extends Controller {

    protected function _initialize() {
        if($setting = F("WEB_SETTING")===false){
            $setting = D("Setting","Datamanager")->getDataWithPre();
            F("WEB_SETTING",$setting);
        }
        C($setting);
    }
    
	protected function ajaxReturn($status=1, $msg='', $data='', $dialog='') {
        parent::ajaxReturn(array(
            'status' => $status,
            'msg'    => $msg,
            'data'   => $data,
            'dialog' => $dialog,
        ));
    }

    protected function cpk_status_error($status=0,$info="错误",$urlOrData="",$dialog=""){
        IS_AJAX && $this->ajaxReturn((int)$status,$info,$urlOrData,$dialog);
        $this->error($info, $urlOrData);
    }

    protected function cpk_error($info="错误",$urlOrData="",$dialog=""){
        IS_AJAX && $this->ajaxReturn(0,$info,$urlOrData,$dialog);
        $this->error($info, $urlOrData);
    }

    protected function cpk_success($info="成功",$urlOrData="",$dialog=""){
        IS_AJAX && $this->ajaxReturn(1,$info,$urlOrData,$dialog);
        $this->success($info, $urlOrData);
    }

    protected function _pager($count, $pagesize) {
		$Page       = new \Think\Page($count,$pagesize);// 实例化分页类 传入总记录数和每页显示的记录数
		$show       = $Page->show();// 分页显示输出
		return $show;
    }
}