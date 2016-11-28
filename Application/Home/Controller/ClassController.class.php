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
class ClassController extends ArticleBaseController {

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


        $classData = M("Category")->where(array('pid'=>44))->select();
        foreach ($classData as $key => $value) {
            $classData[$key]['icon_url'] = M("picture")->where(array("id"=>$value['icon']))->getField("path");
        }
        $this->assign("classData",$classData);
        
    }

    /* 文档模型频道页 */
	public function index(){
        
        $this->assign("catcnname","课程设置");
        $this->display();
	}


}