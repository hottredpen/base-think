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

        //$data = M("treetest")->select();

        $ddd = '[{"id":1},{"id":2,"children":[{"id":4},{"id":3},{"id":5,"children":[{"id":6},{"id":8},{"id":7}]},{"id":9},{"id":10}]},{"id":12},{"id":11}]';

        $ddddddd = json_decode($ddd, true);
        $addpid  = tree_add_pid($ddddddd,0,'children','id');
        $dddd    = tree_to_list($addpid,'children','index');
        $out     = list_to_tree($dddd);
        $this->assign("treetestlist",$out);
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