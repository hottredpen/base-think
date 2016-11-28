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
class AboutController extends ArticleBaseController {

	protected $catid;
	protected $catenname;
    protected $catcnname;
    protected $emptynameArray;

    public function _initialize(){
        parent::_initialize();

        //关于我们的幻灯片
        $aboutBannerlist = D("Document","Datamanager")->getDocumentData_catid(100);
        $this->assign("aboutBannerlist",$aboutBannerlist);

        //荣誉讲师
        $goodTeacherData = D("Document","Datamanager")->getDocumentData_catid(95);
        $this->assign("goodTeacherData",$goodTeacherData);

        //教学环境
        $surroundingsData = D("Document","Datamanager")->getDocumentData_catid(94);
        $this->assign("surroundingsData",$surroundingsData);

        //联系方式
        $contactInfo = D("Document","Datamanager")->getDocumentInfoDataOnePage_catid(96);
        $this->assign("contactInfo",$contactInfo);


        //活动
        $active_list = M("Document")->where(array('category_id'=>56))->limit(5)->select();
        $this->assign("active_list",$active_list);
    }

    /* 文档模型频道页 */
	public function index(){
        $this->redirect('/about/xiandaishouhui');
	}


}