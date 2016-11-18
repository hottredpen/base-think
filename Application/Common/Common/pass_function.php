<?php
/**
 * 常用检测
 */
function is_notempty_pass($value){
	if($value==null || $value==""){
		return false;
	}
	return true;
}