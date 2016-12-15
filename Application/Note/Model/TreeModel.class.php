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
class TreeModel extends Model{

    const INFO_ADD      = 11; // 初始化添加
    const INFO_SAVE     = 12; // 修改


    public $treeData;

    //字段衍射
    protected $_map = array(
                            
                        );
    //修改插入后自动完成
    protected $_auto = array(
        // 初始化添加
        array('updatetime','time',self::INFO_ADD,'function'),

        // 修改
        array('updatetime','time',self::INFO_SAVE,'function'),
        array('treedata','set_treedata',self::INFO_SAVE,'callback'),
    );

    protected $_validate = array(
        // 初始化添加
        

        // 修改
        array('jsontreedata', 'is_treedata_pass', '至少添加一个数据', self::MUST_VALIDATE,'callback',self::INFO_SAVE),

    );

    protected function is_treedata_pass($jsontreedata){
        $treedata = json_decode($jsontreedata,true);
        $addpid   = tree_add_pid($treedata,0,'children','id'); 
        $treedata = tree_to_list($addpid,'children','index'); // js里的是children,存数据库里时改为list
        if(count($treedata) > 0){
            $this->treeData = $treedata;
            return true;
        }
        return false;
    }

    protected function set_treedata(){
        return serialize($this->treeData);
    }
  
}