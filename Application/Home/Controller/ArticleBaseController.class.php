<?php
namespace Home\Controller;
use Think\Controller;
use Common\Lib\ORG\Page;
/**
 * 前台公共控制器
 * 为防止多分组Controller名称冲突，公共Controller名称统一使用分组名称
 */
class ArticleBaseController extends FrontController {

	protected $catid;

    protected function _initialize(){
        parent::_initialize();
    }

	protected function go404(){
		header("HTTP/1.0 404 Not Found");//使HTTP返回404状态码
		$this->display("Public/404");
		exit();
	}

	protected function _empty($name){
		$id    = I("id",0,"intval");
		$catid = get_catid_by_controller_action_name(strtolower(CONTROLLER_NAME),strtolower(ACTION_NAME));
		if((int)$catid == 0){
			$this->go404();
		}else{
			$this->catid  = $catid;
	        $pageCateData = M("Category")->where(array('id'=>$this->catid))->find();
	        $this->assign("catid",$catid);
	        $this->assign("catcnname",$pageCateData['title']);
	        $this->assign("pageCateData",$pageCateData);
			if($id > 0){
				$this->_infoDataByCatidId($catid,$id);
			}else{
				$is_page = get_is_page_by_catid($catid);
				if($is_page){
					$this->assign("catcnname","");
					$this->_infoDataByCatidOnePage($catid);
				}else{
					$this->_listDataByCatid($catid);
				}
			}
		}
	}

	private function _listDataByCatid($catid){
		$p         = I("p",1,"intval");
		$page_size = 10;
		$num  = D("Document","Datamanager")->getDocumentNum_catid($catid);
		$data = D("Document","Datamanager")->getDocumentData_catid($catid,$p,$page_size);
		$this->assign("list",$data);
		$this->assign("page",$this->_pager($num,$page_size));
		$display_tpl = get_display_tpl_by_catid($catid);
		$this->display($display_tpl);
	}

	private function _infoDataByCatidOnePage($catid){
		$info = D("Document","Datamanager")->getDocumentInfoDataOnePage_catid($catid);
		if(!$info){
			$this->go404();
		}
		M("Document")->where(array("id"=>$info['id']))->setInc("view");
		$this->assign("page_title",$info['title']);
		$this->assign("info",$info);
		$display_tpl = get_display_tpl_by_catid($catid);
		$this->display($display_tpl);
	}

	private function _infoDataByCatidId($catid,$id){
		$info = D("Document","Datamanager")->getDocumentInfoData_catid_id($catid,$id);
		if(!$info){
			$this->go404();
		}
		M("Document")->where(array("id"=>$info['id']))->setInc("view");
		$this->assign("page_title",$info['title']);
		$this->assign("info",$info);
		$display_tpl = get_display_tpl_by_catid($catid);
		$this->display($display_tpl."_info");
	}

}