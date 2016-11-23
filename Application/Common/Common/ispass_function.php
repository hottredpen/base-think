<?php
/**
 * 常用检测
 * （收录标准是各系统可用）
 * 命名规范已“is_name_pass”的格式命名
 * 其他非此命名的的函数是辅助函数
 */
function is_notempty_pass($value){
	if($value==null || $value==""){
		return false;
	}
	return true;
}
function is_emailformat_pass($email){
    if(preg_match("/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/",$email)){
        return true;
    }else{
        return false;
    }
}

function is_phoneformat_pass($phone){
    if(preg_match("/^1[3|4|5|7|8]\d{9}$/",$phone)){
        return true;
    }else{
        return false;
    }
}
function is_qqformat_pass($qq){
    $pattern = '/^\d{5,12}$/' ;//只能是数字和逗号
    if (!preg_match($pattern, $qq)){
        return false;
    }
    return true;
}
function is_filter_pass($str){
    $str     = str_replace(" ","",$str);//去掉空格后进行进行验证
    $str     = str_replace(",","",$str);//去掉","后进行进行验证
    $pattern = "/^[\x{4e00}-\x{9fa5}A-Za-z0-9_，？]+$/u";//过滤非法字符
    $strArr = str_split_unicode($str);
    foreach ($strArr as $key => $value) {
        if (!preg_match($pattern, $value)){
            return false;
        }
    }
    return true;
}
//中英文字符串转数组
function str_split_unicode($str, $l = 0) {
    if ($l > 0) {
        $ret = array();
        $len = mb_strlen($str, "UTF-8");
        for ($i = 0; $i < $len; $i += $l) {
            $ret[] = mb_substr($str, $i, $l, "UTF-8");
        }
        return $ret;
    }
    return preg_split("//u", $str, -1, PREG_SPLIT_NO_EMPTY);
}