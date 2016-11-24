<?php
/**
 * 过滤 + 过滤检测
 * （收录标准是各系统可用）
 * @命名规范@filter_name的普通格式命名
 * @命名规范@filter_list_tagname作为过滤一些常用的用户提交，这些方法请置前
 * 其他非此命名的的函数是辅助函数
 */
function filter_list_textarea($str){
    $str = filter_XSS($str);
    //@todo
    return $str;
}
function filter_list_input($str){
    $str = filter_XSS($str);
    //@todo
    return $str;
}
function filter_list_editorinfo($str){
    //@todo
    return $str;
}


function filter_XSS($str){
    static $obj = null;
    if ($obj === null) {
        // 载入核心文件
        $file = APP_PATH.'Common/Lib/ORG/HTMLPurifier/HTMLPurifier.includes.php';
        if(is_file($file)){
            require_once($file);
            $obj = new \HTMLPurifier();
        }
    }
    // 返回过滤后的数据
    return $obj->purify($str);
}
function filter_SQL($inputvalue){
    //@todo
    return $inputvalue;
}