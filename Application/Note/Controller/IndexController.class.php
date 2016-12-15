<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

namespace Note\Controller;

/**
 * 文档模型控制器
 * 文档模型列表和详情
 */
class IndexController extends FrontController {

    /* 文档模型频道页 */
	public function index(){
        $this->layoutDisplay("Index:index");
	}

    public function aaaa(){
        $this->layoutDisplay("Index:aaaa");
    }

    public function tree(){
        $this->layoutDisplay("Index:tree");
    }

    public function mysqltree(){
        $treeOrderData = M("Tree")->where(array('user_id'=>1))->getField("treedata"); 
        $treeOrderData = unserialize($treeOrderData);
        foreach ($treeOrderData as $key => $value) {
            $treeOrderData[$key]['data'] = M('TreeData')->where(array("id"=>$value['id']))->find();
        }



        $treetestlist  = list_to_tree($treeOrderData);
        $this->assign("treetestlist",$treetestlist);
        $this->layoutDisplay("Index:mysqltree");
    }
    public function changetree(){
        $baseHandleObject = $this->visitor->BaseHandleObject();
        $res = $baseHandleObject->changeTree();
        if($res['error']==0 && $res['info'] != ""){
            $this->cpk_success($res['info']);
        }else{
            $this->cpk_error($res['info']);
        }
    }

}