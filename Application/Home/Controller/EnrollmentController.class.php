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
class EnrollmentController extends ArticleBaseController {

    public function _initialize(){
        parent::_initialize();
        //开设班级
        $classTypeData = D("Document","Datamanager")->getDocumentData_catid(79);
        $this->assign("classTypeData",$classTypeData);
        //收费标准
        $classmoneyData = D("Document","Datamanager")->getDocumentData_catid(108);
        $this->assign("classmoneyData",$classmoneyData);
    }

    /* 文档模型频道页 */
	public function index(){

        //招生帮助
        $helpData = D("Document","Datamanager")->getDocumentData_catid(78);
        $this->assign("helpData",$helpData);


        $pageCateData = M("Category")->where(array('id'=>46))->find();
        $this->assign("catid",$catid);
        $this->assign("catcnname",$pageCateData['title']);
        $this->display();
	}
}