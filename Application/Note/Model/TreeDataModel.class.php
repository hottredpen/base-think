<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

namespace Note\Model;
use Think\Model;

/**
 * 分类模型
 */
class TreeDataModel extends Model{

    const INFO_ADD      = 10; // 

    //字段衍射
    protected $_map = array(
                            
                        );
    //修改插入后自动完成
    protected $_auto = array(
        // 登录
        array('last_time','time',self::INFO_ADD,'function'),


    );

    protected $_validate = array(
        // 登录(以下字段不存在于数据表中)
        array('loginusername', 'is_loginusername_pass', '登录用户名必填', self::MUST_VALIDATE,'callback',self::INFO_ADD),

    );

    protected function set_password(){
        return $this->_md5_password($this->password);
    }

    private function _md5_password($password){
        return md5($password."hottredpen@126.com");
    }


}
