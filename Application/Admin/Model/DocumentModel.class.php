<?php
namespace Admin\Model;
use Think\Model;
class DocumentModel extends Model{

    const INFO_ADD  = 11; // 添加
    const INFO_SAVE = 12; // 修改

    //字段衍射
    protected $_map = array(
                            
                        );
    //修改插入后自动完成
    protected $_auto = array(
        // 添加
        array('create_time','time',self::INFO_ADD,'function'),

    );

    protected $_validate = array(
        // 添加
        array('title', 'is_filter_pass', '标题不能包含特殊符号', self::MUST_VALIDATE,'function',self::INFO_ADD),


    );

}