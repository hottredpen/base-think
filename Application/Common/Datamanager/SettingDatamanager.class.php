<?php
namespace Common\Datamanager;
/**
 * SettingDatamanager
 * setting的数据管理对象类
 */
class SettingDatamanager {
	/**
	 * 带前缀的配置
	 */
	public function getDataWithPre(){
        $data = M("Setting")->select();
        foreach ($data as $key=>$val) {
            $setting['fdz_'.$val['name']] = substr($val['data'], 0, 2) == 'a:' ? unserialize($val['data']) : $val['data'];
        }
        return $setting;
	}
}