<?php

function get_controller_action_name_by_catid($catid,$explodstr="_"){
    if(!F("ControllerActionNameByCatid")){
        $data = D("Category","Datamanager")->getControllerActionNameByCatid_NoCache();
        F("ControllerActionNameByCatid",$data);
    }
    $data = F("ControllerActionNameByCatid");
    if($explodstr != "_"){
        foreach ($data as $key => $value) {
            $data[$key] = str_replace("_", $explodstr, $data[$key]);
        }
    }
    if($catid>0){
        return $data[$catid];
    }
    return $data;
}

function get_catid_by_controller_action_name($controller,$action){
    if(!F("CatidByControllerActionName")){
        $data = D("Category","Datamanager")->getCatidByControllerActionName_NoCache();
        F("CatidByControllerActionName",$data);
    }
    $data = F("CatidByControllerActionName");
    return $data[$controller."_".$action];
}

function get_display_tpl_by_catid($catid){
    if(!F("DisplayTplByCatid")){
        $data = D("Category","Datamanager")->getDisplayTplByCatid_NoCache();
        F("DisplayTplByCatid",$data);
    }
    $data = F("DisplayTplByCatid");
    if($catid>0){
        return $data[$catid];
    }
    return $data;
}

function get_is_page_by_catid($catid){
    if(!F("IsPageByCatid")){
        $data = D("Category","Datamanager")->getIsPageByCatid_NoCache();
        F("IsPageByCatid",$data);
    }
    $data = F("IsPageByCatid");
    if($catid>0){
        return $data[$catid];
    }
    return $data;
}




/**
 * 中文截取字段
 */
function cutCn($str,$len=8,$type="hasx"){
    if($type==""){
        if(utf8_strlen($str)>$len){
            $str=cut_str($str, $len, 0);
        }
    }else{
        if(utf8_strlen($str)>$len){
            $str=cut_str($str, $len, 0)."..";
        }
    }
    return $str;
}


// 计算中文字符串长度
function utf8_strlen($string = null) {
    // 将字符串分解为单元
    preg_match_all("/./us", $string, $match);
    // 返回单元个数
    return count($match[0]);
}
function cut_str($string, $sublen, $start = 0, $code = 'UTF-8')
{
    if($code == 'UTF-8')
    {
        $pa = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|\xe0[\xa0-\xbf][\x80-\xbf]|[\xe1-\xef][\x80-\xbf][\x80-\xbf]|\xf0[\x90-\xbf][\x80-\xbf][\x80-\xbf]|[\xf1-\xf7][\x80-\xbf][\x80-\xbf][\x80-\xbf]/";
        preg_match_all($pa, $string, $t_string);

        if(count($t_string[0]) - $start > $sublen) return join('', array_slice($t_string[0], $start, $sublen));
        return join('', array_slice($t_string[0], $start, $sublen));
    }
    else
    {
        $start = $start*2;
        $sublen = $sublen*2;
        $strlen = strlen($string);
        $tmpstr = '';

        for($i=0; $i< $strlen; $i++)
        {
            if($i>=$start && $i< ($start+$sublen))
            {
                if(ord(substr($string, $i, 1))>129)
                {
                    $tmpstr.= substr($string, $i, 2);
                }
                else
                {
                    $tmpstr.= substr($string, $i, 1);
                }
            }
            if(ord(substr($string, $i, 1))>129) $i++;
        }
        //if(strlen($tmpstr)< $strlen ) $tmpstr.= "...";
        return $tmpstr;
    }
}