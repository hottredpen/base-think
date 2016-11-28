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
class NewsController extends ArticleBaseController {

	protected $catid;
	protected $catenname;
    protected $catcnname;
    protected $emptynameArray;

    public function _initialize(){
        parent::_initialize();



        //所有新闻类别
        $news_cat_list = D("Category","Datamanager")->getCateNameListAndArticleNum_catid(41);
        $this->assign("news_cat_list",$news_cat_list);

        //公告    notices
        $noticesData = D("Document","Datamanager")->getDocumentData_catid(93,1,6);
        $this->assign("noticesData",$noticesData);


        //推荐新闻
        $new_list = M("Document")->where(array('category_id'=>55))->limit(5)->select();
        $this->assign("new_list",$new_list);

        $worksData = D("Document","Datamanager")->getDocumentData_catidArray(array(101,102,103,104,105,106,107),1,8);
        $this->assign("worksData",$worksData);

        //活动
        $active_list = M("Document")->where(array('category_id'=>56))->limit(5)->select();
        $this->assign("active_list",$active_list);
    }

    /* 文档模型频道页 */
	public function index(){
        $this->redirect('/news/newslist');
	}

    public function searchlist(){
        $keywords  = I("searchkeywords","","filterlist_search_keywords");
        $p         = I("p",1,"intval");
        $page_size = 5;
        $num  = D("Document","Datamanager")->getDocumentNum_catidArray_keywordsArray(array(55,56,93),array($keywords));
        $data = D("Document","Datamanager")->getDocumentData_catidArray_keywordsArray(array(55,56,93),array($keywords),$p,$page_size);
        $this->assign("list",$data);
        $this->assign("page",$this->_pager_show($num,$page_size));
        $this->assign("pageCateData",array('title'=>"搜索“".$keywords."”的相关新闻"));
        $this->display();
    }
}