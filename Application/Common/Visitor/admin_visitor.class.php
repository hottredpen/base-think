<?php
namespace Common\Visitor;

/**
 * 管理员访问者
 * @author hottredpen@126.com
 */
class admin_visitor {

    public  $info     = null;

    public function __construct() {
        if (session('admin')) {
            $this->info = session('admin');
        }
    }
    /**
     * 所有管理员操作
     */
    public function adminBaseHandleObject(){
        return new \Common\HandleObject\AdminBaseHandleObject();
    }


}