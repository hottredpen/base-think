<?php 
namespace Home\Controller;
/**
 * 前台控制器
 * 主要是一些基础继承方法
 */
class TestController extends FrontController {

    protected function _initialize() {
        parent::_initialize();
        header("Content-type: text/html; charset=utf-8");
    }

    public function index(){
		$ddd = '[{"id":1},{"id":2,"children":[{"id":4},{"id":3},{"id":5,"children":[{"id":6},{"id":8},{"id":7}]},{"id":9},{"id":10}]},{"id":12},{"id":11}]';

		dump("================================");

		$ddddddd = json_decode($ddd, true);
		$addpid = tree_add_pid($ddddddd,0,'children','id');
		$dddd =   tree_to_list($addpid,'children','id');
		$out	   = list_to_tree($dddd);

		dump($dddd);

		dump($out);
    }

}