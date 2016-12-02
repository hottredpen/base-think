<?php
namespace Admin\Model;
use Think\Model;
class MenuModel extends Model{

    const ADMIN_ADD      = 11;//管理员添加
    const ADMIN_SAVE     = 12;//管理员修改
    const ADMIN_DELECT   = 13;//管理员删除
    //字段衍射
    protected $_map = array(
                            
                        );
    //修改插入后自动完成
    protected $_auto = array(
        //管理员添加
        array('addtime','time',self::ADMIN_ADD,'function'),
        //管理员修改
        array('addtime','time',self::ADMIN_SAVE,'function'),
    );

    protected $_validate = array(
        //管理员添加
        array('name', 'is_filter_pass', '菜单名不能包含特殊符号', self::MUST_VALIDATE,'function',self::ADMIN_ADD),
        array('module_name', 'is_only_char_num_underline_pass', '模块名只能是英文字母、数字、下划线', self::MUST_VALIDATE,'function',self::ADMIN_ADD),
        array('action_name', 'is_only_char_num_underline_pass', '方法名只能是英文字母、数字、下划线', self::MUST_VALIDATE,'function',self::ADMIN_ADD),

        //管理员修改
        array('name', 'is_filter_pass', '菜单名不能包含特殊符号', self::MUST_VALIDATE,'function',self::ADMIN_SAVE),
        array('module_name', 'is_only_char_num_underline_pass', '模块名只能是英文字母、数字、下划线', self::MUST_VALIDATE,'function',self::ADMIN_SAVE),
        array('action_name', 'is_only_char_num_underline_pass', '方法名只能是英文字母、数字、下划线', self::MUST_VALIDATE,'function',self::ADMIN_SAVE),

        //管理员删除
        array('id', 'is_nothassonid_pass', '先删除菜单下的子菜单才能删除', self::MUST_VALIDATE,'callback',self::ADMIN_DELECT),

    );

    protected function is_nothassonid_pass($id){
        $has = $this->where(array("pid"=>$id))->find();
        if($has){
            return false;
        }
        return true;
    }

}