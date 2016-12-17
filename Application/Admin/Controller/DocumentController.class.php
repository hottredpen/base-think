<?php
namespace Admin\Controller;
use Common\Lib\ORG\Tree;
class DocumentController extends BackController
{
    public function _initialize() {
        parent::_initialize();
    }

    public function index(){
        $p         = I("p",0,"intval");
        $page_size = 20;
        $data = D("Document","Datamanager")->getDocumentData($p,$page_size,$map);
        $num  = D("Document","Datamanager")->getDocumentNum($map);
        $this->assign("list",$data);
        $this->assign("page",$this->_pager_show($num,$page_size));
        $this->display();
    }
    public function _before_getAddForm(){
        $tree = new Tree();
        $result = M("Category")->select();
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
    public function getAddForm(){
        if (IS_AJAX) {
            $this->assign("menuid",$this->menuid);
            $response  = $this->fetch("add");
            $this->ajaxReturn(1, '', $response);
        } else {
            $this->display();
        }
    }

    public function addDocument(){
        $adminBaseHandleObject = $this->visitor->AdminBaseHandleObject();
        $res = $adminBaseHandleObject->addDocument();
        if($res['error']==0 && $res['info'] != ""){
            $this->cpk_success($res['info']);
        }else{
            $this->cpk_error($res['info']);
        }
    }
    // public function getEditForm(){
    //     if (IS_AJAX) {
    //         $id   = I("id",0,"intval");
    //         $info = M("Admin")->where(array("id"=>$id))->find();
    //         $this->assign("info",$info);
    //         $role_list = M('AdminRole')->where(array("status"=>1))->select();
    //         $this->assign('role_list', $role_list);
    //         $response = $this->fetch("edit");
    //         $this->assign("menuid",$this->menuid);
    //         $this->ajaxReturn(1, '', $response);
    //     } else {
    //         $this->display();
    //     }
    // }
    // public function saveAdmin(){
    //     $id  = I("id",0,"intval");
    //     $superAdminBaseHandleObject = $this->visitor->SuperAdminBaseHandleObject();
    //     $res = $superAdminBaseHandleObject->saveAdmin($id);
    //     if($res['error'] == 0 && $res['info'] != ""){
    //         $this->cpk_success($res['info']);
    //     }else{
    //         $this->cpk_error($res['info']);
    //     }
    // }
    // public function deleteAdmin(){
    //     $id  = I("id",0,"intval");
    //     $superAdminBaseHandleObject = $this->visitor->SuperAdminBaseHandleObject();
    //     $res = $superAdminBaseHandleObject->deleteAdmin($id);
    //     if($res['error'] == 0 && $res['info'] != ""){
    //         $this->cpk_success($res['info']);
    //     }else{
    //         $this->cpk_error($res['info']);
    //     }
    // }
    public function _before_index() {
        $big_menu = array(
            'title'  => '添加文章',
            'iframe' => U('Document/getAddForm'),
            'id'     => 'add',
            'width'  => '1000'
        );
        $this->assign('big_menu', $big_menu);
    }


    public function category(){
        $sort = I("sort", 'ordid', 'trim');
        $order = I("order", 'DESC', 'trim');
        $tree = new Tree();
        $tree->icon = array('│ ','├─ ','└─ ');
        $tree->nbsp = '&nbsp;&nbsp;&nbsp;';
        $result = M("Category")->select();
        $array = array();
        foreach($result as $r) {
          
            $r['str_status'] = '<img data-tdtype="toggle" data-id="'.$r['id'].'" data-field="status" data-value="'.$r['status'].'" src="/static/images/admin/toggle_' . ($r['status'] == 0 ? 'disabled' : 'enabled') . '.gif" />';
            if($r['id'] != 7 && $r['id'] != 6 && $r['id'] != 3 && $r['id'] != 13){
                $r['str_manage'] = '<a href="javascript:;" class="J_showdialog" data-uri="'.U('article_cate/add',array('pid'=>$r['id'])).'" data-title="'.L('add_article_cate').'" data-id="add" data-width="500" data-height="360">'.L('add_article_subcate').'</a> |
                                <a href="javascript:;" class="J_showdialog" data-uri="'.U('article_cate/edit',array('id'=>$r['id'])).'" data-title="'.L('edit').' - '. $r['name'] .'" data-id="edit" data-width="500" data-height="290">'.L('edit').'</a> |
                                <a href="javascript:;" data-acttype="ajax" class="J_confirmurl" data-uri="'.U('article_cate/delete',array('id'=>$r['id'])).'" data-msg="'.sprintf(L('confirm_delete_one'),$r['name']).'">'.L('delete').'</a>';
            } else {
                $r['str_manage'] = '<a href="javascript:;" class="J_showdialog" data-uri="'.U('article_cate/add',array('pid'=>$r['id'])).'" data-title="'.L('add_article_cate').'" data-id="add" data-width="500" data-height="360">'.L('add_article_subcate').'</a> |
                                <a href="javascript:;" class="J_showdialog" data-uri="'.U('article_cate/edit',array('id'=>$r['id'])).'" data-title="'.L('edit').' - '. $r['name'] .'" data-id="edit" data-width="500" data-height="290">'.L('edit').'</a>';                
            }

            $r['parentid_node'] = ($r['pid'])? ' class="child-of-node-'.$r['pid'].'"' : '';
            $array[] = $r;
        }
        $str  = "<tr id='node-\$id' \$parentid_node>
                <td align='center'><input type='checkbox' value='\$id' class='J_checkitem'></td>
                <td>\$spacer<span data-tdtype='edit' data-field='name' data-id='\$id' class='tdedit'>\$name</span></td>
                <td align='center'>\$id</td>
                <td align='center'><span data-tdtype='edit' data-field='template' data-id='\$id' class='tdedit'>\$template</span></td>
                <td align='center'><span data-tdtype='edit' data-field='ordid' data-id='\$id' class='tdedit'>\$ordid</span></td>
                <td align='center'>\$str_status</td>
                <td align='center'>\$str_manage</td>
                </tr>";
        $tree->init($array);
        $list = $tree->get_tree(0, $str);
        $this->assign('list', $list);
        $big_menu = array(
            'title' => L('add_article_cate'),
            'iframe' => U('article_cate/add'),
            'id' => 'add',
            'width' => '500',
            'height' => '290'
        );
        $this->assign('big_menu', $big_menu);
        $this->assign('list_table', true);
        $this->display();
    }
}