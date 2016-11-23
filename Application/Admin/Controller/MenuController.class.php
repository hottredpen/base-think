<?php
namespace Admin\Controller;
use Think\Controller;
use Common\Lib\ORG\Tree;

class menuController extends BackController {
    public function _initialize() {
        parent::_initialize();
        $this->_mod = D('Menu');
    }

    public function index() {
        $this->assign("moduleForPage","menu");


        $tree = new Tree();
        $tree->icon = array('&nbsp;&nbsp;&nbsp;│ ','&nbsp;&nbsp;&nbsp;├─ ','&nbsp;&nbsp;&nbsp;└─ ');
        $tree->nbsp = '&nbsp;&nbsp;&nbsp;';
        $result = $this->_mod->order('ordid')->select();
        $array = array();
        foreach($result as $r) {
            $r['cname'] = L($r['name']);
            $r['str_manage'] = '<a href="javascript:;" class="J_showdialog" data-uri="'.U('menu/add',array('pid'=>$r['id'])).'" data-title="'.L('add_submenu').'" data-id="add" data-width="500" data-height="350">'.L('add_submenu').'</a> |
                                <a href="javascript:;" class="J_showdialog" data-uri="'.U('menu/edit',array('id'=>$r['id'])).'" data-title="'.L('edit').' - '. $r['name'] .'" data-id="edit" data-width="500" data-height="350">'.L('edit').'</a> |
                                <a href="javascript:;" class="J_confirmurl" data-acttype="ajax" data-uri="'.U('menu/delete',array('id'=>$r['id'])).'" data-msg="'.sprintf(L('confirm_delete_one'),$r['name']).'">'.L('delete').'</a>';
            $array[] = $r;
        }
        $a = $r['display']?"enabled":"disabled";
        //dump($r);
        $str  = "<tr>
                <td align='center'><input type='checkbox' value='\$id' class='J_checkitem'></td>
                <td align='center'>\$id</td>
                <td>\$spacer<span data-tdtype='edit' data-field='name' data-id='\$id' class='tdedit'>\$name</span></td>
                <td align='center'><span data-tdtype='edit' data-field='ordid' data-id='\$id' class='tdedit'>\$ordid</span></td>".
                
                "<td align='center'><img data-tdtype='toggle' data-id='{\$id}' data-field='status' data-value='{\$status}' src='/static/images/admin/toggle_{\$status}.gif' /></td>".
                "<td align='center'><img data-tdtype='toggle' data-id='{\$id}' data-field='display' data-value='{\$display}' src='/static/images/admin/toggle_$a.gif ' /></td>".
                "<td align='center'>\$str_manage</td>
                </tr>";
        $tree->init($array);
        $menu_list = $tree->get_tree(0, $str);
        $this->assign('menu_list', $menu_list);

        $big_menu = array(
            'title' => '添加菜单',
            'iframe' => U('menu/add'),
            'id' => 'add',
            'width' => '500',
            'height' => '350',
        );
        $this->assign('big_menu', $big_menu);
        $this->assign('list_table', true);
        $this->display();
    }

    public function _before_add()
    {
        $tree = new Tree();
        $result = $this->_mod->select();
        $array = array();
        foreach($result as $r) {
            $pid = I('pid', 0, 'intval');
            $r['selected'] = $r['id'] == $pid ? 'selected' : '';
            $array[] = $r;
        }
        $str  = "<option value='\$id' \$selected>\$spacer \$name</option>";
        $tree->init($array);
        $select_menus = $tree->get_tree(0, $str);
        $this->assign('select_menus', $select_menus);
    }

    public function _before_edit()
    {
        $id = I('id', 0, 'intval');
        $info = $this->_mod->find($id);
        $this->assign('info', $info);
        $tree = new Tree();
        $result = $this->_mod->select();
        $array = array();
        foreach($result as $r) {
            $r['selected'] = $r['id'] == $info['pid'] ? 'selected' : '';
            $array[] = $r;
        }
        $str  = "<option value='\$id' \$selected>\$spacer \$name</option>";
        $tree->init($array);
        $select_menus = $tree->get_tree(0, $str);
        $this->assign('select_menus', $select_menus);
    }
    public function add() {

        if (IS_POST) {
            $mod = D($this->_name);
            if (false === $data = $mod->create()) {
                IS_AJAX && $this->ajaxReturn(0, $mod->getError());
                $this->error($mod->getError());
            }

            if (method_exists($this, '_before_insert')) {
                $data = $this->_before_insert($data);
            }
             
            if( $mod->add($data) ){
                if( method_exists($this, '_after_insert')){
                    $id = $mod->getLastInsID();
                    $this->_after_insert($id);
                }
                IS_AJAX && $this->ajaxReturn(1, L('operation_success'), '', 'add');
                $this->success(L('operation_success'));
            } else {
                IS_AJAX && $this->ajaxReturn(0, L('operation_failure'));
                $this->error(L('operation_failure'));
            }
        } else {

            if(method_exists($this, '_before_add')){

                $this->_before_add();
            }

            $this->assign('open_validator', true);
            if (IS_AJAX) {
                $response = $this->fetch();
                $this->ajaxReturn(1, '', $response);
            } else {
                $this->display();
            }
        }
    }
}