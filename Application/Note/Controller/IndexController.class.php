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
    	$pjax = I("_pjax","","trim");
    	if($pjax != ""){
    		echo "<h1>index</h1><h1>index</h1><h1>index</h1><h1>index</h1><h1>index</h1><h1>index</h1><h1>index</h1>";
    	}else{
    		$this->display();
    	}

	}

    public function aaaa(){
    	$pjax = I("_pjax","","trim");
    	if($pjax != ""){
    		echo "<h1>aaaaa</h1><h1>aaaaa</h1><h1>aaaaa</h1><h1>aaaaa</h1><h1>aaaaa</h1><h1>aaaaa</h1><h1>aaaaa</h1>";
    	}else{
    		$this->display();
    	}
        
    }
}