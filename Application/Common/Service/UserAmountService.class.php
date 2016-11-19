<?php
namespace Common\Service;
/**
 * UserAmountService
 */
class UserAmountService {
	/**
	 * @uid     操作用户对象uid
	 * @fuid    资金来源    -1来自平台
	 * @action  具体操作
	 * @logid   记录id(方便做财务清单)
	 * @money   大于0获取金额，小于0扣除金额
	 */
	public function changeUserAmount_uid_fuid_action_logid_money(){

		$this->userAmountLog_uid_fuid_action_logid_money();
	}
	/**
	 * 只做资金记录
	 */
	public function userAmountLog_uid_fuid_action_logid_money(){

	}
}