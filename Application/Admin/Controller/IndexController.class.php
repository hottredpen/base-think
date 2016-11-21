<?php
namespace Admin\Controller;
/**
 * 
 */
class IndexController extends BackController {

    protected function _initialize() {
    	parent::_initialize();
    }

    public function index(){
        $top_menus = D("Menu","Datamanager")->getMainAdminMenu();
        $this->assign('top_menus', $top_menus);
        $this->assign('my_admin', session('admin'));
        $this->display();
    }

    public function panel(){
        $message = array();
        if (APP_DEBUG == true) {
            $message[] = array(
                'type' => 'Error',
                'content' => "您网站的 DEBUG 没有关闭，出于安全考虑，我们建议您关闭程序 DEBUG。",
            );
        }
        if (!function_exists("curl_getinfo")) {
            $message[] = array(
                'type' => 'Error',
                'content' => "系统不支持 CURL ,将无法采集商品数据。",
            );
        }
        
        $this->assign('message', $message);
        $system_info = array(
            'server_domain'       => $_SERVER['SERVER_NAME'] . ' [ ' . gethostbyname($_SERVER['SERVER_NAME']) . ' ]',
            'server_os'           => PHP_OS,
            'web_server'          => $_SERVER["SERVER_SOFTWARE"],
            'php_version'         => PHP_VERSION,
            'mysql_version'       => mysql_get_server_info(),
            'upload_max_filesize' => ini_get('upload_max_filesize'),
            'max_execution_time'  => ini_get('max_execution_time') . '秒',
            'safe_mode'           => (boolean) ini_get('safe_mode') ?  'onCorrect' : 'onError',
            'zlib'                => function_exists('gzclose') ?  'onCorrect' : 'onError',
            'curl'                => function_exists("curl_getinfo") ? 'onCorrect' : 'onError',
            'timezone'            => function_exists("date_default_timezone_get") ? date_default_timezone_get() : L('no')
        );
        $this->assign('system_info', $system_info);
        $this->assign('time',date('Y-m-d H:i'));
        $this->assign('ip',get_client_ip());
        $this->assign('my_admin', session('admin'));
        $this->display();
    }

    public function login(){
    	if(IS_POST){
    		$res = D("AdminBase","HandleObject")->login();
    		if($res['error']==0 && $res['id'] >0){
    			$this->success($res['info'], U('index/index'));
    		}else{
    			$this->error($res['info'], U('index/login'));
    		}
    	}else{
    		$this->display();
    	}
    }

    public function logout(){
        $res = D("AdminBase","HandleObject")->logout();
        $this->success($res['info'], U('index/login'));
    }

    public function left() {
        $menuid = I('menuid', 0, 'intval');
        if ($menuid > 0) {
            $left_menu = D("Menu","Datamanager")->getLeftAdminMenu_pid($menuid);
        } else {
            $left_menu = D("Menu","Datamanager")->getLeftOftenAdminMenu();
        }
        $this->assign('left_menu', $left_menu);
        $this->display();
    }

    public function verify_code() {
        $Verify = new \Think\Verify();
        $Verify->fontSize = 30;
        $Verify->length   = 4;
        $Verify->entry();
    }

}