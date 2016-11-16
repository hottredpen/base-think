<?php


/**
 * 过滤 + 过滤检测
 */

function fiter_input_sql($inputvalue){
    //@todo
    return $inputvalue;
}
function is_fiter_input_sql_pass(){
    //@todo
    return true;
}
/**
 * 常用检测
 */
function is_notempty_pass($value){
	if($value==null || $value==""){
		return false;
	}
	return true;
}
