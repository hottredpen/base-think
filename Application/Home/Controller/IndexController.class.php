<?php


namespace Home\Controller;
use Home\Util\WebObject;

/**
 * 前台首页控制器
 * 主要获取首页聚合数据
 */
class IndexController extends FrontController {

    public function _initialize(){
    	parent::_initialize();
    }

    public function index(){

       
    	//新闻
        $new_list = D("Document","Datamanager")->getDocumentData_catid(55,1,3);
        $this->assign("newsData",$new_list);

        //公告    notices
        $noticesData = D("Document","Datamanager")->getDocumentData_catid(93,1,6);
        $this->assign("noticesData",$noticesData);

        //资讯
        $zixunData = D("Document","Datamanager")->getDocumentData_catid(56,1,5);
        $this->assign("zixunData",$zixunData);

        //幻灯片
        $bannerData = M("Banner")->where(array("status"=>1))->order("sort desc")->select();
        foreach ($bannerData as $key => $value) {
            $bannerData[$key]['fileurl'] = M("Picture")->where(array('id'=>$value['fileid']))->getField("path");
        }
        $this->assign("bannerData",$bannerData);

        //课程设置
        $classData = M("Category")->where(array('pid'=>44))->select();
        foreach ($classData as $key => $value) {
            $classData[$key]['icon_url'] = M("picture")->where(array("id"=>$value['icon']))->getField("path");
        }
        $this->assign("classData",$classData);


        $worksData = D("Document","Datamanager")->getDocumentData_catidArray(array(101,102,103,104,105,106,107),1,8);
        $this->assign("worksData",$worksData);


        //招生帮助
        $helpData = D("Document","Datamanager")->getDocumentData_catid(78);
        $this->assign("helpData",$helpData);

        //友情链接
        //带图的
        $fmap_pic               = array();
        $fmap_pic['d.cover_id'] = array("gt",0);
        $friendLinkData = D("Document","Datamanager")->getDocumentData_catid(98,1,10,$fmap_pic);

        //带图的
        $fmap_notpic               = array();
        $fmap_notpic['d.cover_id'] = array("eq",0);
        $friendLinknopicData = D("Document","Datamanager")->getDocumentData_catid(98,1,20,$fmap_notpic);

        $this->assign("friendLinkData",$friendLinkData);
        $this->assign("friendLinknopicData",$friendLinknopicData);

        $this->display("new_index");
    }

    public function signup(){
        if(IS_POST){
            $signupModel = D("Signup");

            if(!$signupModel->field('name,email,phone,qq,professional,message')->create($_POST,11)){
                $this->ajaxReturn(0,$signupModel->getError());
            }else{
                $res = $signupModel->add();
                if($res){
                    $this->ajaxReturn(1,'您提交的报名信息已保存成功');
                }else{
                    $this->ajaxReturn(0,'网络开小差了，请再提交一次');
                }
            }
        }
    }
    protected function ajaxReturn($status=1, $msg='', $data='', $dialog='') {
        parent::ajaxReturn(array(
            'status' => $status,
            'msg' => $msg,
            'data' => $data,
            'dialog' => $dialog,
        ));
    }

}