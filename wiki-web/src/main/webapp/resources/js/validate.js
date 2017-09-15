/**
 * 判断字符串是否为用户名
 * 标准：6-30位非空字符串，只能包含大小写英文字母和数字
 */
function isUsername(str) {
	if(isEmpty(str)) {
		validateErrorFrame('用户名不能为空！');
		return false;
	}
	var reg = /^[0-9a-zA-Z]*$/g;
	if(!reg.test(str)) {
		validateErrorFrame('用户名含有非法字符！');
		return false;
	}
	if(str.length < 6 || str.length > 30) {
		validateErrorFrame('用户名长度在6-30位之间！');
		return false;
	}
	return true;
}

/**
 * 判断字符串是否为密码
 * 标准：6-30位非空字符串，不能包含中文
 */
function isPassword(str) {
	if(isEmpty(str)) {
		validateErrorFrame('密码不能为空！');
		return false;
	}
	if(str.length < 6 || str.length > 30) {
		validateErrorFrame('密码长度在6-30位之间！');
		return false;
	}
	var reg = /.*[\u4e00-\u9fa5]+.*$/;
	if(reg.test(str)) {
		validateErrorFrame('密码不能含有中文！');
		return false;
	}
	return true;
}
/**
 * 判断字符串是否为空
 */
function isEmpty(str) {
	if(str == '' || str == null) {
		return true;
	}
	return false;
}
