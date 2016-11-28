<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

namespace Home\Controller;

/**
 * 文档模型控制器
 * 文档模型列表和详情
 */
class WorksController extends ArticleBaseController {

	protected $catid;
	protected $catenname;
    protected $catcnname;
    protected $emptynameArray;

    public function _initialize(){
        parent::_initialize();
        //推荐新闻
        $new_list = M("Document")->where(array('category_id'=>55))->limit(5)->select();
        $this->assign("new_list",$new_list);
        //活动
        $active_list = M("Document")->where(array('category_id'=>56))->limit(5)->select();
        $this->assign("active_list",$active_list);
    }

    /* 文档模型频道页 */
	public function index(){
        //$this->redirect('/class/p_aboutshouhui');
        $p         = I("p",0,"intval");
        $page_size = 20;

        $cateData  = M("Category")->where(array("id"=>array("in",array(101,102,103,104,105,106,107))))->select();
        $worksNum  = D("Document","Datamanager")->getDocumentNum_catidArray(array(101,102,103,104,105,106,107));
        $worksData = D("Document","Datamanager")->getDocumentData_catidArray(array(101,102,103,104,105,106,107),$p,$page_size);
        $this->assign("worksData",$worksData);
        $this->assign("page",$this->_pager($worksNum,$page_size));
        $pageCateData = M("Category")->where(array('id'=>45))->find();
        $this->assign("catid",$catid);
        $this->assign("catcnname",$pageCateData['title']);
        $this->assign("cateData",$cateData);

        $this->assign("loadeditemid",$this->_getloadeditemid($worksData));
        $this->display();
	}

    private function _getloadeditemid($worksData){
        $loadeditemidArr = array();
        foreach ($worksData as $key => $value) {
            array_push($loadeditemidArr, $value['id']);
        }
        return implode(",", $loadeditemidArr);
    }

    public function loadmoreworks(){
        $p           = I("p",0,"intval");
        $filtercatid = I("filtercatid",0,"intval");
        $hasitemsid  = I("hasitemsid");
        $page_size   = 12;
        if($filtercatid > 0){
            $filterarray = array($filtercatid);
        }else{
            $filterarray = array(101,102,103,104,105,106,107);
        }
        $map['d.id'] = array("not in",$hasitemsid);
        $worksData = D("Document","Datamanager")->getDocumentData_catidArray($filterarray,$p,$page_size,$map);
        if($worksData){
            $all_ids_arr = explode(",", $hasitemsid);
            foreach ($worksData as $key => $value) {
                array_push($all_ids_arr, $value['id']);
            }
            $all_ids_arr = array_filter($all_ids_arr);

            if($page_size > count($worksData)){
                $this->ajaxReturn(1,'lastdata',$worksData,implode(",", $all_ids_arr));
            }else{
                $this->ajaxReturn(1,'has',$worksData,implode(",", $all_ids_arr));
            }   
        }else{
            $this->ajaxReturn(0,'nodata');
        }
    }


}