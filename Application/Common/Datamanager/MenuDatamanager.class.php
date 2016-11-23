<?php
namespace Common\Datamanager;
/**
 * MenuDatamanager
 * 后台菜单数据管理对象类
 */
class MenuDatamanager {
	/**
 	 * 获取pid的
	 */
	public function getLeftAdminMenu_pid($pid=0){
		if(!S("AdminMenu".$pid)){
			$map['pid']      = (int)$pid;
			$map['display']  = 1;
			$map['status']   = 1;
	        $menus = M("menu")->where($map)->order('ordid')->select();
        	foreach ($menus as $key => $value) {
				$map['pid']         = $value['id'];
				$menus[$key]['sub'] = M("Menu")->where($map)->order('ordid')->select();
        	}
	        S("AdminMenu".$pid,$menus);
		}
		$menus = S("AdminMenu".$pid);
        return $menus;
	}

	public function getLeftOftenAdminMenu(){
		if(!S("LeftOftenAdminMenu")){
	        $left_menu[0] = array('id'=>0,'name'=>'常用功能');
	        $left_menu[0]['sub'] = array();
	        $left_menu[0]['sub'] = D("Menu")->where(array('often'=>1))->select();
	        array_unshift($left_menu[0]['sub'], array('id'=>0,'name'=>'后台首页','module_name'=>'index','action_name'=>'often_menu'));
	        S("LeftOftenAdminMenu",$left_menu);
    	}
    	$left_menu = S("LeftOftenAdminMenu");
    	return $left_menu;
	}

	public function getMainAdminMenu(){
		$map['pid']      = 0;
		$map['display']  = 1;
		$map['status']   = 1;
        $menus = M("Menu")->where($map)->order('ordid')->select();
        return $menus;
	}
}