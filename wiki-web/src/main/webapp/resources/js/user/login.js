$(document).ready(function() {
	$('#login').click(function() {
		//验证用户名
		if(!isUsername($('#username').val())) {
			return false;
		}
		
		//验证密码
		if(!isPassword($('#password').val())) {
			return false;
		}
		
		$('#f-login').submit();
	});
	
	$('#regist').click(function() {
		window.location.href = 'regist';
	});
});