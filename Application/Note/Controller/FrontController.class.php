<?php 
namespace Note\Controller;
use Common\Controller\CommonBaseController;
/**
 * 前台控制器
 * 已访问者形式
 */
class FrontController extends CommonBaseController {

    protected $visitor;
    
    protected function _initialize() {
        parent::_initialize();
        //初始化访问者
        $this->_init_visitor();
        //检测用户信息是否有更新
        $this->checkUserStatus();
    }

    private function _init_visitor(){
        $this->visitor    = new \Common\Lib\USER\user_visitor();
        $this->assign("visitorData",$this->visitor->info);
    }
    private function checkUserStatus(){
        $info       = $this->visitor->info;
        $userStatus = S("userStatus_".$info['id']);
        if($userStatus){
            //后台无法改变当前用户session值时所需重现初始化登录用户
            $this->visitor->getNewInfo($info['id']);
            S("userStatus_".$info['id'], null);
        }
    }

    protected function layoutDisplay($templateFile){
        G('viewStartTime');
        // 视图开始标签
        \Think\Hook::listen('view_begin',$templateFile);
        if(I("_pjax","","trim") != ""){
            $layoutcontent = $this->fetch($templateFile);
        }else{
            // 解析并获取模板内容
            $content = $this->fetch($templateFile);
            $this->assign("fetch_html",$content);
            $layoutcontent = $this->fetch("Public:layout");
        }
        // 输出模板内容
        $this->render($layoutcontent);
        // 视图结束标签
        \Think\Hook::listen('view_end');
    }

    private function render($content,$charset='',$contentType=''){
        if(empty($charset))  $charset = C('DEFAULT_CHARSET');
        if(empty($contentType)) $contentType = C('TMPL_CONTENT_TYPE');
        // 网页字符编码
        header('Content-Type:'.$contentType.'; charset='.$charset);
        header('Cache-control: '.C('HTTP_CACHE_CONTROL'));  // 页面缓存控制
        // 输出模板文件
        echo $content;
    }
}