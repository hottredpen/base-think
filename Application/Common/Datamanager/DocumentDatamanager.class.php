<?php
namespace Common\Datamanager;
/**
 * DocumentDatamanager
 * 文档数据管理对象类
 */
class DocumentDatamanager {
	/**
	 * 获取数据
	 */
	public function getDocumentData($p=1,$page_size=20,$map=array(),$order="id desc"){
		$data = $this->_takeDocumentData("data",$map,$p,$page_size,$order);
		return $data;
	}
	/**
	 * 获取数量
	 */
	public function getDocumentNum($map=array()){
		$data = $this->_takeDocumentData("num",$map);
		return $data;
	}

	public function getDocumentNum_catid($catid,$searchmap=array()){
		$map = array();
		$map['d.category_id'] = $catid;
		$map['d.status']      = 1;
		//合并覆盖
		$newmap = array_merge($map, $searchmap);
   		$data = $this->_takeDocumentData("num",$newmap);
		return $data;
	}

	public function getDocumentData_catid($catid,$p=1,$page_size=20,$searchmap=array()){
		$map                  = array();
		$map['d.category_id'] = $catid;
		$map['d.status']      = 1;
		//合并覆盖
		$newmap = array_merge($map, $searchmap);
   		$data = $this->_takeDocumentData("data",$newmap,$p,$page_size);
		return $data;
	}

	public function getDocumentData_catidArray($catidArray,$p=1,$page_size=20,$searchmap=array()){
		$map                  = array();
		$map['d.category_id'] = array("in",$catidArray);
		$map['d.status']      = 1;
		//合并覆盖
		$newmap = array_merge($map, $searchmap);
   		$data = $this->_takeDocumentData("data",$newmap,$p,$page_size);
		return $data;
	}

	public function getDocumentNum_catidArray($catidArray,$map){
		$map                  = array();
		$map['d.category_id'] = array("in",$catidArray);
		$map['d.status']      = 1;
   		$data = $this->_takeDocumentData("num",$map);
		return $data;
	}

	public function getDocumentInfoDataOnePage_catid($catid){
		$map                  = array();
		$map['d.category_id'] = $catid;
		$map['d.status']      = 1;
   		$data = $this->_takeDocumentData("data",$map,1,1);
		return $data[0];
	}

	public function getDocumentInfoData_catid_id($catid,$id){
		$map                  = array();
		$map['d.id']          = $id;
		$map['d.category_id'] = $catid;
		$map['d.status']      = 1;
   		$data = $this->_takeDocumentData("data",$map,1,1);
		return $data[0];
	}

	public function getDocumentData_catidArray_keywordsArray($catidArray=array(),$keywordsArray=array(),$p=1,$page_size=10){
		//目前就取前一个 @todo
		$keywords               = $keywordsArray[0];
		
		$map                    = array();
		$map['d.category_id']   = array("in",$catidArray);
		$map['d.status']        = 1;
		$where                  = array();
		$where['d.title']       = array("like","%".$keywords."%");
		$where['d.description'] = array("like","%".$keywords."%");
		$where['_logic']        = 'or';
		$map['_complex']        = $where;
		$data                   = $this->_takeDocumentData("data",$map,$p,$page_size);
		return $data;
	}

	public function getDocumentNum_catidArray_keywordsArray($catidArray=array(),$keywordsArray=array()){
		//目前就取前一个 @todo
		$keywords               = $keywordsArray[0];
		
		$map                    = array();
		$map['d.category_id']   = array("in",$catidArray);
		$map['d.status']        = 1;
		$where                  = array();
		$where['d.title']       = array("like","%".$keywords."%");
		$where['d.description'] = array("like","%".$keywords."%");
		$where['_logic']        = 'or';
		$map['_complex']        = $where;
		$data                   = $this->_takeDocumentData("num",$map);
		return $data;
	}

	public function formatListData(&$listdata){
		$dataArray  = explode("\n", $listdata);
		$signuphtml = $this->_signuphtml();
		foreach ($dataArray as $key => $value) {

			$dataArray[$key] = str_replace("{{QQ_1}}", '<a href="http://wpa.qq.com/msgrd?v=3&uin=2742974934&site=qq&menu=yes" class="icon_qq_24" target="_blank"><img src="http://wpa.qq.com/pa?p=2:2742974934:50" alt="手绘咨询" /></a>', $dataArray[$key]);
			$dataArray[$key] = str_replace("{{QQ_2}}", '<a href="http://wpa.qq.com/msgrd?v=3&uin=2742974934&site=qq&menu=yes" class="icon_qq_24" target="_blank"><img src="http://wpa.qq.com/pa?p=2:2742974934:50" alt="手绘咨询" /></a>', $dataArray[$key]);
			$dataArray[$key] = str_replace("{{网上报名}}", $signuphtml, $dataArray[$key]);
		}
		return $dataArray;
	}

	private function _signuphtml(){
		$str = '                                                    <div class="status alert alert-success" style="display: none"></div>
                                                    <form id="main-contact-form" class="contact-form form-horizontal" name="contact-form" method="post" action="/index/signup" enctype="multipart/form-data">
                                                        
                                                            <div class="form-group">
                                                                <label class="col-sm-2">姓名 *</label>
                                                                <div class="col-sm-10">
                                                                <input type="text" name="name" class="form-control" required="required" placeholder="姓名">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-sm-2">邮箱 *</label>
                                                                <div class="col-sm-10">
                                                                <input type="email" name="email" class="form-control" required="required" placeholder="邮箱">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-sm-2">手机 *</label>
                                                                <div class="col-sm-10">
                                                                <input type="number" name="phone" class="form-control" required="required" placeholder="电话">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-sm-2">QQ *</label>
                                                                <div class="col-sm-10">
                                                                <input type="number" name="qq" class="form-control" required="required" placeholder="QQ">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-sm-2">专业 *</label>
                                                                <div class="col-sm-10">
                                                                <input type="text" name="professional" class="form-control" required="required" placeholder="专业">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-sm-2">内容</label>
                                                                <div class="col-sm-10">
                                                                <textarea name="message" id="message"  class="form-control" rows="2"></textarea>
                                                                </div>
                                                            </div>    

                                                            <div class="form-group">
                                                                <div class="col-sm-offset-4 col-sm-8">
                                                                <button  type="submit" name="submit" class="btn btn-primary btn-lg" required="required">提交</button>
                                                                </div>
                                                            </div>

                                                        
                                                    </form> ';
        return $str;
	}

	private function _takeDocumentData($type="data",$searchmap=array(),$p=1,$page_size=20,$order="d.level desc ,d.id desc"){
		$map = array();
		//$map['o.status'] = array("egt",0);
		//合并覆盖
		$newmap = array_merge($map, $searchmap);

		if($type=="data"){
			$list = M("Document as d")
					->join('left join '.C('DB_PREFIX').'document_article AS a on d.id=a.id')
					->join('left join '.C('DB_PREFIX').'category AS c on d.category_id=c.id')
					->field('d.*,a.content,c.name AS category_name,c.title AS category_title')
					->where($newmap)
					->order($order)
					->page($p.','.$page_size)
					->select();

			foreach ($list as $key => $value) {
				$list[$key]['href_url']  = $this->_get_controller_action_name_by_catid($value['category_id'],"/");
				if($value['cover_id'] > 0){
					$list[$key]['cover_url'] = M("picture")->where(array("id"=>$value['cover_id']))->getField("path");

				}
				if($value['listdata'] != ""){
					$list[$key]['listdata_format'] = $this->formatListData($list[$key]['listdata']);
				}
			}
		}else{
			$list = M("Document as d")
					->join('left join '.C('DB_PREFIX').'document_article AS a on d.id=a.id')
					->field('d.id')
					->where($newmap)
					->count();
		}
        return $list;
	}


	private function _get_controller_action_name_by_catid($catid,$explodstr="_"){
	    if(!F("ControllerActionNameByCatid")){
	        $data = D("Category","Datamanager")->getControllerActionNameByCatid_NoCache();
	        F("ControllerActionNameByCatid",$data);
	    }
	    $data = F("ControllerActionNameByCatid");
	    if($explodstr != "_"){
	        foreach ($data as $key => $value) {
	            $data[$key] = str_replace("_", $explodstr, $data[$key]);
	        }
	    }
	    if($catid>0){
	        return $data[$catid];
	    }
	    return $data;
	}

}