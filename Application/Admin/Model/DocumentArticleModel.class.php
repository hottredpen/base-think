<?php
namespace Admin\Model;
use Think\Model;
class DocumentArticleModel extends Model{

    const INFO_ADD  = 11; // 添加
    const INFO_SAVE = 12; // 修改

    //字段衍射
    protected $_map = array(
                             'info' => 'content', // 添加
                        );
    //修改插入后自动完成
    protected $_auto = array(
        // 添加
        array('content','filter_list_editorinfo',self::INFO_ADD,'function'),

    );

    protected $_validate = array(
        // 添加
        array('content', 'is_notempty_pass', '文章内容不能为空', self::MUST_VALIDATE,'function',self::INFO_ADD),

        // 
    );

}