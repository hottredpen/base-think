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
class TalentController extends ArticleBaseController {

    public function _initialize(){
        parent::_initialize();
    }

    /* 文档模型频道页 */
	public function index(){
        //友情链接
        $talentData = D("Document","Datamanager")->getDocumentInfoDataOnePage_catid(110);
        $this->assign("info",$talentData);

        $pageCateData = M("Category")->where(array('id'=>110))->find();
        $this->assign("catid",$catid);
        $this->assign("catcnname",$pageCateData['title']);

        $this->display();
	}
}