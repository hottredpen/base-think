<?php
// 过滤 + 过滤前检测（收录标准是各系统可用）
include('Common/Common/filter_function.php');
// 常用检测（收录标准是各系统可用）
include('Common/Common/ispass_function.php');

// 检测输入的验证码是否正确，$code为用户输入的验证码字符串
function check_verify($code, $id = ''){
    $verify = new \Think\Verify();
    return $verify->check($code, $id);
}