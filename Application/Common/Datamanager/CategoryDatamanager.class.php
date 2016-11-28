<?php
namespace Common\Datamanager;
/**
 * CategoryDatamanager
 * 分类数据管理对象类
 */
class CategoryDatamanager {
	/**
	 * 获取数据
	 */
	public function getControllerActionNameByCatid_NoCache(){

		$deeptwoData = M("category")->where(array('deep'=>2))->select();

		foreach ($deeptwoData as $key => $value) {
			$pidname =  M("category")->where(array('id'=>$value['pid']))->getField("name");
			$newData[$value['id']] = $pidname."_".$value['name'];
		}
		return $newData;
	}

	public function getCatidByControllerActionName_NoCache(){
		$data = $this->getControllerActionNameByCatid_NoCache();

		foreach ($data as $key => $value) {
			$newData[$value] = $key;
		}
		return $newData;
	}

	public function getDisplayTplByCatid_NoCache(){
		$deeptwoData = M("category")->where(array('deep'=>2))->select();

		foreach ($deeptwoData as $key => $value) {
			$newData[$value['id']] = $value['display_tpl'];
		}
		return $newData;
	}

	public function getIsPageByCatid_NoCache(){
		$deeptwoData = M("category")->where(array('deep'=>2))->select();

		foreach ($deeptwoData as $key => $value) {
			$newData[$value['id']] = $value['is_page'];
		}
		return $newData;
	}

	/**
	 * 根据catid获取该分类下的所有子分类名称及文章数
	 */
	public function getCateNameListAndArticleNum_catid($catid){
		$sonlist = M("category")->where(array('pid'=>$catid))->select();
		foreach ($sonlist as $key => $value) {
			$sonlist[$key]['articlenum'] = M("Document")->where(array("category_id"=>$value['id'],"status"=>1))->count();
			$sonlist[$key]['href_url']   = get_controller_action_name_by_catid($value['id'],"/");
		}
		return $sonlist;
	}


}