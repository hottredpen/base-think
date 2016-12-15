<?php
namespace Note\Visitor;

/**
 * note访问者
 * @author hottredpen@126.com
 */
class note_visitor {

    public  $info     = null;

    public function __construct() {
        if (session('note_visitor')) {
            $this->info = session('note_visitor');
        }
    }
    /**
     * 所有管理员操作
     */
    public function baseHandleObject(){
        // @todo 登录
        $uid = 1;
        return new \Note\HandleObject\NoteBaseHandleObject($uid);
    }
}