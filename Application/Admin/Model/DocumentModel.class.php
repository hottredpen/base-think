<?php
namespace Admin\Model;
use Think\Model;
class DocumentModel extends Model{

    const INFO_ADD  = 11; // 添加
    const INFO_SAVE = 12; // 修改

    //字段衍射
    protected $_map = array(
                                'pid' => 'category_id', // 
                        );
    //修改插入后自动完成
    protected $_auto = array(
        // 添加
        array('create_time','time',self::INFO_ADD,'function'),

    );

    protected $_validate = array(
        // 添加
        array('category_id', 'is_category_id_pass', '请选择文章分类', self::MUST_VALIDATE,'callback',self::INFO_ADD),
        array('title', 'is_notempty_pass', '标题不能为空', self::MUST_VALIDATE,'function',self::INFO_ADD),
        array('title', 'is_filter_pass', '标题不能包含特殊符号', self::MUST_VALIDATE,'function',self::INFO_ADD),


    );

    protected function is_category_id_pass($category_id){
        // todo 只能是最后一级
        if($category_id > 0){
            return true;
        }
        return false;
    }


}